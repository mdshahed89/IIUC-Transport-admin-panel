"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";

const Page = () => {
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    info: "Info",
    all: "All",
  });


  const handleChange = (name, value) => {
    setNotification({ ...notification, [name]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[800px] mx-auto md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl"
    >
      <div className="flex items-center space-x-2 mb-10 justify-between">
        <h2 className="text-3xl font-semibold text-gray-800">Edit Driver Info</h2>
        <Link href={`/dashboard/driver-info`} className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] ">
        <IoArrowBackSharp />
        </Link>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-gray-600 font-medium mb-1">
          Driver Name
          </label>
          <input
            type="text"
            name="title"
            value={notification.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter notification title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
          </div>
          <div className=" mt-3 ">
            <label className="block text-gray-600 font-medium mb-1">
            Driver ID
            </label>
            <input
              type="text"
              name="title"
              value={notification.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter notification title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
            </div>
            
              <div className=" mt-3 ">
                <label className="block text-gray-600 font-medium mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="title"
                  value={notification.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter notification title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className=" mt-3 ">
                <label className="block text-gray-600 font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="title"
                  value={notification.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter notification title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className=" mt-3 ">
                <label className="block text-gray-600 font-medium mb-1">
                NID (National ID)
                </label>
                <input
                  type="text"
                  name="title"
                  value={notification.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter notification title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className=" mt-3 ">
                <label className="block text-gray-600 font-medium mb-1">
                License Number
                </label>
                <input
                  type="text"
                  name="title"
                  value={notification.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Enter notification title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
                />
              </div>
            
          
      

        <div className=" pt-5 ">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex  items-center active:scale-90 justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
        >
          <span>Submit</span>
        </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Page;
