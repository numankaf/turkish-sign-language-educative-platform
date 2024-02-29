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
<<<<<<< Updated upstream
        <Webcam
          className="rounded-lg w-[30rem]"
          audio={false}
          height={"auto"}
          screenshotFormat="image/jpeg"
          width={"auto"}
          videoConstraints={videoConstraints}
        ></Webcam>
=======
        <div>
          <div>
            Kelimelerinizi işaret diliyle kameraya ifade etmek için hazır
            mısınız? Hemen başlamak için lütfen bir pratik seçin ve kendinizi
            ifade edin! 🤟✨
          </div>
          <Link href={"/admin/practice/standart"}>
            <div className="bg-[var(--primary-color)] cursor-pointer text-white rounded-lg m-5 p-5 flex items-center justify-between transition duration-300 hover:scale-105">
              <div>
                <div className=" font-bold text-lg">Standart Pratik</div>
                <div className="">
                  Rastgele seçilmiş kelimeleri ifade etmeye çalışın!
                </div>
              </div>
              <div>
                <FaRegArrowAltCircleRight size={35}></FaRegArrowAltCircleRight>
              </div>
            </div>
          </Link>
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
};
export default PracticeAdminPage;
