import MainContainer from "@/components/layout/MainContainer";

import { MdDashboard } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { MenuItem } from "@/app/types/layout";
import { FaHandsWash } from "react-icons/fa";
import { BsCollection } from "react-icons/bs";
interface Props {
  children: React.ReactNode;
}
export default function AdminLayout({ children }: Props) {
  const MenuItems: MenuItem[] = [
    { title: "Anasayfa", path: "/admin/home", icon: <FaHome size={25} /> },
    { title: "Genel", path: "/admin/dashboard", icon: <MdDashboard size={25} /> },
    { title: "Pratik", path: "/admin/practice", icon: <FaHandsWash  size={25} /> },
    { title: "Sözlük", path: "/admin/dictionary", icon: <BsCollection  size={25} /> },
    {
      title: "Kullanıcılar",
      path: "/users",
      icon: <FaUsersCog size={25} />,
    },
  ];

  return <MainContainer MenuItems={MenuItems}>{children}</MainContainer>;
}
