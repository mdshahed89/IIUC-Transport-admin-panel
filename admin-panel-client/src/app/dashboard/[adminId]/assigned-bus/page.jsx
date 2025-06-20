"use client";
import { getAssignBus } from "@/lib/fetchData";
import Content from "./Content";
import AssignBusForm from "./form";
import Error from "@/components/ReloadButton";
import { useParams, useSearchParams } from "next/navigation";
import useFetchData from "@/app/hooks/useFetchData";
import { SubPageLoading } from "@/components/PageLoading";
import { useState } from "react";

const AssignedBuses = ({}) => {
  const searchParams = useSearchParams();

  const edit = searchParams.get("edit");
  const add = searchParams.get("add");
  const page = searchParams.get("page") || 1;
  const { adminId } = useParams();

  console.log(page);

  // fetch bus info
  const {
    data: assignBus,
    isLoading: assignBusLoading,
    fetcher: fetchAssignBus,
  } = useFetchData({
    endpoint: `/assign-bus`,
  });

  console.log(assignBus);

  return (
    <>
      {edit || add ? (
        <AssignBusForm
          edit={edit}
          adminId={adminId}
          fetchAssignBus={fetchAssignBus}
        />
      ) : (
        <div className=" flex-1 overflow-auto">
          <div className="container mx-auto ">
            <h2 className="text-3xl font-semibold text-center mb-6">
              Assigned Buses
            </h2>
            {assignBusLoading ? (
              <SubPageLoading />
            ) : (
              <>
                <Content
                  assignBus={assignBus}
                  adminId={adminId}
                  fetchAssignBus={fetchAssignBus}
                />
                {assignBus?.totalPages > 1 && (
                  <Pagination
                    currentPage={Number(page)}
                    totalPages={assignBus?.totalPages}
                  />
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AssignedBuses;
