import { MenuItem } from "@/app/types/layout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const AppSidebar = (props: { MenuItems: MenuItem[] }) => {
  const currentRoute: string | null = usePathname();
  return (
    <div className="layout-sidebar hover:layout-sidebar-active">
      <ul className="pt-6">
        {props.MenuItems.map((Menu, index) => (
          <li
            key={index}
            className={`cursor-pointer hover:surface-hover items-center mx-4 my-2 rounded-md `}
          >
            <Link href={Menu.path} key={index}>
              <div
                className={`${
                  currentRoute?.includes(Menu.path) && "link-active"
                } flex gap-x-4 p-2  rounded-md `}
              >
                <div>{Menu.icon}</div>
                <div className="menu-item-title" >{Menu.title}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
