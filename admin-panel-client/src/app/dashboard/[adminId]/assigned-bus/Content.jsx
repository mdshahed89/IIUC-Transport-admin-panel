"use client";
import { InputField, SelectField } from "@/components/FormField";
import { Table, Td } from "@/components/Table";
import { assignBusStatusToggle, deleteDataAndRevalidatePath } from "@/lib/fetchData";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";

import Link from "next/link";
import React, { useState } from "react";
import { convertTo12HourFormat } from "@/utils/timeFormat";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Pagination from "@/components/Pageination";
import { GiCheckMark } from "react-icons/gi";

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

const Content = ({ assignBus = [], adminId }) => {
  const [busNumber, setBusNumber] = useState("");
  const [busType, setBusType] = useState("All Types");

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
  const deleteAssignbus = (id) => {
    deleteDataAndRevalidatePath({
      endpoint: `/assign-bus/${id}`,
      revalidtionPath: `/dashboard/${adminId}/assigned-bus`,
    });
  };

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
                        onClick={() => assignBusStatusToggle(id, isActive)}
                      >
                        <GiCheckMark className="text-green-500" />
                      </div>
                    </div>
                  ) : (
                    <div
                      className=" rounded-full shadow-inner cursor-pointer p-2 max-w-min mx-auto bg-slate-100"
                      // onClick={() => scaheduleStatusToggle(id, isActive)}
                    >
                      <GiCheckMark className="text-gray-600" />
                    </div>
                  )}
                </Td>

                <Td>
                  <div className="h-full flex items-center justify-center gap-2 text-[1.4rem]  ">
                    <div
                      onClick={() => deleteAssignbus(id)}
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
    </>
  );
};

export default Content;
