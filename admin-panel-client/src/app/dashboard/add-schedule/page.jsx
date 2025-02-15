import Button from "@/components/Button";
import { create } from "@/lib/fetchData";
import { redirect } from "next/navigation";
import React from "react";

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

const AddSchedulePage = () => {
  // handle submit
  const onSubmit = async (formData) => {
    "use server";

    const data = Object.fromEntries(formData.entries());

    const created = await create({ endpoint: "/bus-schedules", data });
    if (!created?.error) {
      redirect("/dashboard/schedule");
    }
  };

  return (
    <main className="p-8 flex-1 overflow-y-auto">
      <div className="container mx-auto p-6 border">
        <h2 className="text-2xl font-bold mb-4">Add New Schedule</h2>
        <form action={onSubmit}>
          <InputField label="Schedule Name" name="scheduleName" required />
          <InputField label="Route" name="route" required />
          <InputField label="Start Point" name="startPoint" required />
          <InputField label="End Point" name="endPoint" required />
          <InputField label="Time" type="time" name="time" required />
          <SelectField
            label="Schedule Type"
            name="scheduleType"
            options={schedulesOption}
          />

          <Button type="submit">Add Schedule</Button>
        </form>
      </div>
    </main>
  );
};

const InputField = ({ label, type = "text", required = false, name = "" }) => (
  <div className="mb-4">
    <label
      className="block 
         text-gray-900
       font-medium mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      required={required}
      name={name}
      className={`w-full border px-4 py-2 rounded `}
    />
  </div>
);

const SelectField = ({ label, options, name }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <select className="w-full border px-4 py-2 rounded" name={name}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default AddSchedulePage;
