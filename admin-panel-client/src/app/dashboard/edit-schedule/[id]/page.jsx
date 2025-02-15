import { editData, getBusScheduleById, getData } from "@/lib/fetchData";
import { redirect } from "next/navigation";
import React from "react";

// Schedule type option
const schedulesTypeOption = [
  "Regular Schedule",
  "Friday Schedule",
  "Residential Schedule",
  "Library Schedule",
  "Exam Schedule",
  "Admission Schedule",
  "Special Schedule",
];

const EditSchedulePage = async ({ params }) => {
  const { id } = await params;

  // Get editable Schedule
  const editableSchedule = await getBusScheduleById(id);
  // Destucture
  const { scheduleName, route, startPoint, endPoint, time, scheduleType } =
    editableSchedule || {};

  // handle submit
  const onSubmit = async (formData) => {
    "use server";

    const data = Object.fromEntries(formData.entries());

    const edited = await editData({ endpoint: `/bus-schedules/${id}`, data });
    if (!edited?.error) {
      redirect("/dashboard/schedule");
    }
  };
  return (
    <main className="p-8 flex-1 overflow-y-auto">
      <div className="container mx-auto p-6 border">
        <h2 className="text-2xl font-bold mb-4">Add New Schedule</h2>
        <form action={onSubmit}>
          <InputField
            label="Schedule Name"
            defaultValue={scheduleName}
            name="scheduleName"
            required
          />
          <InputField
            label="Route"
            defaultValue={route}
            name="route"
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
          <SelectField
            label="Schedule Type"
            name="scheduleType"
            options={schedulesTypeOption}
            defaultValue={scheduleType}
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Assign Bus
          </button>
        </form>
      </div>
    </main>
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
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <input
      type={type}
      required={required}
      name={name}
      defaultValue={defaultValue}
      className="w-full border px-4 py-2 rounded"
    />
  </div>
);

const SelectField = ({ label, options, name, defaultValue }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <select
      className="w-full border px-4 py-2 rounded"
      name={name}
      defaultValue={defaultValue}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default EditSchedulePage;
