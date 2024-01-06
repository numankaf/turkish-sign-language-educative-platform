"use client";
import React from "react";
import Webcam from "react-webcam";
const PracticeAdminPage = () => {
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <div className="card">
      <div className="flex items-center justify-center m-4 rounded-lg">
        <Webcam
          audio={false}
          height={450}
          screenshotFormat="image/jpeg"
          width={600}
          videoConstraints={videoConstraints}
        ></Webcam>
      </div>
    </div>
  );
};
export default PracticeAdminPage;
