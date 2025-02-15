import { getAssignBus } from "@/lib/fetchData";
import Content from "./Content";

const AssignedBuses = async () => {
  const busData = await getAssignBus();

  return (
    <div className="p-8 flex-1 overflow-y-auto">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Assigned Buses
        </h2>
        <Content busData={busData} />
      </div>
    </div>
  );
};

export default AssignedBuses;
