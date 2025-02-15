"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useData } from "./context/Context";
import { toast } from "react-toastify";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userData, setUserData } = useData();

  // console.log("url",process.env.NEXT_PUBLIC_BACKEND_URL);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        console.log("Login successful:", data);
        toast.success("Login Successfully")
      } else {
        console.error("Login failed:", data.message || "Unknown error");
        toast.error("Failed to login, Please try again")
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to login, Please try again")
    }
  };

  console.log(username, password);
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 font-Georama">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-[0_2px_4px_#00000030,0_-2px_4px_#00000020,3px_0px_4px_#00000020,-3px_0px_4px_#00000020]"
      >
        {/* shadow-[0_4px_8px_#00800099,0_-4px_8px_#00800066,6px_0px_8px_#00800066,-6px_0px_8px_#00800066] */}
        <h2 className="text-white text-2xl font-semibold text-center mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-out outline-none"
              placeholder="Enter your username"
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-out outline-none"
              placeholder="Enter your password"
              required
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium transition-all"
          >
            Login
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
