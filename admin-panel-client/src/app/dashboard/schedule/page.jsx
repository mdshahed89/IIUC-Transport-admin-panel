import { getBusSchedules } from "@/lib/fetchData";
import React from "react";
import Content from "./Content";

const BusInformation = async () => {
  const busSchedules = await getBusSchedules();
  const schedules = busSchedules?.schedules || [];
  return (
    <main className="p-8 flex-1 overflow-y-auto">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Bus Information
        </h2>
        <Content schedules={schedules} />
      </div>
    </main>
  );
};

export default BusInformation;
