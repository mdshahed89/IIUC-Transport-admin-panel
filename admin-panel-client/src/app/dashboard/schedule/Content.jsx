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

const Content = ({ schedules, scheduleTypes }) => {
  const [filter, setFilter] = useState("");
  const [scheduleType, setscheduleType] = useState("All");
  const [status, setStatus] = useState();

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

  // handle delete bus schedule
  const deleteBusSchedules = (id) => {
    deleteDataAndRevalidatePath({
      endpoint: `/bus-schedules/${id}`,
      revalidtionPath: "/dashboard/schedule",
    });
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
          href="/dashboard/schedule?add=true"
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
                        onClick={() => scaheduleStatusToggle(id, isActive)}
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
                      onClick={() => deleteBusSchedules(id)}
                      className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
                    >
                      <MdOutlineDeleteOutline />
                    </div>

                    <Link
                      href={`/dashboard/schedule?edit=${id}`}
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
    </>
  );
};

export default Content;
