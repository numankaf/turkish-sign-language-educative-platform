"use client";
import React, { useEffect, useRef, useState } from "react";
import * as cam from "@mediapipe/camera_utils";
import * as tf from "@tensorflow/tfjs";
import { Holistic } from "@mediapipe/holistic";
import Webcam from "react-webcam";
import { Button } from "primereact/button";

const FreePractice = () => {
    const MAX_ARRAY_SIZE = 60;
    const actions = ["acele", "acikmak", "afiyet olsun", "agabey", "agac", "agir", "aglamak", "aile", "akilli", "akilsiz"];
    const [sign, setSign] = useState<string>("Perform a sign first");
    const webcamRef = useRef<any>(null);
    let camera = null;
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    const [resultsArr, setResultsArr] = useState<any[]>([]);
    const mediaRecorderRef = React.useRef<any>(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);

    const handleStartCaptureClick = React.useCallback(() => {
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
        mediaRecorderRef.current.start();
        setCapturing(true);
        setTimeout(() => {
            mediaRecorderRef.current.stop();
            setCapturing(false);
        }, 3500);
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
        ({ data }: any) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = React.useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm",
            });
            const url = URL.createObjectURL(blob);
            const a: any = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();
            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

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
        console.log(results);
        if (model && results.length === MAX_ARRAY_SIZE) {
            const inputTensor = tf.tensor2d(results);
            const reshapedInput = inputTensor.reshape([1, 60, 150]);

            // Make predictions
            const predictions: any = model.predict(reshapedInput);

            // Get the index of the maximum value (argmax)
            const argmaxIndex = tf.argMax(predictions.dataSync()).dataSync()[0];
            const probability = predictions.dataSync()[argmaxIndex];

            // Dispose of the input tensor and predictions tensor to avoid memory leaks
            inputTensor.dispose();
            reshapedInput.dispose();
            // Now you can work with the argmaxIndex and probability
            if (probability > 0.95) {
                setSign(actions[argmaxIndex]);
            } else {
                setSign("İşaret bulunamadı!");
            }
        }
    };

    const onResults = (results: any) => {
        setResultsArr((prevResults) => {
            const newKeyPoints = extractKeyPoints(results);
            const updatedResults = [...prevResults, newKeyPoints].slice(-MAX_ARRAY_SIZE);
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
                    videoConstraints={{
                        frameRate: { ideal: 30, max: 30 },
                        facingMode: "user",
                        width: 400,
                        height: 400,
                        aspectRatio: 1,
                    }}
                />
                {/* <Button label="Predict" onClick={() => makePrediction(resultsArr)}></Button> */}

                {capturing ? (
                    <Button onClick={handleStopCaptureClick} label="Stop Capture" severity="danger"></Button>
                ) : (
                    <Button onClick={handleStartCaptureClick} label="Start Capture"></Button>
                )}
                {recordedChunks.length > 0 && <Button onClick={handleDownload} label="Download"></Button>}
                {/* <p className="text-6xl">{seconds}</p>
                <Button label="Başla" onClick={handleStart}></Button>
                {camIsActive && <Button label="Durdur" severity="danger" onClick={handleReset}></Button>} */}
            </div>
        </div>
    );
};

export default FreePractice;
