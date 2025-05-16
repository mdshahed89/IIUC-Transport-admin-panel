"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonLoading, SubPageLoading } from "@/components/PageLoading";
import { toast } from "react-toastify";

const Page = ({ params }) => {
  const [driveInfo, setDriverInfo] = useState({
    driverName: "",
    driverID: "",
    address: "",
    driverNID: "",
    driverLicense: "",
    phone: "",
  });
  const [isLoading1, setIsLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id, adminId } = React.use(params);
  const router = useRouter();

  const fetchDriver = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/driver-info/${id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        // setDrivers(data || []);
        setDriverInfo({
          driverName: data?.driverName,
          driverID: data?.driverID,
          address: data?.address,
          driverNID: data?.driverNID,
          driverLicense: data?.driverLicense,
          phone: data?.phone,
        });
      } else {
        console.log(data.message || "Failed to fetch drivers!");
        router.push(`/dashboard/${adminId}/driver-info`);
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch drivers:", error);
      router.push(`/dashboard/${adminId}/driver-info`);
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchDriver();
  }, []);

  const updateDriverHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/driver-info/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(driveInfo),
        }
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        toast.success("Driver updated successfully!");
      } else {
        toast.error(data.message || "Failed to update driver!");
        fetchDriver();
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting driver details:", error);
      fetchDriver();
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setDriverInfo({ ...driveInfo, [name]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[800px] mx-auto md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl"
    >
      <div className="flex items-center space-x-2 mb-10 justify-between">
        <h2 className="text-3xl font-semibold text-gray-800">
          Edit Driver Info
        </h2>
        <Link
          href={`/dashboard/${adminId}/driver-info`}
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
        <form onSubmit={updateDriverHandler} className="space-y-3">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Driver Name
            </label>
            <input
              type="text"
              name="driverName"
              value={driveInfo.driverName}
              onChange={(e) => handleChange("driverName", e.target.value)}
              placeholder="Enter driver name"
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
              value={driveInfo.driverID}
              onChange={(e) => handleChange("driverID", e.target.value)}
              placeholder="Enter driver id"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div className=" mt-3 ">
            <label className="block text-gray-600 font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={driveInfo.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter driver phone no"
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
              value={driveInfo.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Enter driver address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className=" mt-3 ">
            <label className="block text-gray-600 font-medium mb-1">
              NID (National ID)
            </label>
            <input
              type="text"
              name="driverNID"
              value={driveInfo.driverNID}
              onChange={(e) => handleChange("driverNID", e.target.value)}
              placeholder="Enter driver driverNID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
          </div>
          <div className=" mt-3 ">
            <label className="block text-gray-600 font-medium mb-1">
              License Number
            </label>
            <input
              type="text"
              name="driverLicense"
              value={driveInfo.driverLicense}
              onChange={(e) => handleChange("driverLicense", e.target.value)}
              placeholder="Enter driver license"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div className=" pt-5 ">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex relative h-[3rem] items-center active:scale-90 justify-center space-x-2 bg-green-500 text-white px-4 rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
            >
              {loading ? <ButtonLoading /> : "Update Driver"}
            </motion.button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default Page;
