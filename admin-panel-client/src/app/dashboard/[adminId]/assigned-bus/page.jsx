import { getAssignBus } from "@/lib/fetchData";
import Content from "./Content";
import AssignBusForm from "./form";
import Error from "@/components/ReloadButton";

const AssignedBuses = async ({ searchParams, params }) => {
  const { edit, add, page = 1 } = await searchParams;
  const {adminId} = await params
  let assignBus;
  if (!edit || !add) {
    assignBus = (await getAssignBus({ page })) || [];
  }

  return (
    <>
      {edit || add ? (
        <AssignBusForm edit={edit} adminId={adminId} />
      ) : (
        <div className=" flex-1 overflow-auto">
          <div className="container mx-auto ">
            <h2 className="text-3xl font-semibold text-center mb-6">
              Assigned Buses
            </h2>
            <Content assignBus={assignBus} adminId={adminId} />
            {assignBus?.totalPages > 1 && (
              <Pagination
                currentPage={Number(page)}
                totalPages={assignBus?.totalPages}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AssignedBuses;
