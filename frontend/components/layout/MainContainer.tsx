"use client"
import { MenuItem } from "@/app/types/layout";
import { AppSidebar } from "./AppSidebar";

const MainContainer = (props: { children: any; MenuItems: MenuItem[] }) => {
  return (
    <div className="layout-wrapper">
      <div className="layout-main">
        <AppSidebar MenuItems={props.MenuItems}></AppSidebar>
        <div className="layout-main-content">{props.children}</div>
      </div>
    </div>
  );
};

export default MainContainer;
