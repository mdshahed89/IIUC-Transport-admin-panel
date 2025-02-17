import { getBusSchedules } from "@/lib/fetchData";
import React from "react";
import Content from "./Content";
import ScheduleForm from "./form";

const BusInformation = async ({ searchParams }) => {
  const { edit, add } = await searchParams;

  const busSchedules = await getBusSchedules();
  const schedules = busSchedules?.schedules || [];
  return (
    <>
      {edit || add ? (
        <ScheduleForm edit={edit} />
      ) : (
        <div className="p-8 flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">
              Bus Information
            </h2>
            <Content schedules={schedules} />
          </div>
        </div>
      )}
    </>
  );
};

export default BusInformation;
