"use client";
import { InputField } from "@/components/FormField";
import { Table, Td } from "@/components/Table";
import { deleteDataAndRevalidatePath } from "@/lib/fetchData";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";
import React, { useState } from "react";
import Button from "@/components/Button";
import { IoPersonAddSharp } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";

const tableHeaders = [
  "Bus Number",
  "Vehicle ID",
  "Capacity",
  "Driver Name",
  "Driver Phone",
  "Helper Name",
  "Helper Phone",
  "Status",
  "Actions",
];

const Content = ({ buses }) => {
  const [filter, setFilter] = useState("");

  // Filter value
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  // Filter bus by bus no, driver name and number, helper name and number
  const fillterBus = (bus) =>
    filter
      ? bus.busNo.toString().toLowerCase().includes(filter.toLowerCase()) ||
        bus.driverName.toLowerCase().includes(filter.toLowerCase()) ||
        bus.helperName.toLowerCase().includes(filter.toLowerCase()) ||
        bus.driverPhone.toLowerCase().includes(filter.toLowerCase()) ||
        bus.helperPhone.toLowerCase().includes(filter.toLowerCase())
      : true;

  const deleteBusDetails = (id) => {
    deleteDataAndRevalidatePath({
      endpoint: `/bus-info/${id}`,
      revalidtionPath: "/dashboard/bus-details",
    });
  };

  return (
    <>
      <div className="w-full flex-col sm:flex-row flex justify-between mb-6 gap-4">
        <InputField
          placeholder="Search by Bus Number, Driver, or Helper..."
          value={filter}
          onChange={handleFilter}
          classes="w-full sm:w-1/3"
        />
        <Link href="/dashboard/bus-details?add=true">
          <Button bg="green" classes="flex gap-2 items-center">
            <IoPersonAddSharp /> Add New Bus
          </Button>
        </Link>
      </div>

      <Table tableHeaders={tableHeaders}>
        {buses?.filter(fillterBus).map((bus, index) => {
          const {
            id,
            busNo,
            vehicleId,
            capacity,
            driverName,
            driverPhone,
            helperName,
            helperPhone,
            isActive,
          } = bus || {};

          return (
            <tr key={index}>
              <Td>{busNo}</Td>
              <Td>{vehicleId}</Td>
              <Td>{capacity}</Td>
              <Td>{driverName}</Td>
              <Td>{driverPhone}</Td>
              <Td>{helperName}</Td>
              <Td>{helperPhone}</Td>
              <Td>
                {isActive ? (
                  <div>
                    <div
                      className=" rounded-full shadow-inner cursor-pointer p-2 max-w-min mx-auto bg-slate-100"
                      // onClick={() => scaheduleStatusToggle(id, isActive)}
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
                  {/* <div
                    onClick={() => deleteBusDetails(id)}
                    className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
                  >
                    <MdOutlineDeleteOutline />
                  </div> */}

                  <Link
                    href={`/dashboard/bus-details?edit=${busNo}`}
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
