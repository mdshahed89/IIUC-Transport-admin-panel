"use client";
import Content from "./Content";
import BusInfoForm from "./form";
import Pagination from "@/components/Pageination";
import useFetchData from "@/app/hooks/useFetchData";
import { SubPageLoading } from "@/components/PageLoading";
import { useParams, useSearchParams } from "next/navigation";

const BusInformation = () => {
  const searchParams = useSearchParams();

  const edit = searchParams.get("edit");
  const add = searchParams.get("add");
  const page = searchParams.get("page") || 1;
  const { adminId } = useParams();

  const {
    data: busInfo,
    isLoading: busInfoLoading,
    fetcher: fetchBusInfo,
  } = useFetchData({
    endpoint: `/bus-info?page=${page}`,
  });

  return (
    <>
      {edit || add ? (
        <BusInfoForm
          edit={edit}
          adminId={adminId}
          fetchBusInfo={fetchBusInfo}
        />
      ) : (
        <div>
          <div className="p-4 md:p-8 w-full"></div>

          <h2 className="text-3xl font-semibold text-center mb-6">
            Bus Information
          </h2>

          {busInfoLoading ? (
            <SubPageLoading />
          ) : (
            <>
              <Content buses={busInfo?.buses || []} adminId={adminId} />

              {busInfo?.totalPages > 1 && (
                <Pagination
                  currentPage={Number(page)}
                  totalPages={busInfo?.totalPages}
                />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default BusInformation;
