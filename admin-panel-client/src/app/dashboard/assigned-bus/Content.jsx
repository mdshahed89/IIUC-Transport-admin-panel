"use client";
import Button from "@/components/Button";
import { InputField, SelectField } from "@/components/FormField";
import { Table, Td } from "@/components/Table";
import { deleteDataAndRevalidatePath } from "@/lib/fetchData";

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

const Content = ({ busData = [] }) => {
  const [busNumber, setBusNumber] = useState();
  const [busType, setBusType] = useState("All");

  // Handler
  const handleBusNumebr = (e) => {
    setBusNumber(e.target.value);
  };
  const handleBusType = (e) => {
    setBusType(e.target.value);
  };

  // Filter
  const filterByBusNumber = (bus) =>
    busNumber ? bus?.busNo.toString().includes(busNumber.toString()) : true;
  const filterByBusType = (bus) =>
    busType === "All" ? true : bus?.busType === busType;

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
        <SelectField
          options={[
            { value: "All", label: "All Types" },
            { value: "Students", label: "Students" },
            { value: "Teachers", label: "Teachers" },
            { value: "Staff", label: "Staff" },
          ]}
          value={busType}
          onChange={handleBusType}
        />
        <Link
          href="/dashboard/assign-bus"
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
                  {/* Actions (Edit/Delete buttons, etc.) */}
                  <Link href={`/dashboard/edit-assign-bus/${id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button bg="red" onClick={() => deleteAssignbus(id)}>
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
