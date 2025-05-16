"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Page = ({params}) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);
const { adminId } = React.use(params);
  const fetchNotifications = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/notification`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setNotifications(data?.notifications || []);
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
    fetchNotifications();
  }, []);

  // console.log(notifications);
  

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" md:mt-8 px-3 md:px-8 py-8 max-w-[50rem] "
    >
      <div className="flex items-center space-x-2 mb-10 justify-between">
        <h2 className="text-3xl font-semibold text-gray-800">
          All Notification
        </h2>
        <Link
          href={`/dashboard/${adminId}`}
          className=" px-10 py-2 rounded-md text-[#fff] bg-green-500 active:scale-95 transition-all duration-300 ease-in-out "
        >
          Back To Home
        </Link>
      </div>

      <div className=" space-y-5 ">
        {
        notifications && notifications.length > 0 && notifications.map((notification, idx) => (
          <div key={idx} className=" border-b pb-[1rem] ">
            <div className=" text-[1.4rem] font-medium ">{notification?.title}</div>
            <div className=" text-lg ">{notification?.message}</div>
          </div>
        ))
      }
      </div>

    </motion.div>
  );
};

export default Page;
