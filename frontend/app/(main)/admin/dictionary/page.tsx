"use client";

import useWordsApi from "@/app/lib/useWordsApi";
import { Word } from "@/app/types/words";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";

const DictionaryPage = () => {
  const wordsApi = useWordsApi();
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    loadWords();
  }, []);

  const loadWords = async () => {
    wordsApi.findAll().then((data) => {
      setWords(data);
    });
  };

  return (
    <div className="card">
      {JSON.stringify(words)}
    </div>
  );
};
export default DictionaryPage;
