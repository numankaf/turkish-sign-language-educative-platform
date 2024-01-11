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
      <div className="flex items-center justify-center">
        <Webcam
          className="rounded-lg w-[30rem]"
          audio={false}
          height={"auto"}
          screenshotFormat="image/jpeg"
          width={"auto"}
          videoConstraints={videoConstraints}
        ></Webcam>
      </div>
    </div>
  );
};
export default PracticeAdminPage;
