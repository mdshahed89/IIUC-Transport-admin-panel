"use client";
import { FormSelectFieldSearch } from "@/components/FormField";
import { useEffect, useState } from "react";

export default function NameAndPhoneSelect({
  data,
  label = "",
  name = "",
  defaultName,
  defaultPhone,
}) {
  const [selectName, setSelectName] = useState(defaultName || "");
  const [phoneNumber, setPhoneNumber] = useState(defaultPhone || "");

  console.log(label, "phone", phoneNumber, "defol", defaultPhone);
  // Get list of names from data
  const names = data?.map((driver) => driver?.driverName || driver?.name);

  // Update phone number whenever selectName changes
  useEffect(() => {
    const selectedDriver = data?.find(
      (driver) =>
        driver?.driverName === selectName || driver?.name === selectName
    );
    setPhoneNumber(selectedDriver?.phone || ""); // Update phone number dynamically
  }, [selectName, data]); // Dependency array ensures it updates when name or data changes

  const getSelectedData = (selectedValue) => {
    setSelectName(selectedValue);
  };

  return (
    <div className="mb-4">
      <FormSelectFieldSearch
        label={`${label} Name`}
        placeholder={`Select a ${label.toLowerCase()}`}
        defaultValue={defaultName}
        name={`${name}Name`}
        className="mb-4"
        selectOption={names}
        getData={getSelectedData}
      />

      <label className="block text-gray-600 font-medium mt-4 mb-2">
        {label} Phone
      </label>
      <input
        type="text"
        name={`${name}Phone`}
        value={phoneNumber || defaultPhone} // Updated phone number
        readOnly
        className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
      />
    </div>
  );
}
