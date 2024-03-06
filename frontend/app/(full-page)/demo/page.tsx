"use client";

import React, { useEffect, useRef } from "react";
import * as cam from "@mediapipe/camera_utils";
import * as mediaPipeHolistic from "@mediapipe/holistic";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Holistic } from "@mediapipe/holistic";
import Webcam from "react-webcam";

const DemoPage = () => {
    const webcamRef = useRef<any>(null);
    const canvasRef = useRef<any>(null);
    const landmarkRef = useRef<any>(null);
    let camera = null;

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
        // const video = webcamRef.current.video;
 


        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set canvas width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const canvasElement = canvasRef.current;
        const canvasCtx = canvasElement.getContext("2d");
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
        drawConnectors(canvasCtx, results.poseLandmarks, mediaPipeHolistic.POSE_CONNECTIONS, { color: "#FF0000", lineWidth: 2 });
        drawLandmarks(canvasCtx, results.poseLandmarks, { color: "#4C89C79", lineWidth: 1, radius: 1 });

        drawConnectors(canvasCtx, results.rightHandLandmarks, mediaPipeHolistic.HAND_CONNECTIONS, { color: "#FF0000", lineWidth: 2 });
        drawLandmarks(canvasCtx, results.rightHandLandmarks, { color: "#4C89C79", lineWidth: 1, radius: 1 });

        drawConnectors(canvasCtx, results.leftHandLandmarks, mediaPipeHolistic.HAND_CONNECTIONS, { color: "#FF0000", lineWidth: 2 });
        drawLandmarks(canvasCtx, results.leftHandLandmarks, { color: "#4C89C79", lineWidth: 1, radius: 1 });

        canvasCtx.restore();
    };

    return (
        <div className="card">
            <Webcam
                ref={webcamRef}
                videoConstraints={{
                    frameRate: { ideal: 30, max: 30 },
                }}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    width: 400,
                    height: 400,
                }}
            />
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    width: 400,
                    height: 400,
                }}
            ></canvas>
            <div className="landmark-grid-container"></div>
        </div>
    );
};

export default DemoPage;
