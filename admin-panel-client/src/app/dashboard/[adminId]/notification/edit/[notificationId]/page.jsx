"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ButtonLoading } from "@/components/PageLoading";
import { toast } from "react-toastify";
import Link from "next/link";
import { IoArrowBackSharp } from "react-icons/io5";

const Page = ({ params }) => {
  const [notification, setNotification] = useState({
    title: "",
    message: "",
    type: "Emergency Notice",
    recipientType: "Admin",
  });
  const [loading, setLoading] = useState(false);
  const { adminId, notificationId } = React.use(params);
  const [infoOpen, setInfoOpen] = useState(false);
  const [allOpen, setAllOpen] = useState(false);
  const infoRef = useRef(null);
  const allRef = useRef(null);

  const fetchNotification = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/notification/${notificationId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        // console.log("Fetched notification:", data);
        setNotification({
          title: data?.notification?.title || "",
          message: data?.notification?.message || "",
          type: data?.notification?.type || "Info",
          recipientType: data?.notification?.recipientType || "All",
        });
      } else {
        toast.error(data.message || "Failed to fetch notification!");
      }
    } catch (error) {
      toast.error("Error fetching notification!");
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, [notificationId]);

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

  const handleUpdateNotification = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/notification/${notificationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notification),
        }
      );

      const data = await response.json();

      // console.log(data);
      if (response.ok) {
        toast.success("Notification updated successfully!");
        // setNotification({
        //   title: "",
        //   message: "",
        //   type: "Info",
        //   recipientType: "All",
        // });
      } else {
        toast.error(data.message || "Failed to update notification!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error updating notification:", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(notification);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl"
    >
      <div className="flex items-center space-x-2 mb-10 justify-between">
        <h2 className="text-3xl font-semibold text-gray-800">
          Update Notification
        </h2>
        <Link
          href={`/dashboard/${adminId}/notification/all`}
          className=" p-3 rounded-full text-[#000] text-[1.5rem] bg-slate-50 shadow-inner transition-all duration-300 ease-in-out "
        >
          <IoArrowBackSharp />
        </Link>
      </div>

      <form onSubmit={handleUpdateNotification} className="space-y-6">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={notification.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter notification title"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={notification.message}
            onChange={(e) => handleChange("message", e.target.value)}
            placeholder="Enter your message"
            required
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
              {notification.type}
            </div>
            {infoOpen && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
                {["Emergency Notice", "Schedule Change", "Alert", "Delay", "Cancellation"].map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleChange("type", option);
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
            <label className="block text-gray-600 font-medium mb-1">
              Target
            </label>
            <div
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
              onClick={() => setAllOpen(!allOpen)}
            >
              {notification.recipientType}
            </div>
            {allOpen && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
                {["Admin", "Teacher", "Staff", "Student"].map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleChange("recipientType", option);
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

        <div className=" pt-5 ">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex relative h-[3rem] items-center active:scale-90 justify-center space-x-2 bg-green-500 text-white  rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
          >
            {loading ? <ButtonLoading /> : "Update Notification"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Page;
