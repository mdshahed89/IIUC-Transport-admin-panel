import { getBusInfoById } from "@/lib/fetchData";

const EditBusPage = async ({ params }) => {
  const { id } = (await params) || {};

  // Get editable data
  const editAbleBus = await getBusInfoById(id);

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

  // handle submit
  const onSubmit = async (formData) => {
    "use server";

    console.log(formData);
  };

  return (
    <main className="p-8 flex-1 overflow-y-auto">
      <div className="container mx-auto p-6 border">
        <h2 className="text-2xl font-bold mb-4">Assign New Bus</h2>
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
            required
          />

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

export default EditBusPage;
