import { MenuItem } from "@/app/types/layout";
import { AppSidebar } from "./AppSidebar";
import AppTopbar from "./AppTopbar";
import SimpleContainer from "./SimpleContainer";
const MainContainer = (props: { children: any; MenuItems: MenuItem[] }) => {
  return (
    <SimpleContainer>
      <div className="layout-wrapper">
        <div className="layout-main">
          <AppSidebar MenuItems={props.MenuItems}></AppSidebar>
          <AppTopbar></AppTopbar>
          <div className="layout-main-content">{props.children}</div>
        </div>
      </div>
    </SimpleContainer>
  );
};

export default MainContainer;
