import { MenuItem } from "@/app/types/layout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const AppSidebar = (props: { MenuItems: MenuItem[] }) => {
  const currentRoute: string | null = usePathname();
  return (
    <div className="layout-sidebar hover:layout-sidebar-active">
      <div className="flex items-center justify-start px-4 py-3">
        <div className="shrink-0 ">
          <img src="/images/logo.png" alt="logo" width={50} height={50}/>
        </div>
        <div className="menu-item-title shrink-0 pl-2 text-primary uppercase text-lg">DuoSignLanguage</div>
      </div>
      <ul>
        {props.MenuItems.map((Menu, index) => (
          <li
            key={index}
            className={`cursor-pointer hover:surface-hover items-center mx-5 my-3 rounded-md `}
          >
            <Link href={Menu.path} key={index}>
              <div
                className={`${
                  currentRoute?.includes(Menu.path) && "link-active"
                } flex gap-x-4 p-2  rounded-md `}
              >
                <div>{Menu.icon}</div>
                <div className="menu-item-title">{Menu.title}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
