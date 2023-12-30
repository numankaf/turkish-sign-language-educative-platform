import { Button } from "primereact/button";
import React from "react";

const LandingPage = () => {
  return (
    <div className="card">
        <p>This is a landing page</p>
      <div className="flex flex-wrap justify-center gap-3 items-center">
        <Button label="Primary" />
        <Button label="Secondary" severity="secondary" />
        <Button label="Success" severity="success" />
        <Button label="Info" severity="info" />
        <Button label="Warning" severity="warning" />
        <Button label="Help" severity="help" />
        <Button label="Danger" severity="danger" />
      </div>
    </div>
  );
};

export default LandingPage;
