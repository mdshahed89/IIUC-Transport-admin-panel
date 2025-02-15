"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const BusTripManagement = () => {
  const [tripDetails, setTripDetails] = useState({
    busNumber: "",
    startPoint: "",
    numberOfStudents: "",
    substituteDriverName: "",
    substituteHelperName: "",
  });

  const [tripReportDate, setTripReportDate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripDetails({ ...tripDetails, [name]: value });
  };

  const handleFetchReport = () => {
    console.log("Fetching report for:", tripReportDate);
  };

  console.log(tripDetails);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto md:mt-8 px-3 py-5 md:px-8 bg-white rounded-lg md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)]"
    >
      <h1 className="text-3xl font-semibold mb-8">Bus Trip Management</h1>

      <div className="space-y-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Log Manual Trip</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="busNumber"
              value={tripDetails.busNumber}
              onChange={handleChange}
              placeholder="Bus Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
            <input
              type="text"
              name="startPoint"
              value={tripDetails.startPoint}
              onChange={handleChange}
              placeholder="Start Point"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
            <input
              type="number"
              name="numberOfStudents"
              value={tripDetails.numberOfStudents}
              onChange={handleChange}
              placeholder="Number of Students"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
            <input
              type="text"
              name="substituteDriverName"
              value={tripDetails.substituteDriverName}
              onChange={handleChange}
              placeholder="Substitute Driver Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
            <input
              type="text"
              name="substituteHelperName"
              value={tripDetails.substituteHelperName}
              onChange={handleChange}
              placeholder="Substitute Helper Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
            <div className=" flex justify-end ">
              <button className=" px-7 bg-green-500 text-white p-2 rounded-lg transition-all ease-out active:scale-105 duration-300">
                Confirm Trip
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Trip Report</h2>
          <div className="space-y-4">
            <input
              type="date"
              value={tripReportDate}
              onChange={(e) => setTripReportDate(e.target.value)}
              className="w-full p-2 border outline-none border-gray-300 rounded-lg"
            />
            <div className=" flex justify-end ">
              <button
                onClick={handleFetchReport}
                className=" px-7 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 ttransition-all ease-out active:scale-105 duration-300"
              >
                Fetch Report
              </button>
            </div>
          </div>

          <div className="mt-6 ">
            <table className="w-full border-collapse min-w-max overflow-x-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border text-sm sm:text-base">Bus No</th>
                  <th className="p-2 border text-sm sm:text-base">
                    Start Point
                  </th>
                  <th className="p-2 border text-sm sm:text-base">
                    Driver Name
                  </th>
                  <th className="p-2 border text-sm sm:text-base">
                    Helper Name
                  </th>
                  <th className="p-2 border text-sm sm:text-base">
                    No. of Students
                  </th>
                  <th className="p-2 border text-sm sm:text-base">Trip Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-sm sm:text-base">
                  <td className="p-2 border">101</td>
                  <td className="p-2 border">Main Station</td>
                  <td className="p-2 border">John Doe</td>
                  <td className="p-2 border">Jane Doe</td>
                  <td className="p-2 border">30</td>
                  <td className="p-2 border">14/02/2025</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-end">
              <button className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg text-sm sm:text-base active:scale-95 transition-all duration-300 ease-out">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BusTripManagement;
