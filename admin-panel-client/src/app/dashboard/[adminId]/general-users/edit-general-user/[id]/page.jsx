"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";
import { ButtonLoading, SubPageLoading } from "@/components/PageLoading";
import { toast } from "react-toastify";

const Page = ({ params }) => {
  const [generalUserDetails, setGeneralUserDetails] = useState({
    userName: "",
    Department: "",
    pickupPoint: "",
    gender: "",
    userType: "",
  });
  const { id, adminId } = React.use(params);
  const [loading, setLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const handleChange = (name, value) => {
    setGeneralUserDetails({ ...generalUserDetails, [name]: value });
  };

  const typeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (typeRef.current && !typeRef.current.contains(event.target)) {
        setIsTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchGeneralUsers = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/all-users/${id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setGeneralUserDetails({
          userName: data?.user?.userName,
          Department: data?.user?.Department,
          pickupPoint: data?.user?.pickupPoint,
          gender: data?.user?.gender,
          userType: data?.user?.userType,
        });
      } else {
        console.log(data.message || "Failed to fetch general user!");
        router.push(`/dashboard/${adminId}/general-users`);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch general users:", error);
      router.push(`/dashboard/${adminId}/general-users`);
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchGeneralUsers();
  }, []);

  const updateGeneralUserHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/all-users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(generalUserDetails),
        }
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        toast.success("General User Updated successfully!");
      } else {
        toast.error(data.message || "Failed to update general user!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting update general user:", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log("h", helperDetails?.helperID);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[800px] mx-auto md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl"
    >
      <div className="flex items-center space-x-2 mb-10 justify-between">
        <h2 className="text-3xl font-semibold text-gray-800">
          Edit General User Info
        </h2>
        <Link
          href={`/dashboard/${adminId}/general-users`}
          className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] "
        >
          <IoArrowBackSharp />
        </Link>
      </div>

      {isLoading1 ? (
        <div className=" relative min-h-[20rem] ">
          <SubPageLoading />
        </div>
      ) : (
        <form onSubmit={updateGeneralUserHandler} className="space-y-3">
          <div className=" mt-3 ">
            <label className="block text-gray-600 font-medium mb-1">Name</label>
            <input
              type="text"
              name="userName"
              value={generalUserDetails.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
              placeholder="Enter general user name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className=" mt-3 ">
            <label className="block text-gray-600 font-medium mb-1">
              Department
            </label>
            <input
              type="text"
              name="Department"
              value={generalUserDetails.Department}
              onChange={(e) => handleChange("Department", e.target.value)}
              placeholder="Enter general user department"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className=" mt-3 ">
            <label className="block text-gray-600 font-medium mb-1">
              Pickup Point
            </label>
            <input
              type="text"
              name="pickupPoint"
              value={generalUserDetails.pickupPoint}
              onChange={(e) => handleChange("pickupPoint", e.target.value)}
              placeholder="Enter pickup point"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className=" mt-3 ">
            <label className="block text-gray-600 font-medium mb-1">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              value={generalUserDetails.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              placeholder="Enter gender"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className=" relative" ref={typeRef}>
            <label className="block text-gray-600 font-medium mb-1">
              User Type
            </label>
            <div
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
              onClick={() => setIsTypeOpen(!isTypeOpen)}
            >
              {generalUserDetails.userType}
            </div>
            {isTypeOpen && (
              <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
                {["Student", "Teacher", "Staff"].map((option) => (
                  <li
                    key={option}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleChange("userType", option);
                      setIsTypeOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className=" pt-5 ">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full relative h-[3rem] flex items-center active:scale-90 justify-center space-x-2 bg-green-500 text-white rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
            >
              {loading ? <ButtonLoading /> : "Update General User Info"}
            </motion.button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default Page;
