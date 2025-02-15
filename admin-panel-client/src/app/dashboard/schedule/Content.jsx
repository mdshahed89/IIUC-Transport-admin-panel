"use client";
import Button from "@/components/Button";
import { InputField, SelectField } from "@/components/FormField";
import { Table, Td } from "@/components/Table";
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
  { value: "All", label: "All Types" },
  { value: "Regular Schedule", label: "Regular Schedule" },
  { value: "Friday Schedule", label: "Friday Schedule" },
  { value: "Exam Schedule", label: "Exam Schedule" },
  { value: "Library Schedule", label: "Library Schedule" },
  { value: "Residential Schedule", label: "Residential Schedule" },
  { value: "Special Schedule", label: "Special Schedule" },
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

  const handleSchedule = (e) => {
    setscheduleType(e.target.value);
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

        {/* Filter Schedule type */}
        <SelectField
          options={scheduleOptions}
          value={scheduleType}
          onChange={handleSchedule}
        />

        {/* Status filter */}
        <Button bg="red" onClick={handleStatus}>
          Active/Inactive Schedule
        </Button>

        {/* Clear filter */}
        <Button onClick={clearFilter}>Clear Filter</Button>

        <Link href="/dashboard/add-schedule">
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
                    <Button onClick={() => scaheduleStatusToggle(id, isActive)}>
                      Active
                    </Button>
                  ) : (
                    <Button
                      bg="red"
                      onClick={() => scaheduleStatusToggle(id, isActive)}
                    >
                      Inactive
                    </Button>
                  )}
                </Td>
                <Td>
                  <Link href={`/dashboard/edit-schedule/${id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button bg="red" onClick={() => deleteBusSchedules(id)}>
                    Delete
                  </Button>
                </Td>
              </tr>
            );
          })}
      </Table>
    </>
  );
};

export default Content;
