"use client";
import { useContext, useEffect } from "react";
import { PrimeReactContext } from "primereact/api";

interface SimpleLayoutProps {
  children: React.ReactNode;
}

const SimpleContainer = ({ children }: SimpleLayoutProps) => {
  const { changeTheme } = useContext<any>(PrimeReactContext);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme !== null) {
      changeTheme("lara-light-teal", localTheme, "theme-link", () => {});
    }
  }, []);

  return  <div className="layout-simple">{children}</div>;
};

export default SimpleContainer;
