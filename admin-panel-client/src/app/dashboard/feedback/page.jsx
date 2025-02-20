"use client";
import { SubPageLoading } from "@/components/PageLoading";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [isLoading1, setIsLoading1] = useState(false);
  const [feedbackes, setFeedbackes] = useState([]);

  const fetchFeedbacks = async () => {
    setIsLoading1(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/feedback`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setFeedbackes(data?.data || []);
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
    fetchFeedbacks();
  }, []);

  console.log(feedbackes);

  return (
    <div className=" md:p-8 p-3 ">
      <div>
        <h2 className=" text-[2rem] font-medium ">Feedbacks</h2>
      </div>
      {
        isLoading1 ? <div className=' relative min-h-[20rem] w-full '>
          <SubPageLoading />
        </div> : <div className=" grid grid-cols-1 sm:flex sm:flex-wrap gap-3 mt-8 ">
        {feedbackes.map((feedback, idx) => (
          <div key={idx}>
            <Card feedback={feedback} />
          </div>
        ))}
      </div>
      }
    </div>
  );
};

export default Page;

const Card = ({feedback}) => {
  return (
    <div className=" rounded-md w-full sm:w-[18rem] shadow-[0px_1px_5px_rgba(0,0,0,0.15)] ">
      <div className=" py-4 px-3 min-h-[6rem] ">
      <p className=" text-center ">{feedback?.message}</p>
      </div>
      <div className=" py-4 px-3 bg-slate-50 ">
          <h4 className=" font-medium ">Id <span className=" text-green-500 ">{feedback?.universityId}</span></h4>
        <div className=" flex items-center justify-between mt-2 ">
          <h4 className=" font-medium ">{feedback?.name} (<span>{feedback?.department}</span>)</h4>
          <h4 className=" px-2 rounded-md text-green-500 bg-green-50 ">{feedback?.userType}</h4>
        </div>
      </div>
    </div>
  );
};
