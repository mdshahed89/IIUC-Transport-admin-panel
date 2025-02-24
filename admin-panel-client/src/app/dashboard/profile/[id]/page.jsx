"use client";

import { useData } from "@/app/context/Context";
import { SubPageLoading } from "@/components/PageLoading";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserTable } from "@/components/Table";
import Image from "next/image";

const Page = () => {
  const { userData, setUserData } = useData();

  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const decodeToken = jwtDecode(userData.token);
        // console.log(decodeToken);

        if (decodeToken?.role !== "Super Admin") {
          router.push("/");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserData({});
        router.push("/");
      }
    };

    if (userData?.token) {
      checkAuth();
    } else {
      router.push("/");
    }
  }, [router, userData]);

  return (
    <div className=" p-2 ">
     <div className=" md:p-5 p-3 max-w-[30rem]  mx-auto rounded-2xl md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] ">
     {/* <h2 className=" text-[2rem] mb-5 font-medium ">Profile</h2> */}
      <div className=" w-[6rem] h-[6rem] mx-auto rounded-full relative bg-black/10  ">
        <Image
          src={`https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png`}
          alt="Profile img"
          fill
          loading="lazy"
          className="p-2 object-cover "
        />
      </div>
      <div className=" flex flex-col items-center mt-4 ">
        <h3>Md Shahed ({userData?.role})</h3><h4>{userData?.email}</h4>
      </div>
     </div>

      <div>
        <GetAllUsers userData={userData} />
      </div>
    </div>
  );
};

export default Page;

const GetAllUsers = ({ userData }) => {
  const [users, setUsers] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);

  const fetchUsers = async () => {
    setIsLoading1(true);
    const token = userData?.token;
    if (!token) {
      console.log("You are not authenticated to get users");
      setIsLoading1(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUsers(data || []);
      } else {
        console.log(data?.message || "Failed to fetch users!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1200px] mx-auto md:p-7 p-3 w-full md:mt-8 py-8 bg-white rounded-2xl md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] "
    >
      <div className=" flex justify-between items-center mb-4 ">
        <h3 className="text-[2rem] font-medium">All Users</h3>
        <Link
          href={`/dashboard/profile/${userData?.id}/add-user`}
          className=" bg-green-500 px-7 py-2 rounded-md w-fit text-white font-medium active:scale-95 cursor-pointer transition-all duration-300 ease-in-out mt-4 "
        >
          Add User
        </Link>
      </div>
      <div className=" relative min-h-[20rem] ">
        {isLoading1 ? (
          <SubPageLoading />
        ) : (
          <UserTable users={users} fetchUsers={fetchUsers} token={userData?.token} adminId={userData?.id} />
        )}
      </div>
    </motion.div>
  );
};
