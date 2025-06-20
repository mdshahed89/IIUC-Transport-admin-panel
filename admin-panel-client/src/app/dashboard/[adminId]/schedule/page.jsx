"use client";
import React from "react";
import Content from "./Content";
import ScheduleForm from "./form";
import Pagination from "@/components/Pageination";
import { useParams, useSearchParams } from "next/navigation";
import useFetchData from "@/app/hooks/useFetchData";
import { SubPageLoading } from "@/components/PageLoading";

const BusInformation = () => {
  const searchParams = useSearchParams();

  const edit = searchParams.get("edit");
  const add = searchParams.get("add");
  const page = searchParams.get("page") || 1;
  const { adminId } = useParams();

  const {
    data: schedules,
    isLoading: scheduleLoading,
    fetcher: fetchSchedule,
  } = useFetchData({
    endpoint: `/bus-schedules?page=${page}`,
  });
  const {
    data: scheduleTypes,
    isLoading: scheduleTypesLoading,
    fetcher: fetchScheduleTypes,
  } = useFetchData({
    endpoint: `/dashboard/schedule-types`,
  });

  return (
    <>
      {scheduleLoading ? (
        <SubPageLoading />
      ) : edit || add ? (
        <ScheduleForm
          edit={edit}
          adminId={adminId}
          fetchSchedule={fetchSchedule}
        />
      ) : (
        <div className="p-4 md:p-8">
          <h2 className="text-3xl font-semibold text-center mb-6">Schedule</h2>
          <Content
            fetchSchedule={fetchSchedule}
            schedules={schedules?.schedules}
            scheduleTypes={scheduleTypes}
            adminId={adminId}
          />

          {schedules?.totalPages > 1 && (
            <Pagination
              currentPage={Number(page)}
              totalPages={schedules?.totalPages}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BusInformation;
