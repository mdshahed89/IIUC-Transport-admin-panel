import { getBusInfo } from "@/lib/fetchData";
import Content from "./Content";
import BusInfoForm from "./form";

const BusInformation = async ({ searchParams }) => {
  const { edit, add } = await searchParams;

  let buses;

  if (!edit && !add) {
    const busData = await getBusInfo();
    buses = busData?.buses || [];
  }

  return (
    <>
      {edit || add ? (
        <BusInfoForm edit={edit} />
      ) : (
        <div>
          <div className="p-4 md:p-8 w-full"></div>

          <h2 className="text-3xl font-semibold text-center mb-6">
            Bus Information
          </h2>

          <Content buses={buses} />
        </div>
      )}
    </>
  );
};

export default BusInformation;
