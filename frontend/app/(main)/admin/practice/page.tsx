import Link from "next/link";
import React from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const PracticeAdminPage = () => {
  return (
    <div className="card">
      <div className="flex items-center justify-center">
        <div>
          <div>
            Kelimelerinizi işaret diliyle kameraya ifade etmek için hazır
            mısınız? Hemen başlamak için lütfen bir pratik seçin ve kendinizi
            ifade edin! 🤟✨
          </div>
          <Link href={"/admin/practice/standart"}>
            <div className="bg-primary cursor-pointer text-white rounded-lg m-5 p-5 flex items-center justify-between transition duration-300 ease-in-out hover:scale-105">
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
      </div>
    </div>
  );
};
export default PracticeAdminPage;
