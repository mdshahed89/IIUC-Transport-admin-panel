import Button from "@/components/Button";

import {
  create,
  editData,
  getBusInfoById,
  getDriverInfo,
  getHelperInfo,
} from "@/lib/fetchData";
import { redirect } from "next/navigation";
import NameAndPhoneSelect from "./NameAndPhoneSelect";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";

const BusInfoForm = async ({ edit }) => {
  const editId = Number(edit);

  const driverInfo = await getDriverInfo();
  const helperInfo = await getHelperInfo();

  let editAbleBus;
  if (edit) {
    // Get editable data
    editAbleBus = await getBusInfoById(editId);
  }

  // Destucture editable data
  const {
    id,
    busNo,
    vehicleId,
    driverName,
    driverPhone,
    helperName,
    helperPhone,
    capacity,
  } = editAbleBus || {};

  //handle submit
  const onSubmit = async (formData) => {
    "use server";
    const fromEntries = Object.fromEntries(formData.entries());
    const data = {
      ...fromEntries,
      busNo: Number(fromEntries.busNo),
      capacity: Number(fromEntries.capacity),
    };

    if (edit) {
      const edited = await editData({ endpoint: `/bus-info/${editId}`, data });
      if (!edited?.error) {
        redirect("/dashboard/bus-details");
      }
    } else {
      const created = await create({ endpoint: "/bus-info", data });
      if (!created?.error) {
        redirect("/dashboard/bus-details");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">
          {edit ? "Edit" : "Add"} Bus Info
        </h2>
        <Link
          href={`/dashboard/bus-details`}
          className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] "
        >
          <IoArrowBackSharp />
        </Link>
      </div>
      <form action={onSubmit}>
        <InputField
          label="Bus Number"
          defaultValue={busNo}
          type="number"
          name="busNo"
          required
        />
        <InputField
          label="Vehicle Id"
          defaultValue={vehicleId}
          name="vehicleId"
          required
        />

        <NameAndPhoneSelect
          name="driver"
          label="Driver"
          data={driverInfo}
          defaultName={driverName}
          defaultPhone={driverPhone}
        />
        <NameAndPhoneSelect
          name="helper"
          label="Helper"
          data={helperInfo}
          defaultName={helperName}
          defaultPhone={helperPhone}
        />

        <InputField
          label="Capacity"
          defaultValue={capacity}
          name="capacity"
          type="number"
          required
        />

        <Button
          classes="bg-green-500 w-full active:scale-90 rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
          type="submit"
        >
          {edit ? "Edit Assign" : "Assign"} Bus
        </Button>
      </form>
    </div>
  );
};

const InputField = ({
  label,
  type = "text",
  required = false,
  name = "",
  defaultValue,
  readOnly = false,
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
      readOnly={readOnly}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
    />
  </div>
);

export default BusInfoForm;
