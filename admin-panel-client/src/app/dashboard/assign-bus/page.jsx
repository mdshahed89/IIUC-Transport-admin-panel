import Button from "@/components/Button";
import { create, getBusInfo, getBusSchedules } from "@/lib/fetchData";
import { redirect } from "next/navigation";
import React from "react";

const AssignBusForm = async () => {
  // fetch bus info
  const busInfo = await getBusInfo();
  const busNo = busInfo?.buses.map((bus) => bus.busNo);

  // Bus Schedule
  const busSchedules = await getBusSchedules();
  const busSchedulesName = busSchedules?.schedules.map(
    (schedules) => schedules.scheduleName
  );

  // Handle submit
  const onSubmit = async (formData) => {
    "use server";
    const fromEntries = Object.fromEntries(formData.entries());
    const data = { ...fromEntries, busNo: Number(fromEntries.busNo) };

    const created = await create({ endpoint: "/assign-bus", data });

    if (!created?.error) {
      redirect("/dashboard/assigned-bus");
    }
  };
  return (
    <main className="p-8 flex-1 overflow-y-auto">
      <div className="container mx-auto p-6 border">
        <h2 className="text-2xl font-bold mb-4">Assign New Bus</h2>
        <form action={onSubmit}>
          <SelectField label="Bus No" name="busNo" required options={busNo} />
          <SelectField
            label="Schedule Name"
            name="scheduleName"
            required
            options={busSchedulesName}
          />

          <SelectField
            label="Bus Type"
            name="busType"
            options={["Students", "Teachers", "Staff"]}
          />
          <SelectField label="Gender" options={["Both", "Male", "Female"]} />

          <Button type="submit">Assign Bus</Button>
        </form>
      </div>
    </main>
  );
};

const InputField = ({ label, type = "text", required = false, name = "" }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <input
      type={type}
      required={required}
      name={name}
      className="w-full border px-4 py-2 rounded"
    />
  </div>
);

const SelectField = ({ label, options, name, required }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2" required={required}>
      {label}
    </label>
    <select className="w-full border px-4 py-2 rounded" name={name}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default AssignBusForm;
