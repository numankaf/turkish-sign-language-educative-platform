"use client";
import { Button } from "primereact/button";
import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const VideoRecorder = () => {
    const webcamRef = useRef<any>(null);
    const [recording, setRecording] = useState(false);
    const [videoBlob, setVideoBlob] = useState(null);

    const startRecording = () => {
        setRecording(true);
        const stream = webcamRef.current.video.srcObject;
        const mediaRecorder = new MediaRecorder(stream);

        const chunks: any[] = [];

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob: any = new Blob(chunks, { type: "video/webm" });
            setVideoBlob(blob);
        };

        mediaRecorder.start();

        setTimeout(() => {
            mediaRecorder.stop();
            setRecording(false);
        }, 2400); // Set the recording duration in milliseconds (2 seconds)
    };

    return (
        <div className="card  flex flex-col items-center justify-center">
            <Webcam audio={false} ref={webcamRef} videoConstraints={{ aspectRatio: 1, width: 400, height: 400 }} />
            <Button onClick={startRecording} disabled={recording} label="record">
                
            </Button>
            {videoBlob && (
                <video controls>
                    <source src={URL.createObjectURL(videoBlob)} type="video/webm" />
                </video>
            )}
        </div>
    );
};

export default VideoRecorder;
