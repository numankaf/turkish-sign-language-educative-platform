"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { BiCategory } from "react-icons/bi";
import { PrimeReactContext } from "primereact/api";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { axiosBase } from "@/app/lib/axios";
import { Toast } from "primereact/toast";
import Switch from "react-switch";
import { CiLight } from "react-icons/ci";
import { MdOutlineDarkMode } from "react-icons/md";
const AppTopbar = () => {
  const { changeTheme } = useContext<any>(PrimeReactContext);
  const [theme, setTheme] = useState<string>("dark");
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const { data: session, status } = useSession();
  const [isDarkMode, setDarkMode] = useState(false);
  const toggleDarkMode = (checked: boolean) => {
    setDarkMode(checked);
    changeTheme(
      isDarkMode ? "lara-dark-teal" : "lara-light-teal",
      isDarkMode ? "lara-light-teal" : "lara-dark-teal",
      "theme-link",
      () => {}
    );
    localStorage.setItem(
      "theme",
      isDarkMode ? "lara-light-teal" : "lara-dark-teal"
    );
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme !== null) {
      localTheme.includes("dark") ? setDarkMode(true) : setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const logout = () => {
    axiosBase
      .post("/auth/logout", {
        refresh_token: session?.user.refresh_token,
      })
      .then(() => {
        console.log("Logged out");
      })
      .catch((e)=>{
        
      });
    signOut({ redirect: false }).then(() => {
      router.push("/auth/login"); // Redirect to the dashboard page after signing out
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <header className="antialiased w-full z-50">
        <nav className="surface-ground px-4 py-2.5 h-16">
          <div className="flex flex-wrap justify-between items-center">
            <div></div>
            <div className="flex items-center ">
              <div className="mx-2">
                <Switch
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                   handleDiameter={28}
                  offColor={"#F6F9FC"}
                  onColor={"#2E323F"}
                  offHandleColor={"#d1ca3f"}
                  onHandleColor={"#44486d"}
                  height={40}
                  width={70}
                  borderRadius={6}
                  activeBoxShadow="0px 0px 1px 2px #fffc35"
                  uncheckedIcon={
                    <div className="w-full h-full flex items-center justify-center">
                      <MdOutlineDarkMode size={25} />
                    </div>
                  }
                  checkedIcon={
                    <div className="w-full h-full flex items-center justify-center">
                      <CiLight size={25} />
                    </div>
                  }
                  uncheckedHandleIcon={
                    <div className="w-full h-full flex items-center justify-center">
                      <CiLight size={25} color="white" />
                    </div>
                  }
                  checkedHandleIcon={
                    <div className="w-full h-full flex items-center justify-center">
                      <MdOutlineDarkMode size={25} />
                    </div>
                  }
                  className="react-switch"
                  id="small-radius-switch"
                />
              </div>
              <div className=" relative inline-block flex" ref={menuRef}>
                <div>
                  <div>
                    <button
                      onClick={() => {
                        setOpen(!open);
                      }}
                      className="flex  justify-center items-center gap-2 rounded-full md:me-0  focus:ring-4 "
                      type="button"
                    >
                      <img
                        className="w-[35px] h-[35px] rounded-full "
                        loading="lazy"
                        src={"/images/empty-profile.jpg"}
                      />
                      <span>{session?.user.username}</span>
                      <IoIosArrowDown />
                    </button>
                  </div>

                  {open && (
                    <div
                      className="fadein animation-duration-150 absolute right-0 z-10 top-12 w-max origin-top-right rounded-md surface-overlay shadow-5 min-w-[12rem]"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                    >
                      <div className="py-1 m-1 divide-y divide-gray-100 ">
                        <div>
                          <div className="px-4 py-3  ">
                            <div>{session?.user.name}</div>
                            <div className="font-medium truncate">
                              {session?.user.email}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-row gap-1 items-center hover:surface-hover rounded-md cursor-pointer px-1">
                            <IoSettingsOutline />
                            <span className=" block px-1 py-2 ">Settings</span>
                          </div>
                        </div>
                        <div className="flex flex-row gap-1 items-center hover:surface-hover rounded-md px-1">
                          <MdLogout />
                          <button
                            type="submit"
                            onClick={logout}
                            className=" block px-1 py-2 "
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default AppTopbar;
