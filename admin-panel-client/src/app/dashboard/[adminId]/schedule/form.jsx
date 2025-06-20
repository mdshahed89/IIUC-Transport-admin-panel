"use client";
import useFetchData from "@/app/hooks/useFetchData";
import Button from "@/components/Button";
import { FormSelectField } from "@/components/FormField";
import { create, editData, getBusScheduleById } from "@/lib/fetchData";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import Loading from "../loading";
import { SubPageLoading } from "@/components/PageLoading";
import { toast } from "react-toastify";

// Schedule Type option
const schedulesOption = [
  "Regular Schedule",
  "Friday Schedule",
  "Residential Schedule",
  "Library Schedule",
  "Exam Schedule",
  "Admission Schedule",
  "Special Schedule",
];

const ScheduleForm = ({ edit, adminId, fetchSchedule }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: editableSchedule, isLoading: editableScheduleLoading } =
    useFetchData({
      endpoint: `/bus-schedules/${Number(edit)}`,
      isFetch: edit,
    });

  // Destucture editable schedule
  const { scheduleName, route, startPoint, endPoint, time, scheduleType } =
    editableSchedule || {};

  // handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    if (!edit) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.salmanshahriar.wiki/api/admin/bus-schedules/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        console.log(data);
        if (response.ok) {
          toast.success("Added successfully!");
          router.push(`/dashboard/${adminId}/schedule`);
          await fetchSchedule();
        } else {
          toast.error(data.message || "Failed to add!");
        }
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
        console.error("Error submitting:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.salmanshahriar.wiki/api/admin/bus-schedules/${Number(
            edit
          )}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        console.log(response);

        const data = await response.json();

        if (response.ok) {
          toast.success("Updated successfully!");
          router.push(`/dashboard/${adminId}/schedule`);
          await fetchSchedule();
        } else {
          toast.error(data.message || "Failed to update!");
        }
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
        console.error("Error submitting :", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isDataLoading = editableScheduleLoading;
  return (
    <div className="max-w-xl mx-auto my-8 p-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-gray-800 font-bold mb-4">
          {edit ? "Edit" : "Add New"} Schedule
        </h2>
        <Link
          href={`/dashboard/${adminId}/schedule`}
          className="p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] "
        >
          <IoArrowBackSharp />
        </Link>
      </div>
      {isDataLoading ? (
        <SubPageLoading />
      ) : (
        <form onSubmit={onSubmit}>
          <InputField
            label="Slot Name"
            name="scheduleName"
            defaultValue={scheduleName}
            required
          />
          <InputField
            label="Route"
            name="route"
            defaultValue={route}
            required
          />
          <InputField
            label="Start Point"
            defaultValue={startPoint}
            name="startPoint"
            required
          />
          <InputField
            label="End Point"
            defaultValue={endPoint}
            name="endPoint"
            required
          />
          <InputField
            label="Time"
            type="time"
            defaultValue={time}
            name="time"
            required
          />
          <FormSelectField
            label="Schedule Type"
            className="mb-4"
            name="scheduleType"
            defaultValue={scheduleType}
            selectOption={schedulesOption}
          />

          <Button
            classes="bg-green-500 w-full active:scale-90 rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
            type="submit"
          >
            {edit ? "Edit" : "Add"} Schedule
          </Button>
        </form>
      )}
    </div>
  );
};

const InputField = ({
  label,
  type = "text",
  required = false,
  name = "",
  defaultValue,
}) => (
  <div className="mb-4">
    <label
      className="block 
         text-gray-600
       font-medium mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      required={required}
      name={name}
      defaultValue={defaultValue}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
    />
  </div>
);

export default ScheduleForm;
