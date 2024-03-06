"use client";
import useWordsApi from "@/app/lib/useWordsApi";
import { Word } from "@/app/types/words";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";

const StandartPracticePage = () => {
    const wordsApi = useWordsApi();
    const [word, setWord] = useState<Word>();
    const [infoVisible, setInfoVisible] = useState<boolean>(false);

    useEffect(() => {
        fetchWord();
    }, []);
    const fetchWord = async () => {
        const id = Math.floor(Math.random() * 10) + 1;
        wordsApi.findById(id).then((data) => {
            setWord(data);
        });
    };

    return (
        <div className="card">
            <Dialog
                pt={{
                    header: { className: "rounded" },
                }}
                header="İpucu"
                visible={infoVisible}
                style={{ width: "50vw" }}
                closeOnEscape={true}
                onHide={() => setInfoVisible(false)}
            >
                <div className="flex items-center justify-center">
                    <video  className ="rounded-md" width="500" height="500" controls autoPlay src={"http://localhost:8080/resource/video/" + word?.id}></video>
                </div>
            </Dialog>
            <div className="flex items-center justify-center gap-1 text-lg">
                <div className="font-semibold">Kelime: </div>
                <div> {word?.tr}</div>
            </div>
            <div className="flex items-center flex-col justify-center m-5">
                <Webcam
                    className="rounded-lg w-[30rem]"
                    audio={false}
                    height={"auto"}
                    screenshotFormat="image/jpeg"
                    width={"auto"}
                    videoConstraints={{
                        width: 1280,
                        height: 720,
                        facingMode: "user",
                    }}
                ></Webcam>
                <div className="flex items-center justify-between w-[30rem] m-5">
                    <Button label="İpucu" severity="info" icon="pi pi-question-circle" onClick={() => setInfoVisible(true)} />
                    <Button label="Geç" icon="pi pi-arrow-right" onClick={() => fetchWord()} />
                </div>
            </div>
        </div>
    );
};

export default StandartPracticePage;
