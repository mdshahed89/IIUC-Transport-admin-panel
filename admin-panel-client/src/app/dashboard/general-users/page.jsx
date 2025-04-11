"use client";
import { GeneralUsersTable, HelperTable } from "@/components/Table";
import React, { useEffect, useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { SubPageLoading } from "@/components/PageLoading";
import { toast } from "react-toastify";

const Page = () => {
  const [generalUsers, setGeneralUsers] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);

  const fetchGeneralUsers = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/all-users`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setGeneralUsers(data?.users || []);
      } else {
        console.log(data.message || "Failed to fetch general users!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch general users:", error);
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchGeneralUsers();
  }, []);

  console.log(generalUsers);
  

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1200px] mx-auto w-full md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl "
    >
      <div className=" flex justify-between items-center mb-4">
        <h3 className="text-[2rem] font-medium ">General Users</h3>
        {/* <Link
          href={`/dashboard/general-users/add-general-user`}
          className=" bg-green-500 flex items-center shadow-inner active:scale-95 transition-all duration-300 ease-out gap-2 text-white py-2 px-7 rounded hover:bg-green-600"
        >
          <IoPersonAddSharp />
          Add General User
        </Link> */}
      </div>
      <div className=" relative min-h-[20rem] ">
        {isLoading1 ? (
          <SubPageLoading />
        ) : (
          <GeneralUsersTable generalUsers={generalUsers} fetchGeneralUsers={fetchGeneralUsers} />
        )}
      </div>
    </motion.div>
  );
};

export default Page;
