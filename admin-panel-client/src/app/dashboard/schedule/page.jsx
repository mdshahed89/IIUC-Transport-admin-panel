import { fetchScheduleType, getBusSchedules } from "@/lib/fetchData";
import React from "react";
import Content from "./Content";
import ScheduleForm from "./form";
import Pagination from "@/components/Pageination";

const BusInformation = async ({ searchParams }) => {
  const { edit, add, page = 1 } = await searchParams;

  let schedules;
  let scheduleTypes;
  if (!edit && !add) {
    const busSchedules = await getBusSchedules();
    schedules = busSchedules || {};

    scheduleTypes = (await fetchScheduleType()) || [];
  }

  return (
    <>
      {edit || add ? (
        <ScheduleForm edit={edit} />
      ) : (
        <div className="p-4 md:p-8">
          <h2 className="text-3xl font-semibold text-center mb-6">Schedule</h2>
          <Content
            schedules={schedules?.schedules}
            scheduleTypes={scheduleTypes}
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
