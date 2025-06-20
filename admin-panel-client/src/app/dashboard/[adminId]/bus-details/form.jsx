"use client";
import Button from "@/components/Button";

import NameAndPhoneSelect from "./NameAndPhoneSelect";
import { IoArrowBackSharp } from "react-icons/io5";
import Link from "next/link";
import { toast } from "react-toastify";
import useFetchData from "@/app/hooks/useFetchData";
import { SubPageLoading } from "@/components/PageLoading";
import { useState } from "react";
import { useRouter } from "next/navigation";

const BusInfoForm = ({ edit, adminId, fetchBusInfo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const editId = Number(edit);

  const router = useRouter();

  const { data: driverInfo, isLoading: driverInfoLoading } = useFetchData({
    endpoint: `/driver-info`,
  });
  const { data: helperInfo, isLoading: helperInfoLoading } = useFetchData({
    endpoint: `/helper-info`,
  });

  const { data: editAbleBus, isLoading: editableBusLoading } =
    useFetchData({ endpoint: `/bus-info/${editId}`, isFetch: editId }) || {};

  console.log("editable");
  console.log(editAbleBus);
  // let editAbleBus;
  // if (edit) {
  //   // Get editable data
  //   editAbleBus = await getBusInfoById(editId);
  // }

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
  const onSubmit = async (e) => {
    e.preventDefault();
    const fromEntries = Object.fromEntries(new FormData(e.target));
    const dataToSubmit = {
      ...fromEntries,
      busNo: Number(fromEntries.busNo),
      capacity: Number(fromEntries.capacity),
    };

    console.log(dataToSubmit);

    if (!edit) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.salmanshahriar.wiki/api/admin/bus-info`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSubmit),
          }
        );

        const data = await response.json();

        console.log(data);
        if (response.ok) {
          toast.success("Added successfully!");
          router.push(`/dashboard/${adminId}/bus-details`);
          await fetchBusInfo();
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
          `https://api.salmanshahriar.wiki/api/admin/bus-info/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSubmit),
          }
        );

        const data = await response.json();

        if (response.ok) {
          toast.success("Updated successfully!");
          router.push(`/dashboard/${adminId}/bus-details`);
          await fetchBusInfo();
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

  const isDataLoading =
    driverInfoLoading || helperInfoLoading || editableBusLoading;

  return (
    <div className="max-w-3xl mx-auto my-8 p-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">
          {edit ? "Edit" : "Add"} Bus Info
        </h2>
        <Link
          href={`/dashboard/${adminId}/bus-details`}
          className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] "
        >
          <IoArrowBackSharp />
        </Link>
      </div>
      {isDataLoading ? (
        <SubPageLoading />
      ) : (
        <form onSubmit={onSubmit}>
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
            {edit ? "Edit Assign" : "Add"} Bus
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
