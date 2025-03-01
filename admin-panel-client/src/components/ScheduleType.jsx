"use client";
import React from "react";
import { Table, Td } from "./Table";
import Button from "./Button";
import { toggleScheduleType } from "@/lib/fetchData";
import { usePathname } from "next/navigation";

const ScheduleType = ({ scheduleTypes }) => {
  const pathName = usePathname();

  const handleToggleSchedule = (scheduleType, isActive) => {
    toggleScheduleType({
      endpoint: scheduleType,
      data: { isActive: !isActive },
      pathName,
    });
  };

  return (
    <Table tableHeaders={["Schedule Type", "Status"]}>
      {scheduleTypes?.map((busSchedulesType, index) => {
        const { scheduleType, isActive } = busSchedulesType || {};
        console.log("client", busSchedulesType);

        return (
          <tr key={index}>
            <Td>{scheduleType}</Td>
            <Td>
              <Button
                classes={`${isActive ? "bg-green-500" : "bg-red-500"}`}
                onClick={() => handleToggleSchedule(scheduleType, isActive)}
              >
                {isActive ? "Active" : "Inactive"}
              </Button>
            </Td>
          </tr>
        );
      })}
    </Table>
  );
};

export default ScheduleType;
