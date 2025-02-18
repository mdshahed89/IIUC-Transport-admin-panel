"use client";
import { DriverTable } from "@/components/Table";
import React, { useEffect, useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Link from "next/link";
import { SubPageLoading } from "@/components/PageLoading";

const Page = () => {
  const [drivers, setDrivers] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);

  const fetchDrivers = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/driver-info`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setDrivers(data || []);
      } else {
        console.log(data.message || "Failed to fetch drivers!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch drivers:", error);
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1200px] mx-auto w-full md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl "
    >
      <div className=" flex justify-between items-center mb-4 ">
        <h3 className="text-[2rem] font-medium">Driver Information</h3>
        <Link
          href={`/dashboard/driver-info/add-driver`}
          className=" bg-green-500 flex items-center shadow-inner active:scale-95 transition-all duration-300 ease-out gap-2 text-white py-2 px-7 rounded hover:bg-green-600"
        >
          <IoPersonAddSharp />
          Add New Driver
        </Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by Name, ID, Phone no, Address"
          className=" outline-none border-2 rounded-md focus:border-green-500 transition-all duration-300 ease-in-out p-2 max-w-[40rem] w-full "
        />
      </div>
      <div className=' relative min-h-[20rem] '>
            {
              isLoading1 ? <SubPageLoading /> : <DriverTable drivers={drivers} fetchDrivers={fetchDrivers} />
            }
            </div>
    </motion.div>
  );
};

export default Page;
