import MainContainer from "@/components/layout/MainContainer";

import { TbBooks } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { GiVideoConference } from "react-icons/gi";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { MenuItem } from "@/app/types/layout";
interface Props {
  children: React.ReactNode;
}
export default function MainLayout({ children }: Props) {
  const MenuItems: MenuItem[] = [
    { title: "Home", path: "/main", icon: <FaHome size={25} /> },
    { title: "Dashboard", path: "/dashboard", icon: <MdDashboard size={25} /> },
    {
      title: "My Lessons",
      path: "/lessons",
      icon: <TbBooks  size={25} />,
    },
    {
      title: "About",
      path: "/about",
      icon: <IoInformationCircleOutline size={25} />,
    },
    {
      title: "Help",
      path: "/help",
      icon: <IoIosHelpCircleOutline size={25} />,
    },
  ];

  return <MainContainer MenuItems={MenuItems}>{children}</MainContainer>;
}
