"use client";
import Button from "@/components/Button";
import { InputField, SelectField } from "@/components/FormField";
import { Table, Td } from "@/components/Table";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import {
  deleteDataAndRevalidatePath,
  scaheduleStatusToggle,
} from "@/lib/fetchData";

import Link from "next/link";
import React, { useState } from "react";

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

const Content = ({ schedules }) => {
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

        {/* Filter Schedule type */}
        {/* <SelectField
          options={scheduleOptions}
          value={scheduleType}
          onChange={handleSchedule}
        /> */}

        {/* Status filter */}
        <Button bg="red" onClick={handleStatus}>
          Active/Inactive Schedule
        </Button>

        {/* Clear filter */}
        <Button onClick={clearFilter}>Clear Filter</Button>

        <Link href="/dashboard/schedule?add=true">
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Add New Schedule
          </button>
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
            return (
              <tr key={index}>
                <Td>{scheduleName}</Td>
                <Td>{route}</Td>
                <Td>{startPoint}</Td>
                <Td>{endPoint}</Td>
                <Td>{time}</Td>
                <Td>{scheduleType}</Td>
                <Td>
                  {isActive ? (
                    <Button
                      classes="bg-transparent border"
                      onClick={() => scaheduleStatusToggle(id, isActive)}
                    >
                      <MdCheckCircle className="text-green-500" />
                    </Button>
                  ) : (
                    <Button
                      classes="bg-transparent border "
                      onClick={() => scaheduleStatusToggle(id, isActive)}
                    >
                      <MdCheckCircleOutline className="text-gray-600" />
                    </Button>
                  )}
                </Td>
                <Td>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/schedule?edit=${id}`}>
                      <Button classes="bg-transparent border px-2">
                        <CiEdit size={24} className="text-blue-400" />
                      </Button>
                    </Link>

                    <Button
                      classes="bg-transparent border px-2"
                      onClick={() => deleteBusSchedules(id)}
                    >
                      <MdDeleteOutline size={24} className="text-red-500" />
                    </Button>
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
