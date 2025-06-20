"use client";
import { InputField, SelectField } from "@/components/FormField";
import { Table, Td } from "@/components/Table";
// import { assignBusStatusToggle } from "@/lib/fetchData";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";

import Link from "next/link";
import React, { useState } from "react";
import { convertTo12HourFormat } from "@/utils/timeFormat";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Pagination from "@/components/Pageination";
import { GiCheckMark } from "react-icons/gi";
import { toast } from "react-toastify";

const tableHeaders = [
  "Bus Number",
  "Slot Name",
  "Road",
  "Bus Type",
  "Gender",
  "Time",
  "Status",
  "Actions",
];

const userOption = ["All Types", "Students", "Teachers", "Staff"];

const Content = ({ assignBus = [], adminId, fetchAssignBus }) => {
  const [busNumber, setBusNumber] = useState("");
  const [busType, setBusType] = useState("All Types");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Handler
  const handleBusNumebr = (e) => {
    setBusNumber(e.target.value);
  };
  const handleBusType = (value) => {
    setBusType(value);
  };

  // Filter
  const filterByBusNumber = (bus) =>
    busNumber
      ? bus?.busNo.toString().includes(busNumber.toString()) ||
        bus?.scheduleName.toString().includes(busNumber.toString())
      : true;

  const filterByBusType = (bus) =>
    busType === "All Types" ? true : bus?.busType === busType;

  // Handle delete assign bus

  const deleteHelperHandler = async () => {
    if (!deleteId) {
      toast.error("Id is required");
      return;
    }
    try {
      const response = await fetch(
        `https://api.salmanshahriar.wiki/api/admin/assign-bus/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Assign bus deleted successfully!");
        await fetchAssignBus();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete assign bus!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting helper delete:", error);
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const changeStatus = async (id, isActive) => {
    try {
      console.log("id:" + id);
      const response = await fetch(
        `https://api.salmanshahriar.wiki/api/admin/assign-bus/${id}/toggle-active`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ isActive: !isActive }),
        }
      );

      const data = await response.json();

      console.log(data);
      if (response.ok) {
        toast.success("Status updated successfully!");
        await fetchAssignBus();
      } else {
        toast.error(data.message || "Failed to update!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting driver details:", error);
    }
  };

  // const handleChangeStatus = (id,isActive)=>{

  // }
  return (
    <>
      <div className="flex flex-wrap justify-between items-center mb-4">
        <InputField
          placeholder="Search by Bus Number and slot name"
          type="text"
          value={busNumber}
          onChange={handleBusNumebr}
        />
        <SelectField selectOption={userOption} getValue={handleBusType} />
        <Link
          href={`/dashboard/${adminId}/assigned-bus?add=true`}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex gap-2 items-center"
        >
          <IoPersonAddSharp /> Assign New Bus
        </Link>
      </div>
      <Table tableHeaders={tableHeaders}>
        {assignBus?.buses
          ?.filter(filterByBusNumber)
          .filter(filterByBusType)
          .map((bus) => {
            const {
              id,
              busNo,
              scheduleName,
              busType,
              Gender,
              scheduleDetails = {},
              isActive,
            } = bus || {};
            const { route, time } = scheduleDetails || {};
            const fotmatedTime = convertTo12HourFormat(time);
            return (
              <tr key={id}>
                <Td>{busNo}</Td>
                <Td>{scheduleName}</Td>
                <Td>{route || "N/A"}</Td>
                <Td>{busType}</Td>
                <Td>{Gender || "N/A"}</Td>
                <Td>{fotmatedTime}</Td>
                {/* <Td>{Gender || "N/A"}</Td> */}

                <Td>
                  {isActive ? (
                    <div>
                      <div
                        className=" rounded-full shadow-inner cursor-pointer p-2 max-w-min mx-auto bg-slate-100"
                        // onClick={() => assignBusStatusToggle(id, isActive)}
                        onClick={() => changeStatus(id, isActive)}
                      >
                        <GiCheckMark className="text-green-500" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className=" rounded-full shadow-inner cursor-pointer p-2 max-w-min mx-auto bg-slate-100"
                      // onClick={() => scaheduleStatusToggle(id, isActive)}
                      onClick={() => changeStatus(id, isActive)}
                    >
                      <GiCheckMark className="text-gray-600" />
                    </div>
                  )}
                </Td>

                <Td>
                  <div className="h-full flex items-center justify-center gap-2 text-[1.4rem]  ">
                    <div
                      onClick={() => confirmDelete(id)}
                      className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
                    >
                      <MdOutlineDeleteOutline />
                    </div>
                    <Link
                      href={`/dashboard/${adminId}/assigned-bus?edit=${id}`}
                      className="bg-slate-100 p-2 rounded-full shadow-inner cursor-pointer"
                    >
                      <CiEdit />
                    </Link>
                  </div>
                </Td>
              </tr>
            );
          })}
      </Table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this assigned bus?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={deleteHelperHandler}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Content;
