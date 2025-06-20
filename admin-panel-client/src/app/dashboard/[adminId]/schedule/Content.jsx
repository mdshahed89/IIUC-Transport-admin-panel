"use client";
import Button from "@/components/Button";
import { InputField, SelectField } from "@/components/FormField";
import { Table, Td } from "@/components/Table";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";

import {
  deleteDataAndRevalidatePath,
  scaheduleStatusToggle,
} from "@/lib/fetchData";

import Link from "next/link";
import React, { useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";
import { convertTo12HourFormat } from "@/utils/timeFormat";
import ScheduleModal from "./ScheduleModal";
import { toast } from "react-toastify";

// Table header
const tableHeaders = [
  "Slot Name",
  "Road",
  "Start Point",
  "End Point",
  "Time",
  "Schedule Type",
  "Status",
  "Action",
];

// Schedule Options
const scheduleOptions = [
  "All",
  "Regular Schedule",
  "Friday Schedule",
  "Exam Schedule",
  "Library Schedule",
  "Residential Schedule",
  "Special Schedule",
];

const Content = ({ schedules, scheduleTypes, adminId, fetchSchedule }) => {
  const [filter, setFilter] = useState("");
  const [scheduleType, setscheduleType] = useState("All");
  const [status, setStatus] = useState();

  const [showModal, setShowModal] = useState(false);
  const [deledeId, setDeleteId] = useState(null);

  const deleteSchedules = async () => {
    if (!deledeId) {
      toast.error("Id is required");
      return;
    }
    try {
      const response = await fetch(
        `https://api.salmanshahriar.wiki/api/admin/bus-schedules/${deledeId}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);

      if (response.ok) {
        toast.success("Schedule deleted successfully!");
        await fetchSchedule();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete Schedule!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting Schedule delete:", error);
    } finally {
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // Handlers
  const clearFilter = () => {
    setFilter("");
    setscheduleType("All");
    setStatus("");
  };

  const handleSchedule = (value) => {
    setscheduleType(value);
  };

  const handleStatus = () => {
    if (status === "active") {
      setStatus("inactive");
    } else {
      setStatus("active");
    }
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  // Filter Schedule type
  const filterByScheduleType = (schedule) =>
    scheduleType === "All" ? true : schedule.scheduleType === scheduleType;

  // Filter status
  const statusFilter = (schedule) => {
    if (!status) {
      return true;
    } else {
      return status === "active" ? schedule.isActive : !schedule.isActive;
    }
  };

  // Filter by name, route, point, and time
  const fillterSchedule = (schedule) =>
    filter
      ? schedule.scheduleName.toLowerCase().includes(filter.toLowerCase()) ||
        schedule.route.toLowerCase().includes(filter.toLowerCase()) ||
        schedule.startPoint.toLowerCase().includes(filter.toLowerCase()) ||
        schedule.endPoint.toLowerCase().includes(filter.toLowerCase()) ||
        schedule.time.toLowerCase().includes(filter.toLowerCase())
      : true;

  const handleStatusToggle = async (id, isActive) => {
    try {
      const response = await fetch(
        `https://api.salmanshahriar.wiki/api/admin/bus-schedules/${id}/toggle`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: !isActive }),
        }
      );

      console.log(response);

      const data = await response.json();

      if (response.ok) {
        toast.success("Updated successfully!");
        await fetchSchedule();
      } else {
        toast.error(data.message || "Failed to update!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting :", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        {/*  Filter by name, route, point, and time */}
        <InputField
          value={filter}
          onChange={handleFilter}
          placeholder="Search by slot name, road, point, time and type"
        />

        <SelectField selectOption={scheduleOptions} getValue={handleSchedule} />

        {/* Status filter */}
        <ScheduleModal scheduleTypes={scheduleTypes} />

        {/* Clear filter */}
        <Button onClick={clearFilter}>Clear Filter</Button>

        <Link
          href={`/dashboard/${adminId}/schedule?add=true`}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex gap-2 items-center"
        >
          <IoPersonAddSharp /> Add New Schedule
        </Link>
      </div>

      {/* Data Tabel */}
      <Table tableHeaders={tableHeaders}>
        {schedules
          ?.filter(fillterSchedule)
          .filter(filterByScheduleType)
          .filter(statusFilter)
          .map((schedule, index) => {
            const {
              id,
              scheduleName,
              route,
              startPoint,
              endPoint,
              time,
              scheduleType,
              isActive,
            } = schedule;
            const formatedTime = convertTo12HourFormat(time);
            return (
              <tr key={index}>
                <Td>{scheduleName}</Td>
                <Td>{route}</Td>
                <Td>{startPoint}</Td>
                <Td>{endPoint}</Td>
                <Td>{formatedTime}</Td>
                <Td>{scheduleType}</Td>
                <Td>
                  {isActive ? (
                    <div>
                      <div
                        className=" rounded-full shadow-inner cursor-pointer p-2 max-w-min mx-auto bg-slate-100"
                        onClick={() => handleStatusToggle(id, isActive)}
                      >
                        <GiCheckMark className="text-green-500" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className=" rounded-full shadow-inner cursor-pointer p-2 max-w-min mx-auto bg-slate-100"
                      onClick={() => scaheduleStatusToggle(id, isActive)}
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
                      href={`/dashboard/${adminId}/schedule?edit=${id}`}
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
                onClick={deleteSchedules}
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
