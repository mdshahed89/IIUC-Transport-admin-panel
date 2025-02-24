import { getBusSchedules } from "@/lib/fetchData";
import React from "react";
import Content from "./Content";
import ScheduleForm from "./form";

const BusInformation = async ({ searchParams }) => {
  const { edit, add } = await searchParams;

  let schedules;
  if (!edit && !add) {
    const busSchedules = await getBusSchedules();
    schedules = busSchedules?.schedules || [];
  }

  return (
    <>
      {edit || add ? (
        <ScheduleForm edit={edit} />
      ) : (
        <div className="p-4 md:p-8">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Bus Information
          </h2>
          <Content schedules={schedules} />
        </div>
      )}
    </>
  );
};

export default BusInformation;
