"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const OpenningPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/landing")
  }, []);
  return <></>;
};

export default OpenningPage;
