"use client";
import Button from "@/components/Button";
import { InputField } from "@/components/FormField";
import { Table, Td } from "@/components/Table";
import { deleteDataAndRevalidatePath } from "@/lib/fetchData";
import Link from "next/link";
import React, { useState } from "react";

const tableHeaders = [
  "Bus Number",
  "Vehicle ID",
  "Capacity",
  "Driver Name",
  "Driver Phone",
  "Helper Name",
  "Helper Phone",
  "Actions",
];

const Content = ({ buses }) => {
  const [filter, setFilter] = useState("");

  // Filter value
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  // Filter bus by bus n, driver name and number, helper name and number
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
      <div className="flex justify-center mb-6">
        <InputField
          placeholder="Search by Bus Number, Driver, or Helper..."
          value={filter}
          onChange={handleFilter}
        />
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
                <Link href={`/dashboard/edit-bus/${id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button bg="red" onClick={() => deleteBusDetails(id)}>
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
