import { create } from "@/lib/fetchData";
import { redirect } from "next/navigation";

const AddBusPage = () => {
  //handle submit
  const onSubmit = async (formData) => {
    "use server";
    const fromEntries = Object.fromEntries(formData.entries());
    const data = { ...fromEntries, busNo: Number(fromEntries.busNo) };

    const created = await create({ endpoint: "/bus-info", data });
    if (!created?.error) {
      redirect("/dashboard/bus-details");
    }
  };

  return (
    <main className="p-8 flex-1 overflow-y-auto">
      <div className="container mx-auto p-6 border">
        <h2 className="text-2xl font-bold mb-4">Assign New Bus</h2>
        <form action={onSubmit}>
          <InputField label="Bus Number" type="number" name="busNo" required />
          <InputField label="Vehicle Id" name="vehicleId" required />
          <InputField label="Driver Name" name="driverName" required />
          <InputField label="Driver Phone" name="driverPhone" required />
          <InputField label="helper Name" name="helperName" required />
          <InputField label="Helper Phone" name="helperPhone" required />
          <InputField label="Capacity" name="capacity" type="number" required />

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
      defaultValue={defaultValue}
      required={required}
      name={name}
      className="w-full border px-4 py-2 rounded"
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

export default AddBusPage;
