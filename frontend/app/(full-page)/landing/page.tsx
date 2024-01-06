"use client"
import { signIn } from "next-auth/react";
import { Button } from "primereact/button";
import React from "react";

const LandingPage = () => {
  return (
    <div className="card">
         <Button label="Log in" text onClick={()=>signIn()}/>
    </div>
  );
};

export default LandingPage;
