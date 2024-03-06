"use client";

import React, { useEffect, useRef, useState } from "react";
import * as cam from "@mediapipe/camera_utils";
import * as tf from "@tensorflow/tfjs";
import { Holistic } from "@mediapipe/holistic";
import Webcam from "react-webcam";

const ModelDemoPage = () => {
    const webcamRef = useRef<any>(null);
    let camera = null;
    const [model, setModel] = useState<any>(null);

    useEffect(() => {
        async function loadModel() {
            const loadedModel = await tf.loadLayersModel("/models/model2/model.json");
            console.log(loadedModel);
            setModel(loadedModel);
        }
        loadModel()
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

    const onResults = (results: any) => {
        //console.log(results)
    };

    return (
        <div className="card flex items-center justify-center">
            <Webcam
                className="rounded-md"
                ref={webcamRef}
                videoConstraints={{
                    frameRate: { ideal: 30, max: 30 },
                }}
                style={{
                    width: 400,
                    height: 400,
                }}
            />
        </div>
    );
};

export default ModelDemoPage;
