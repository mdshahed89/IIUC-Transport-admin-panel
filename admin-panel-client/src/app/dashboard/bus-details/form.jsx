import Button from "@/components/Button";
import { create, editData, getBusInfoById } from "@/lib/fetchData";
import { redirect } from "next/navigation";

const BusInfoForm = async ({ edit }) => {
  const editId = Number(edit);
  let editAbleBus;

  if (edit) {
    // Get editable data
    editAbleBus = await getBusInfoById(Number(editId));
  }

  // Destucture editable data
  const {
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
    const data = { ...fromEntries, busNo: Number(fromEntries.busNo) };

    if (edit) {
      const edited = await editData({ endpoint: `/bus-info${editId}`, data });
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
      <h2 className="text-2xl font-bold mb-4">
        {edit ? "Edit Assign Bus" : "Assign New"} Bus
      </h2>
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
        <InputField
          label="Driver Name"
          defaultValue={driverName}
          name="driverName"
          required
        />
        <InputField
          label="Driver Phone"
          defaultValue={driverPhone}
          name="driverPhone"
          required
        />
        <InputField
          label="helper Name"
          defaultValue={helperName}
          name="helperName"
          required
        />
        <InputField
          label="Helper Phone"
          defaultValue={helperPhone}
          name="helperPhone"
          required
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
      className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 focus:ring-green-500"
    />
  </div>
);

export default BusInfoForm;
