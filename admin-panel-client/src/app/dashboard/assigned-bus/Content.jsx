"use client";
import Button from "@/components/Button";
import { InputField, SelectField } from "@/components/FormField";
import { Table, Td } from "@/components/Table";
import { deleteDataAndRevalidatePath } from "@/lib/fetchData";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import Link from "next/link";
import React, { useState } from "react";

const tableHeaders = [
  "Bus Number",
  "Slot Name",
  "Road",
  "Bus Type",
  "Gender",
  "Actions",
];

const userOption = ["All Types", "Students", "Teachers", "Staff"];

const Content = ({ busData = [] }) => {
  const [busNumber, setBusNumber] = useState();
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
    busNumber ? bus?.busNo.toString().includes(busNumber.toString()) : true;
  const filterByBusType = (bus) =>
    busType === "All Types" ? true : bus?.busType === busType;

  // Handle delete assign bus
  const deleteAssignbus = (id) => {
    deleteDataAndRevalidatePath({
      endpoint: `/assign-bus/${id}`,
      revalidtionPath: "/dashboard/assigned-bus",
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <InputField
          placeholder="Search by Bus Number"
          type="number"
          value={busNumber}
          onChange={handleBusNumebr}
        />
        <SelectField selectOption={userOption} getValue={handleBusType} />
        <Link
          href="/dashboard/assigned-bus?add=true"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Assign New Bus
        </Link>
      </div>
      <Table tableHeaders={tableHeaders}>
        {busData?.buses
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
            } = bus || {};
            const { route, helperName, driverName, status } =
              scheduleDetails || {};
            return (
              <tr key={id}>
                <Td>{busNo}</Td>
                <Td>{scheduleName}</Td>
                <Td>{route || "N/A"}</Td>
                <Td>{busType}</Td>
                <Td>{Gender || "N/A"}</Td>

                <Td>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/assigned-bus?edit=${id}`}>
                      <Button classes="bg-transparent border px-2">
                        <CiEdit size={24} className="text-blue-400" />
                      </Button>
                    </Link>
                    <Button
                      classes="bg-transparent border px-2"
                      onClick={() => deleteAssignbus(id)}
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
