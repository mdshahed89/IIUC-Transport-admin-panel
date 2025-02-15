"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosNotificationsOutline } from "react-icons/io";

const Page = () => {
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    info: "Info",
    all: "All",
  });

  const [infoOpen, setInfoOpen] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const infoRef = useRef(null);
  const allRef = useRef(null);

  const handleChange = (name, value) => {
    setNotification({ ...notification, [name]: value });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setInfoOpen(false);
      }
      if (allRef.current && !allRef.current.contains(event.target)) {
        setAllOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto md:mt-8 p-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl"
    >
      <div className="flex items-center space-x-2 mb-10">
        <h2 className="text-3xl font-semibold text-gray-800">Notification</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={notification.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter notification title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={notification.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Enter your message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            rows="4"
          />
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2 relative" ref={infoRef}>
            <label className="block text-gray-600 font-medium mb-1">Type</label>
            <div
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
              onClick={() => setInfoOpen(!infoOpen)}
            >
              {notification.info}
            </div>
            {infoOpen && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
                {["Info", "Warning", "Alert"].map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleChange("info", option);
                      setInfoOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="w-1/2 relative" ref={allRef}>
            <label className="block text-gray-600 font-medium mb-1">Target</label>
            <div
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
              onClick={() => setAllOpen(!allOpen)}
            >
              {notification.all}
            </div>
            {allOpen && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
                {["All", "Admin", "User"].map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleChange("all", option);
                      setAllOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center active:scale-90 justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
        >
          <span>Send Notification</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Page;
