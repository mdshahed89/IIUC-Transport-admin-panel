import { getBusInfo } from "@/lib/fetchData";
import Link from "next/link";
import Content from "./Content";
import Button from "@/components/Button";

const BusInformation = async () => {
  const busData = await getBusInfo();
  const buses = busData.buses || [];

  return (
    <main className="p-8 flex-1 overflow-y-auto">
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Bus Information
        </h2>
        <div className="flex justify-end mb-4">
          <Link href="/dashboard/add-bus">
            <Button bg="green">Add New Bus</Button>
          </Link>
        </div>
        <Content buses={buses} />
      </div>
    </main>
  );
};

export default BusInformation;
