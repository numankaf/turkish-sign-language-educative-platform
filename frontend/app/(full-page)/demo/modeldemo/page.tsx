"use client";

import React, { useEffect, useRef, useState } from "react";
import * as cam from "@mediapipe/camera_utils";
import * as tf from "@tensorflow/tfjs";
import { Holistic } from "@mediapipe/holistic";
import Webcam from "react-webcam";
import { Button } from "primereact/button";

const ModelDemoPage = () => {
    const MAX_ARRAY_SIZE = 60;
    const actions = ["acele", "acikmak", "afiyet olsun", "agabey", "agac", "agir", "aglamak", "aile", "akilli", "akilsiz"];
    const [sign, setSign] = useState<string>("Perform a sign first");
    const webcamRef = useRef<any>(null);
    let camera = null;
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    const [resultsArr, setResultsArr] = useState<any[]>([]);

    useEffect(() => {
        async function loadModel() {
            const loadedModel = await tf.loadLayersModel("/models/model2/model.json");
            console.log(loadedModel);
            setModel(loadedModel);
        }
        loadModel();
    }, []);

    useEffect(() => {
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

        if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    await holistic.send({ image: webcamRef.current.video });
                },
                width: 400,
                height: 400,
            });
            camera.start();
        }
    }, []);

    const extractKeyPoints = (results: any) => {
        const pose = results.poseLandmarks ? results.poseLandmarks.map((res: any) => [res.x, res.y]).flat() : new Array(33 * 2).fill(0);

        const leftHand = results.leftHandLandmarks ? results.leftHandLandmarks.map((res: any) => [res.x, res.y]).flat() : new Array(21 * 2).fill(0);

        const rightHand = results.rightHandLandmarks ? results.rightHandLandmarks.map((res: any) => [res.x, res.y]).flat() : new Array(21 * 2).fill(0);

        return [...pose, ...leftHand, ...rightHand];
    };

    const makePrediction = async (results: any[]) => {
        if ( results.length === MAX_ARRAY_SIZE) {
            const loadedModel = await tf.loadLayersModel("/models/model2/model.json");
            const inputTensor = tf.tensor2d(results);
            const reshapedInput = inputTensor.reshape([1, 60, 150]);

            // Make predictions
            const predictions: any = loadedModel.predict(reshapedInput);
            
            // Get the index of the maximum value (argmax)
            const argmaxIndex = tf.argMax(predictions.dataSync()).dataSync()[0];
            const probability = predictions.dataSync()[argmaxIndex];

            // Dispose of the input tensor and predictions tensor to avoid memory leaks
            inputTensor.dispose();
            reshapedInput.dispose();
            // Now you can work with the argmaxIndex and probability
            if (probability > 0.98) {
                console.log("Argmax Index:", argmaxIndex);
                console.log("Probability:", probability);
                
                setSign(actions[argmaxIndex]);
            }
        }
    };

    // // Run the makePrediction function every second
    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         makePrediction();
    //     }, 1000);

    //     // Cleanup the interval when the component unmounts
    //     return () => clearInterval(intervalId);
    // }, [resultsArr]);

    const onResults = (results: any) => {
        setResultsArr((prevResults) => {
            const newKeyPoints = extractKeyPoints(results);
            const updatedResults = [...prevResults, newKeyPoints].slice(-MAX_ARRAY_SIZE);
            console.log(updatedResults.length)
            makePrediction(updatedResults);
            return updatedResults;
        });
    };

    return (
        <div className="card">
            <div className=" flex flex-col items-center justify-center">
                <p className="text-lg font-semibold uppercase">Predicted Sign : {sign}</p>
                <Webcam
                    className="rounded-md"
                    ref={webcamRef}
                    mirrored = {true}
                    videoConstraints={{
                        frameRate: { ideal: 30, max: 30 },
                    }}
                    style={{
                        width: 400,
                        height: 400,
                    }}
                />
            </div>
            {/* <Button label="see results length" onClick={() => makePrediction()}></Button> */}
        </div>
    );
};

export default ModelDemoPage;
