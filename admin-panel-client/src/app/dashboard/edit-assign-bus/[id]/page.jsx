import Button from "@/components/Button";
import { editData, getAssignBusById, getData } from "@/lib/fetchData";
import { redirect } from "next/navigation";
import React from "react";

const EditAssignBusPage = async ({ params }) => {
  const { id } = await params;
  // fetch editable assign bus
  const editableAssignBus = (await getAssignBusById(id)) || {};
  // Destructure editable assign bus
  const {
    busNo: editableBusNo,
    scheduleName,
    busType,
    Gender,
  } = editableAssignBus;

  // fetch bus info
  const busInfo = await getData({ endpoint: "/bus-info" });
  const busNoOnption = busInfo?.buses.map((bus) => bus.busNo);

  // fetch bus info
  const busSchedules = await getData({ endpoint: "/bus-schedules" });
  const busSchedulesNameOption = busSchedules?.schedules.map(
    (schedules) => schedules.scheduleName
  );

  // Handle submit
  const onSubmit = async (formData) => {
    "use server";
    const fromEntries = Object.fromEntries(formData.entries());
    const data = { ...fromEntries, busNo: Number(fromEntries.busNo) };

    const edited = await editData({ endpoint: `/assign-bus/${id}`, data });

    if (!edited?.error) {
      redirect("/dashboard/assigned-bus");
    }
  };
  return (
    <main className="p-8 flex-1 overflow-y-auto">
      <div className="container mx-auto p-6 border">
        <h2 className="text-2xl font-bold mb-4">Assign New Bus</h2>
        <form action={onSubmit}>
          <SelectField
            label="Bus No"
            name="busNo"
            defaultValue={editableBusNo}
            required
            options={busNoOnption}
          />
          <SelectField
            label="Schedule Name"
            name="scheduleName"
            defaultValue={scheduleName}
            required
            options={busSchedulesNameOption}
          />

          <SelectField
            label="Bus Type"
            name="busType"
            defaultValue={busType}
            required
            options={["Students", "Teachers", "Staff"]}
          />
          <SelectField
            defaultValue={Gender}
            required
            label="Gender"
            options={["Both", "Male", "Female"]}
          />

          <Button type="submit">Assign Bus</Button>
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

const SelectField = ({ label, options, name, required, defaultValue }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <select
      className="w-full border px-4 py-2 rounded"
      name={name}
      required={required}
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

export default EditAssignBusPage;
