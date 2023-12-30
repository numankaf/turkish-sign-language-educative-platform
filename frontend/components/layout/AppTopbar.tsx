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
import axios from "@/app/lib/axios";
import { Toast } from "primereact/toast";
const AppTopbar = () => {
  const [theme, setTheme] = useState<string>("dark");
  const [open, setOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const toast = useRef<Toast>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const localTheme = localStorage.getItem("lara-light-teal");
    if (localTheme !== null) {
      setTheme(localTheme);
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
    axios
      .post("/auth-service/auth/logout", {
        refreshToken: session?.user.refresh_token,
      })
      .then(() => {
        signOut({ redirect: false }).then(() => {
          router.push("/auth/login"); // Redirect to the dashboard page after signing out
        });
      })
      .catch((e) => {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: e.message,
          life: 3000,
        });
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
                      {/* <span>{session?.user.username}</span>
                      <IoIosArrowDown /> */}
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
