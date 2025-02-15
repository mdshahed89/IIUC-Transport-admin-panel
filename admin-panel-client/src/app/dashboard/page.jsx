import Button from "@/components/Button";
import { getBusSchedules } from "@/lib/fetchData";
import Link from "next/link";
import React from "react";

const page = async () => {
  const totalBueSchedule = await getBusSchedules();

  return (
    <div className="p-4  md:p-10  space-y-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex gap-4">
        <Card title="Total Users" />
        <Card title="Bus Schedules" content={totalBueSchedule?.totalItems} />
      </div>

      <div className="space-x-4">
        <Link href="/dashboard/schedule">
          <Button bg="green">Add New Schedule</Button>
        </Link>
        <Link href="/dashboard/schedule">
          <Button>View Schedule</Button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul>
          <li className="border-b py-2">Admin added a new bus schedule</li>
          <li className="border-b py-2">User updated his profile</li>
        </ul>
      </div>
    </div>
  );
};

export default page;

const Card = ({ title, content }) => {
  return (
    <div class="bg-white p-6 rounded-lg shadow-md w-1/4">
      <h2 class="text-xl font-semibold">{title}</h2>
      <p class="text-3xl font-bold mt-2">{content}</p>
    </div>
  );
};
