"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";
import { ButtonLoading } from "@/components/PageLoading";
import { toast } from "react-toastify";

const Page = () => {
  const [driverDetails, setDriverDetails] = useState({
    driverName: "",
      driverID: "",
      phone: "",
      address: "",
      driverNID: "",
      driverLicense: "",
    });
    const [loading, setLoading] = useState(false)
  
    const handleChange = (name, value) => {
      setDriverDetails({ ...driverDetails, [name]: value });
    };
  
    const createDriverHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/driver-info`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(driverDetails),
            }
          );
    
          const data = await response.json();
    
          console.log(data);
          if (response.ok) {
            toast.success("Driver added successfully!");
            setDriverDetails({
              driverName: "",
                driverID: "",
                phone: "",
                address: "",
                driverNID: "",
                driverLicense: "",
              });
          } else {
            toast.error(data.message || "Failed to add driver!");
          }
        } catch (error) {
          toast.error("Something went wrong! Please try again.");
          console.error("Error submitting driver details:", error);
        } finally {
          setLoading(false);
        }
      };
  
      console.log(driverDetails);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[800px] mx-auto md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl"
    >
      <div className="flex items-center space-x-2 mb-10 justify-between">
        <h2 className="text-3xl font-semibold text-gray-800">Add New Driver</h2>
        <Link href={`/dashboard/driver-info`} className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] ">
        <IoArrowBackSharp />
        </Link>
      </div>

      <form onSubmit={createDriverHandler} className="space-y-3">
        <div>
          <label className="block text-gray-600 font-medium mb-1">
          Driver Name
          </label>
          <input
            type="text"
            name="driverName"
            value={driverDetails.driverName}
            onChange={(e) => handleChange("driverName", e.target.value)}
            placeholder="Enter driver name"
                  required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
          </div>
          <div className=" mt-3 ">
            <label className="block text-gray-600 font-medium mb-1">
            Driver ID
            </label>
            <input
              type="text"
              name="driverID"
              value={driverDetails.driverID}
              onChange={(e) => handleChange("driverID", e.target.value)}
              placeholder="Enter driver id"
                  required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
            </div>
            
              <div className=" mt-3 ">
                <label className="block text-gray-600 font-medium mb-1">
                  Phone
                </label>
                <input
                  type="number"
                  name="phone"
                  value={driverDetails.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="Enter driver phone"
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
                  value={driverDetails.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder="Enter driver address"
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
                  name="driverNID"
                  value={driverDetails.driverNID}
                  onChange={(e) => handleChange("driverNID", e.target.value)}
                  placeholder="Enter driver nid"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div className=" mt-3 ">
                <label className="block text-gray-600 font-medium mb-1">
                License Number
                </label>
                <input
                  type="number"
                  name="driverLicense"
                  value={driverDetails.driverLicense}
                  onChange={(e) => handleChange("driverLicense", e.target.value)}
                  placeholder="Enter driver license number"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
                />
              </div>
            
          
      

        <div className=" pt-5 ">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex relative h-[3rem]  items-center active:scale-90 justify-center space-x-2 bg-green-500 text-white rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
        >
          {
            loading ? <ButtonLoading /> : "Add Driver"
          }
        </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Page;
