"use client";
import { ButtonLoading, SubPageLoading } from "@/components/PageLoading";
import { TripTable } from "@/components/Table";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const BusTripManagement = () => {
  const [tripDetails, setTripDetails] = useState({
    busNo: "",
    startPoint: "",
    noOfStudents: "",
    subsDriverName: "",
    subsHelperName: "",
  });
  const [tripLoading, setTripLoading] = useState(false);

  const [tripReportDate, setTripReportDate] = useState("");
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [trips, setTrips] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripDetails({ ...tripDetails, [name]: value });
  };

  const fetchTrips = async () => {

    setIsLoading3(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/trip-info/fetch-trip-info`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setTrips(data?.data || []);
      } else {
        console.log(data.message || "Failed to fetch trips!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch trips:", error);
    } finally {
      setIsLoading3(false);
    }
  };

  useEffect(()=> {
    fetchTrips()
  }, [])

  const handleSubmitTrip = async (e) => {
    e.preventDefault();
    setTripLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/trip-info/manual-trip`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tripDetails),
        }
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        toast.success("Trip submitted successfully!");
        setTripDetails({
          busNo: "",
          startPoint: "",
          noOfStudents: "",
          subsDriverName: "",
          subsHelperName: "",
        });
      } else {
        toast.error(data.message || "Failed to submit trip!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting trip:", error);
    } finally {
      setTripLoading(false);
    }
  };

  const fetchTripWithDate = async (e) => {
    e.preventDefault();
    if (!tripReportDate) {
      toast.error("Select a date to get data");
      return;
    }
    setIsLoading2(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/trip-info/fetch-trip-info?tripDate=${tripReportDate}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        toast.success("Trip Fetched successfully!");
        setTrips(data?.data || []);
        setTripReportDate("");
      } else {
        toast.error(data.message || "Failed to fetch trips!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch trips:", error);
    } finally {
      setIsLoading2(false);
    }
  };

  // console.log(tripReportDate);

  const [downloadLoading, setDownloadLoading] = useState(false);

  const downloadPDF = () => {
    setDownloadLoading(true);
  
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "normal"); // Fix for setFontStyle issue
      doc.text("Bus Trip Details", 14, 15);
  
      autoTable(doc, {
        startY: 25,
        head: [
          [
            "Bus No",
            "Start Point",
            "Driver Name",
            "Helper Name",
            "Sub Driver Name",
            "Sub Helper Name",
            "No. of Students",
            "Trip Date",
          ],
        ],
        body: trips.map((dt) => [
          dt?.busNo || "-",
          dt?.startPoint || "-",
          dt?.driverName || "-",
          dt?.helperName || "-",
          dt?.subDriverName || "-",
          dt?.subHelperName || "-",
          dt?.noOfStudents || "-",
          dt?.tripDate || "-",
        ]),
        theme: "grid",
        styles: {
          font: "helvetica",
          fontSize: 10,
          halign: "center",
        },
        headStyles: {
          fillColor: "#666666", // Set the background color for the header row
          textColor: [255, 255, 255], // Set text color to white
           // Horizontally center the text
        },
      });
  
      doc.save("Bus_Trip_Details.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto md:mt-8 px-3 py-5 md:px-8 bg-white rounded-lg md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)]"
    >
      <h1 className="text-3xl font-semibold mb-8">Bus Trip Management</h1>

      <div className="space-y-10">
        <form onSubmit={handleSubmitTrip}>
          <h2 className="text-2xl font-semibold mb-4">Log Manual Trip</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="busNo"
              value={tripDetails.busNo}
              onChange={handleChange}
              placeholder="Bus Number"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
            <input
              type="text"
              name="startPoint"
              value={tripDetails.startPoint}
              onChange={handleChange}
              placeholder="Start Point"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
            <input
              type="number"
              name="noOfStudents"
              value={tripDetails.noOfStudents}
              onChange={handleChange}
              placeholder="Number of Students"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
            <input
              type="text"
              name="subsDriverName"
              value={tripDetails.subsDriverName}
              onChange={handleChange}
              placeholder="Substitute Driver Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
            <input
              type="text"
              name="subsHelperName"
              value={tripDetails.subsHelperName}
              onChange={handleChange}
              placeholder="Substitute Helper Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
            />
            <div className=" flex justify-end ">
              <button className=" relative h-[2.5rem] w-[9rem]  bg-green-500 text-white rounded-lg transition-all ease-out active:scale-105 duration-300">
                {tripLoading ? <ButtonLoading /> : "Confirm Trip"}
              </button>
            </div>
          </div>
        </form>

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
              <div
                onClick={fetchTripWithDate}
                className=" relative w-[9rem] h-[2.5rem] cursor-pointer bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-all ease-out active:scale-105 duration-300"
              >
                {isLoading2 ? <ButtonLoading /> : "Fetch Report"}
              </div>
            </div>
          </div>

          <div className="mt-6 relative ">
            {
              isLoading3 ? <div className=" relative min-h-[20rem] ">
                <SubPageLoading />
              </div> : <TripTable data={trips} />
            }
            {
              trips && trips.length > 0 && <div className="flex justify-end">
              <div onClick={downloadPDF} className=" cursor-pointer mt-4 bg-green-500 text-white px-6 py-2 rounded-lg text-sm sm:text-base active:scale-95 transition-all duration-300 ease-out">
                {
                  downloadLoading ? "Loading..." : "Download"
                }
              </div>
            </div>
            }
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BusTripManagement;
