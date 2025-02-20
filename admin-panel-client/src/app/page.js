"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useData } from "./context/Context";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ButtonLoading } from "@/components/PageLoading";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData, setUserData } = useData();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const decodeToken = jwtDecode(userData.token || "");
  //       if (decodeToken?.role === "Super Admin") {
  //         router.push("/dashboard");
  //       }
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //     }
  //   };
  //   if (userData?.token) {
  //     checkAuth();
  //   }
  // }, [router, userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok && data?.token) {
        console.log("Login successful:", data);
        const decodeToken = jwtDecode(data?.token || "");
        toast.success("Login Successfully");
        setUserData({
          email: email,
          token: data?.token || "",
          id: decodeToken?.id,
          role: decodeToken?.role
        });
        router.push("/dashboard");
      } else {
        console.error("Login failed:", data.message || "Unknown error");
        toast.error("Failed to login, Please try again");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to login, Please try again");
    } finally {
      setLoading(false);
    }
  };

  // console.log("uu",userData);

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
        <form onSubmit={handleSubmit} className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-gray-300">Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-out outline-none"
              placeholder="Enter your email"
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="block text-gray-300">Password*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 transition-all duration-300 ease-out outline-none"
              placeholder="Enter your password"
              required
            />
          </motion.div>
          <div className=" pt-5 ">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full relative shadow-inner h-[3rem] bg-green-600 text-white  rounded-lg font-medium transition-all"
            >
              {loading ? <ButtonLoading /> : "Login"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
