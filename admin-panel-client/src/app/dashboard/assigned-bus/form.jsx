import Button from "@/components/Button";
import { FormSelectField, FormSelectFieldSearch } from "@/components/FormField";
import {
  create,
  editData,
  getAssignBusById,
  getBusInfo,
  getBusSchedules,
} from "@/lib/fetchData";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";

const AssignBusForm = async ({ edit }) => {
  // editable assign bus id
  const editId = Number(edit);

  // editable assign bus data
  let editableAssignBus;
  if (editId) {
    // fetch editable assign bus
    editableAssignBus = (await getAssignBusById(editId)) || {};
  }

  // fetch bus info
  const busInfo = await getBusInfo();
  const busNo = busInfo?.buses.map((bus) => bus.busNo) || [];

  // Bus Schedule
  const busSchedules = await getBusSchedules();
  const busSchedulesName =
    busSchedules?.schedules.map((schedules) => schedules.scheduleName) || [];

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

    // if editable, then edit data otherwise add data
    if (edit) {
      const edited = await editData({
        endpoint: `/assign-bus/${editId}`,
        data,
      });

      if (!edited?.error) {
        redirect("/dashboard/assigned-bus");
      }
    } else {
      const created = await create({ endpoint: "/assign-bus", data });

      if (!created?.error) {
        redirect("/dashboard/assigned-bus");
      }
    }
  };
  return (
    <div className="max-w-xl mx-auto my-8 p-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">
          {edit ? "Edit Assign " : "Assign New "}Bus
        </h2>
        <Link
          href={`/dashboard/assigned-bus`}
          className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] "
        >
          <IoArrowBackSharp />
        </Link>
      </div>
      <form action={onSubmit} className="space-y-4">
        <FormSelectFieldSearch
          label="Bus No"
          name="busNo"
          placeholder="Search Bus No"
          required
          defaultValue={editableBusNo}
          selectOption={busNo}
        />
        <FormSelectFieldSearch
          label="Schedule Name"
          name="scheduleName"
          placeholder="Search Schedule Name"
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
          name="Gender"
          defaultValue={Gender}
          selectOption={["Both", "Male", "Female"]}
        />

        <Button
          type="submit"
          classes="bg-green-500 w-full active:scale-90 rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
        >
          {edit ? "Edit Assign " : " Assign "}Bus
        </Button>
      </form>
    </div>
  );
};

export default AssignBusForm;
