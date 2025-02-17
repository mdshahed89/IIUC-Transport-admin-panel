import Button from "@/components/Button";
import { FormSelectField } from "@/components/FormField";
import {
  create,
  getAssignBusById,
  getBusInfo,
  getBusSchedules,
} from "@/lib/fetchData";
import { redirect } from "next/navigation";
import React from "react";

const AssignBusForm = async ({ edit }) => {
  const editId = Number(edit);

  let editableAssignBus;

  if (editId) {
    // fetch editable assign bus
    editableAssignBus = (await getAssignBusById(id)) || {};
  }
  // fetch bus info
  const busInfo = await getBusInfo();
  const busNo = busInfo?.buses.map((bus) => bus.busNo);

  // Bus Schedule
  const busSchedules = await getBusSchedules();
  const busSchedulesName = busSchedules?.schedules.map(
    (schedules) => schedules.scheduleName
  );

  // Destructure editable assign bus
  const {
    busNo: editableBusNo,
    scheduleName,
    busType,
    Gender,
  } = editableAssignBus || {};

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
    <div className="max-w-xl mx-auto my-8 p-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl">
      <h2 className="text-2xl font-bold mb-4">Assign New Bus</h2>
      <form action={onSubmit} className="space-y-4">
        <FormSelectField
          label="Bus No"
          name="busNo"
          required
          defaultValue={editableBusNo}
          selectOption={busNo}
        />
        <FormSelectField
          label="Schedule Name"
          name="scheduleName"
          required
          defaultValue={scheduleName}
          selectOption={busSchedulesName}
        />

        <FormSelectField
          label="Bus Type"
          name="busType"
          defaultValue={busType}
          selectOption={["Students", "Teachers", "Staff"]}
        />
        <FormSelectField
          label="Gender"
          defaultValue={Gender}
          selectOption={["Both", "Male", "Female"]}
        />

        <Button type="submit">Assign Bus</Button>
      </form>
    </div>
  );
};

export default AssignBusForm;
