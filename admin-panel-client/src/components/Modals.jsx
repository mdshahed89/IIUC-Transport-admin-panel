"use client"

import { useData } from "@/app/context/Context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";


export const ProfileModal = ({ id, isPathInItems, adminId }) => {
  const { userData, logout } = useData();
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);
  const router = useRouter();
  const [route, setRoute] = useState("");

  const pathname = usePathname(); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const rt = sessionStorage.getItem("route")
      setRoute(rt || "");
    }
  }, [pathname]);

  useEffect(() => {
    const close = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = async () => {
    logout();
    toast.success("Logout Successfully!!");
    router.push("/")
  };  

  // console.log(route + "helo" + pathname);
  

  return (
    <div ref={dropDownRef} className="relative  ">
      <div onClick={() => setOpen((prev) => !prev)} className="">
        <div className=" cursor-pointer border-2 p-2 rounded-full border-gray-500 text-gray-300  ">
          <FaRegUser className=" text-[1.2rem] " />
        </div>
      </div>
      <div
        className={`${
          open
            ? "visible translate-y-0 duration-300"
            : "invisible translate-y-4"
        } absolute top-16 right-0 z-50 w-[15rem] p-[1rem] flex flex-col gap-1 rounded-xl bg-white shadow-[0px_5px_30px_rgba(0,0,0,0.15)]`}
      >
        {pathname === `/dashboard/${adminId}/profile/${userData?.id}` ? 
        (
          <Link
            href={`/dashboard/${adminId}`}
            onClick={() => {
              setOpen(!open)
              // sessionStorage.setItem("route", `/dashboard/${adminId}`)
            }}
            className={` rounded-md hover:bg-green-50 bg-slate-50 hover:text-green-500 cursor-pointer transition-colors duration-300 ease-in-out p-2 font-semibold  `}
          >
            Dashboard
          </Link>
        ) : (
          <Link
          href={`/dashboard/${adminId}/profile/${userData?.id}`}
          onClick={() => {
            setOpen(!open)
            // sessionStorage.removeItem("route")
          }}
          className={` rounded-md hover:bg-green-50 bg-slate-50 hover:text-green-500 cursor-pointer transition-colors duration-300 ease-in-out p-2 font-semibold  `}
        >
          Profile
        </Link>
          
        )}

        <div
          onClick={handleLogout}
          className=" cursor-pointer rounded-md bg-red-50 text-red-500 transition-colors duration-300 ease-in-out p-2  font-semibold flex items-center justify-between "
        >
          <div>Logg ut</div>
          <FiLogOut />
        </div>
      </div>
    </div>
  );
};
