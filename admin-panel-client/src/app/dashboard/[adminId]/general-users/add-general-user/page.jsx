"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";
import { ButtonLoading } from "@/components/PageLoading";
import { toast } from "react-toastify";

const Page = ({params}) => {
  const [generalUserDetails, setGeneralUserDetails] = useState({
    name: "",
    helperID: "",
    phone: "",
    address: "",
    helperNID: "",
  });
  const [loading, setLoading] = useState(false);
const { adminId } = React.use(params);
  const handleChange = (name, value) => {
    setGeneralUserDetails({ ...generalUserDetails, [name]: value });
  };

  const addUserHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/all-users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(generalUserDetails),
        }
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        toast.success("General user added successfully!");
        setUserDetails({
          name: "",
          helperID: "",
          phone: "",
          address: "",
          helperNID: "",
        });
      } else {
        toast.error(data.message || "Failed to add general user!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting general user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(helperDetails);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[800px] mx-auto md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl"
    >
      <div className="flex items-center space-x-2 mb-10 justify-between">
        <h2 className="text-3xl font-semibold text-gray-800">
          Add General User
        </h2>
        <Link
          href={`/dashboard/${adminId}/general-users`}
          className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] "
        >
          <IoArrowBackSharp />
        </Link>
      </div>

      <form onSubmit={addUserHandler} className="space-y-3">
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={generalUserDetails.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter helper name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">ID</label>
          <input
            type="number"
            name="helperID"
            value={generalUserDetails.helperID}
            onChange={(e) => handleChange("helperID", e.target.value)}
            placeholder="Enter helper id"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={generalUserDetails.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Enter helper phone no"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={generalUserDetails.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Enter helper address"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className=" mt-3 ">
          <label className="block text-gray-600 font-medium mb-1">
            NID (National ID)
          </label>
          <input
            type="number"
            name="helperNID"
            value={generalUserDetails.helperNID}
            onChange={(e) => handleChange("helperNID", e.target.value)}
            placeholder="Enter helper nid"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className=" pt-5 ">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full relative h-[3rem] flex items-center active:scale-90 justify-center space-x-2 bg-green-500 text-white rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
          >
            {loading ? <ButtonLoading /> : "Add General User"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Page;
