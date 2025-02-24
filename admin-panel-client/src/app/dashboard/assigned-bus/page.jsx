import { getAssignBus } from "@/lib/fetchData";
import Content from "./Content";
import AssignBusForm from "./form";

const AssignedBuses = async ({ searchParams }) => {
  const { edit, add } = await searchParams;

  let busData;
  if (!edit && !add) {
    busData = (await getAssignBus()) || [];
  }

  return (
    <>
      {edit || add ? (
        <AssignBusForm edit={edit} />
      ) : (
        <div className="p-8 flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">
              Assigned Buses
            </h2>
            <Content busData={busData} />
          </div>
        </div>
      )}
    </>
  );
};

export default AssignedBuses;
