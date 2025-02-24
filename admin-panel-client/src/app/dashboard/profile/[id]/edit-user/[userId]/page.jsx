"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosNotificationsOutline } from "react-icons/io";
import { ButtonLoading } from "@/components/PageLoading";
import { toast } from "react-toastify";
import { useData } from "@/app/context/Context";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";

const Page = ({ params }) => {
  const { userData } = useData();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Admin",
  });
  const { userId } = React.use(params);
  const [loading, setLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const infoRef = useRef(null);

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const fetchUser = async () => {
    setIsLoading1(true);
    const token = userData?.token;
    if (!token) {
      console.log("You are not authenticated to get users");
      setIsLoading1(false);
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setUser(
          {
            name: data?.name,
            email: data?.email,
            password: data?.password,
            role: data?.role,
          } || {}
        );
      } else {
        console.log(data?.message || "Failed to fetch user!");
      }
    } catch (error) {
      // toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch user:", error);
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (infoRef.current && !infoRef.current.contains(event.target)) {
        setInfoOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    const token = userData?.token;
    if (!token) {
      toast.error("You are not authenticated");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        toast.success("User added successfully!");
        setUser({
          name: "",
          email: "",
          password: "",
          role: "Admin",
        });
      } else {
        toast.error(data.message || "Failed to submit user!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting user:", error);
    } finally {
      setLoading(false);
    }
  };

  //   console.log(user);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto md:mt-8 px-3 md:px-8 py-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl"
    >
      <div className="flex items-center justify-between space-x-2 mb-10">
        <h2 className="text-3xl font-semibold text-gray-800">Update User</h2>
        <Link
          href={`/dashboard/profile/${userData?.id}`}
          className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] "
        >
          <IoArrowBackSharp />
        </Link>
      </div>

      <form onSubmit={handleSubmitUser} className="space-y-4">
        <div>
          <label className="block text-gray-600 font-medium mb-1">Name*</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter user name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-gray-600 font-medium mb-1">Email*</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter user email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Password*
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="Enter user password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
          />
        </div>

        <div className=" relative" ref={infoRef}>
          <label className="block text-gray-600 font-medium mb-1">Role</label>
          <div
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
            onClick={() => setInfoOpen(!infoOpen)}
          >
            {user.role}
          </div>
          {infoOpen && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
              {["Admin", "Manager"].map((option) => (
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

        <div className=" pt-5 ">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex relative h-[3rem] items-center active:scale-90 justify-center space-x-2 bg-green-500 text-white  rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
          >
            {loading ? <ButtonLoading /> : "Update User"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Page;
