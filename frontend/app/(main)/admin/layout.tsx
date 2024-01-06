import MainContainer from "@/components/layout/MainContainer";

import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { MenuItem } from "@/app/types/layout";
import { FaHandsWash } from "react-icons/fa";
interface Props {
  children: React.ReactNode;
}
export default function AdminLayout({ children }: Props) {
  const MenuItems: MenuItem[] = [
    { title: "Home", path: "/admin/home", icon: <FaHome size={25} /> },
    { title: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard size={25} /> },
    { title: "Practice", path: "/admin/practice", icon: <FaHandsWash  size={25} /> },
    {
      title: "Users",
      path: "/users",
      icon: <FaUsersCog size={25} />,
    },
  ];

  return <MainContainer MenuItems={MenuItems}>{children}</MainContainer>;
}
