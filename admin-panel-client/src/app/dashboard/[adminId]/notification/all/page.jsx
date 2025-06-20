"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { SubPageLoading } from "@/components/PageLoading";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const Page = ({ params }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading1, setIsLoading1] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
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
        console.log(data.message || "Failed to fetch notification!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch notification:", error);
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleDeleteNotification = async () => {
    if (!notificationToDelete) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/notification/${notificationToDelete}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Notification deleted successfully!");
        fetchNotifications();
        // optionally refresh list or remove notification from state
      } else {
        toast.error(data.message || "Failed to delete notification!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error deleting notification:", error);
    } finally {
      setShowDeleteModal(false);
      setNotificationToDelete(null);
    }
  };

  const typeClassMap = {
  'Emergency Notice': 'bg-red-100 text-red-700',
  'Alert': 'bg-red-50 text-red-500',
  'Schedule Change': 'bg-yellow-50 text-yellow-500',
  'Delay': 'bg-orange-50 text-orange-500',
  'Cancellation': 'bg-gray-100 text-gray-600',
  'Info': 'bg-green-50 text-green-500',
};


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

      {isLoading1 ? (
        <div className=" relative min-h-[20rem] ">
          <SubPageLoading />
        </div>
      ) : (
        <div className=" space-y-5 ">
          {notifications &&
            notifications.length > 0 &&
            notifications.map((notification, idx) => (
              <div key={idx} className=" border-b pb-[1rem] ">
                <div className=" flex items-center justify-between ">
                  <div className=" flex items-center gap-2 mb-3 ">
                    <div
                      className={`px-2 py-0.5 rounded-md ${
                        typeClassMap[notification.type] ||
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {notification.type}
                    </div>
                  </div>

                  <div className=" flex items-center gap-2 ">
                    <Link
                      href={`/dashboard/${adminId}/notification/edit/${notification.id}`}
                      className=" bg-slate-50 shadow-inner text-[1.5rem] cursor-pointer hover:bg-slate-100 text-slate-700 transition-colors duration-300 ease-in-out p-2 rounded-full "
                    >
                      <CiEdit />
                    </Link>
                    <div
                      onClick={() => {
                        setNotificationToDelete(notification.id);
                        setShowDeleteModal(true);
                      }}
                      className=" bg-red-50 shadow-inner text-[1.5rem] cursor-pointer hover:bg-red-100 text-red-500 transition-colors duration-300 ease-in-out p-2 rounded-full "
                    >
                      <MdDeleteOutline />
                    </div>
                  </div>
                </div>
                <div className=" text-[1.4rem] font-medium  ">
                  <span className=" text-green-500 ">{idx + 1}.</span>{" "}
                  {notification?.title}
                </div>
                <div className=" text-lg ">{notification?.message}</div>
              </div>
            ))}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h2 className="text-lg font-semibold mb-4">
                  Are you sure you want to delete this notification?
                </h2>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleDeleteNotification}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Page;
