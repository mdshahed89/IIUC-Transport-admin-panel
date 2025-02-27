import { getBusInfo } from "@/lib/fetchData";
import Content from "./Content";
import BusInfoForm from "./form";
import Pagination from "@/components/Pageination";

const BusInformation = async ({ searchParams }) => {
  const { edit, add, page = 1 } = await searchParams;

  let busInfo;

  if (!edit && !add) {
    const busData = await getBusInfo({ page });
    busInfo = busData || {};
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

          <Content buses={busInfo?.buses || []} />

          {busInfo?.totalPages > 1 && (
            <Pagination
              currentPage={Number(page)}
              totalPages={busInfo?.totalPages}
            />
          )}
        </div>
      )}
    </>
  );
};

export default BusInformation;
