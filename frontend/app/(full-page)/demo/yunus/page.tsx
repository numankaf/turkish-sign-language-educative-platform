"use client";
import { Button } from "primereact/button";
import Webcam from "react-webcam";
import React, { useEffect, useRef, useState } from "react";
import * as cam from "@mediapipe/camera_utils";
import * as tf from "@tensorflow/tfjs";
import { Holistic } from "@mediapipe/holistic";

const VideoRecorder = () => {
    const FRAME_SIZE = 60;
    const actions = ["acele", "acikmak", "afiyet olsun", "agabey", "agac", "agir", "aglamak", "aile", "akilli", "akilsiz"];
    const webcamRef = useRef<any>(null);
    const frames = useRef<any[]>([]);
    let camera = null;
    const [sign, setSign] = useState<string>("Perform a sign first");
    const [recording, setRecording] = useState<boolean>(false);
    
    useEffect(() => {
        console.log("girdi");
        const holistic = new Holistic({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}`;
            },
        });

        holistic.setOptions({
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });

        holistic.onResults(onResults);

        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && recording) {
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    await holistic.send({ image: webcamRef.current.video });
                },
                width: 400,
                height: 400,
            });
            camera.start();
        }

        if(!recording && frames.current.length >= FRAME_SIZE) {
            makePrediction(frames.current);
        }
    }, [recording]);

    const startRecording = () => {
        setRecording(true);
    };

    const onResults = (results: any) => {
        console.log("girdi2");
        const newKeyPoints = extractKeyPoints(results);
        frames.current = [...frames.current, newKeyPoints];
        if(frames.current.length >= 60) {
            setRecording(false);
        }
    };


    const extractKeyPoints = (results: any) => {
        const pose = results.poseLandmarks ? results.poseLandmarks.map((res: any) => [res.x, res.y]).flat() : new Array(33 * 2).fill(0);

        const leftHand = results.leftHandLandmarks ? results.leftHandLandmarks.map((res: any) => [res.x, res.y]).flat() : new Array(21 * 2).fill(0);

        const rightHand = results.rightHandLandmarks ? results.rightHandLandmarks.map((res: any) => [res.x, res.y]).flat() : new Array(21 * 2).fill(0);

        return [...pose, ...leftHand, ...rightHand];
    };


    const makePrediction = async (results: any[]) => {
        if (results.length === FRAME_SIZE) {
            const loadedModel = await tf.loadLayersModel("/models/model99/model.json");
            const inputTensor = tf.tensor2d(results);
            const reshapedInput = inputTensor.reshape([1, FRAME_SIZE, 150]);

            // Make predictions
            const predictions: any = loadedModel.predict(reshapedInput);

            // Get the index of the maximum value (argmax)
            const argmaxIndex = tf.argMax(predictions.dataSync()).dataSync()[0];
            const probability = predictions.dataSync()[argmaxIndex];

            // Dispose of the input tensor and predictions tensor to avoid memory leaks
            inputTensor.dispose();
            reshapedInput.dispose();
            // Now you can work with the argmaxIndex and probability
            if (probability > 0.90) {
                console.log("Argmax Index:", argmaxIndex);
                console.log("Probability:", probability);

                setSign(actions[argmaxIndex]);
            }else{
                setSign("Can't detect");
            }
        }
    };

    return (
        <div className="card  flex flex-col items-center justify-center">
            <Webcam audio={false} ref={webcamRef} videoConstraints={{ frameRate: { ideal: 30, max: 30 }, aspectRatio: 1, width: 400, height: 400 }} />
            <Button onClick={startRecording} disabled={recording} label="record"></Button>
            <div>{sign}</div>
        </div>
    );
};

export default VideoRecorder;
