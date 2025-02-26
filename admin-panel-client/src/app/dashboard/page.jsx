import Button from "@/components/Button";
import { Table, Td } from "@/components/Table";
import {
  fetchFeedback,
  fetchNotification,
  getBusSchedules,
  getDashboard,
} from "@/lib/fetchData";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import React from "react";
import { FaCommentAlt, FaUser, FaUserCog } from "react-icons/fa";
import { IoIosNotifications, IoMdBus } from "react-icons/io";
import { getRecentEntries } from "@/lib/utils";

const page = async () => {
  const dashboardData = await getDashboard();
  const { busCount, driverCount, helperCount } = dashboardData;
  const { notifications } = (await fetchNotification()) || [];
  const { data } = (await fetchFeedback()) || [];
  const feedbacks = getRecentEntries(data);
  const busSchedules = (await getBusSchedules()) || [];
  const busSchedulesTypes = busSchedules?.schedules?.map((busSchedule) => ({
    id: busSchedule.id,
    scheduleType: busSchedule.scheduleType,
    isActive: busSchedule.isActive,
  }));

  return (
    <div className="p-4  md:p-10 bg-gray-100 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex flex-wrap gap-4">
        <Card title="Active Buses" content={busCount} />
        <Card title="Inactive Buses" />
        <Card title="Drivers" content={driverCount} />
        <Card title="helpers" content={helperCount} />
        <Card title="Students Travaling Today" />
        <Card title="Comeing to University" />
        <Card title="Leaving to University" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <CardWrapper classes="space-y-2">
          <div className="flex gap-2 items-center mb-4">
            <IoIosNotifications size={24} />
            <h3 className="font-medium text-xl">Recent Notifications</h3>
          </div>
          {notifications?.map((notificaton) => (
            <AlartCard
              key={notificaton.id}
              title={notificaton?.title}
              message={notificaton.message}
            />
          ))}
        </CardWrapper>
        <CardWrapper classes=" space-y-2">
          <div className="flex gap-2 items-center mb-4">
            <FaCommentAlt size={20} />
            <h3 className="font-medium text-xl">Recent Feedback</h3>
          </div>
          {feedbacks?.map((feedback) => (
            <AlartCard
              key={feedback.id}
              title={feedback?.feedbackType}
              message={feedback.message}
            />
          ))}
        </CardWrapper>
      </div>

      <CardWrapper>
        <h3 className="text-center text-2xl mb-4 font-medium">
          Schedule Status
        </h3>
        <Table tableHeaders={["Schedule Type", "Status"]}>
          {busSchedulesTypes?.map((busSchedulesType) => {
            const { id, scheduleType, isActive } = busSchedulesType;

            return (
              <tr key={id}>
                <Td>{scheduleType}</Td>
                <Td>{isActive ? "Active" : "Inactive"}</Td>
              </tr>
            );
          })}
        </Table>
      </CardWrapper>

      <div>
        <h3 className="text-xl font-medium mb-4">Quick Actions</h3>
        <div className="flex justify-center gap-2">
          <Link
            href="/deshboard/dashboard/assigned-bus?add=true"
            className="py-1 px-2 flex items-center gap-1 bg-blue-600 text-white rounded max-w-min whitespace-nowrap"
          >
            <IoMdBus size={20} /> Assign Bus
          </Link>
          <Link
            href="/dashboard/schedule?add=true"
            className="py-1 px-2 flex items-center gap-1 bg-lime-600 text-white rounded max-w-min whitespace-nowrap"
          >
            <SlCalender size={20} /> Create Schedule
          </Link>
          <Link
            href="/dashboard/driver-info/add-driver"
            className="py-1 px-2 flex items-center gap-1 bg-teal-600 text-white rounded max-w-min whitespace-nowrap"
          >
            <FaUser size={20} /> Manage Driver
          </Link>
          <Link
            href="/helper-info/add-helper"
            className="py-1 px-2 flex items-center gap-1 bg-yellow-600 text-white rounded max-w-min whitespace-nowrap"
          >
            <FaUserCog size={20} /> Manage Helper
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;

const Card = ({ title, content }) => {
  return (
    <div className="bg-white py-4 px-6 rounded-lg text-center shadow-md flex-grow">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{content}</p>
    </div>
  );
};

const CardWrapper = ({ classes, children }) => {
  return (
    <div
      className={`bg-white py-4 px-6 rounded-lg shadow-md flex-grow ${classes}`}
    >
      {children}
    </div>
  );
};

const AlartCard = ({ title, message }) => {
  return (
    <div className="bg-gray-100 flex self-stretch gap-2  rounded-md">
      <div className="w-[4px] h-auto bg-sky-600 rounded-l-md"></div>
      <div className="rounded p-1 flex gap-2">
        <p className="font-medium whitespace-nowrap">{title} :</p>{" "}
        <p className="text-slate-800 text-left">{message}</p>
      </div>
    </div>
  );
};
