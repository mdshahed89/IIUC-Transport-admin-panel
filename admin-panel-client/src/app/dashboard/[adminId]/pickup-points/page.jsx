"use client";
import { SubPageLoading } from "@/components/PageLoading";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [isLoading1, setIsLoading1] = useState(false);
  const [pickupPoints, setPickupPoints] = useState([]);

  const fetchPickupPoints = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/pickup-point-reports`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setPickupPoints(data?.report || []);
      } else {
        console.log(data.message || "Failed to fetch feedbacks!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch feedbacks:", error);
    } finally {
      setIsLoading1(false);
    }
  };

  useEffect(() => {
    fetchPickupPoints();
  }, []);

  console.log(pickupPoints);

  return (
    <div className=" md:p-8 p-3 ">
      <div>
        <h2 className=" text-[2rem] font-medium ">Pickup Points</h2>
      </div>
      {
        isLoading1 ? <div className=' relative min-h-[20rem] w-full '>
          <SubPageLoading />
        </div> : <div className=" grid grid-cols-1 sm:flex sm:flex-wrap gap-3 mt-8 ">
        {pickupPoints.map((pickupPoint, idx) => (
          <div key={idx}>
            <Card pickupPoint={pickupPoint} />
          </div>
        ))}
      </div>
      }
    </div>
  );
};

export default Page;

const Card = ({pickupPoint}) => {
  // console.log(pickupPoint);
  
  return (
    <div className=" rounded-md w-full sm:w-[18rem] shadow-[0px_1px_5px_rgba(0,0,0,0.15)] ">
      <div className=" py-4 px-3 min-h-[6rem] flex items-center justify-center ">
      <p className=" font-semibold ">{pickupPoint?.pickUpPoint}</p>
      </div>
      <div className=" py-4 px-3 bg-slate-50 ">
          <div className=" flex items-center justify-between ">
          <h4 className=" font-medium ">Male (<span className=" text-green-500 ">{pickupPoint?.maleStudents}</span>)</h4>
          <h4 className=" font-medium ">Female (<span className=" text-green-500 ">{pickupPoint?.femaleStudents}</span>)</h4>
          </div>
        <div className=" flex items-center justify-between mt-2 ">
          <h4 className=" font-medium ">Teacher (<span className=" text-green-500 ">{pickupPoint?.teachers}</span>)</h4>
          <h4 className=" font-medium ">Staff (<span className=" text-green-500 ">{pickupPoint?.staff}</span>)</h4>
        </div>
      </div>
      <div className=" bg-slate-200 p-2 text-center ">
      <h4 className=" font-medium ">Total (<span className=" text-green-500 ">{Number(pickupPoint?.maleStudents) + Number(pickupPoint?.femaleStudents) + Number(pickupPoint?.teachers) + Number(pickupPoint?.staff)}</span>)</h4>
      </div>
    </div>
  );
};
