"use client";

import { useData } from "@/app/context/Context";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";


const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idForApprove, setIdForApprove] = useState("");
  const [idForDelete, setIdForDelete] = useState("");
  const [ShowDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedData, setSelectedData] = useState(null)
  const { userData } = useData();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/lost-and-found/all`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      // console.log(data);

      if (response.ok) {
        setData(data?.data || []);
      } else {
        console.log(data.message || "Failed to fetch data!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprovePost = async () => {
    if (!idForApprove) {
      toast.error("Select a post first for approve");
      return;
    }
    if (!userData.token) {
      toast.error("You are not authorized to approve this post");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/lost-and-found/admin/approve/${idForApprove}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Post approved successfully!");
        fetchData();
        // optionally refresh list or remove notification from state
      } else {
        toast.error(data.message || "Failed to approve post!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error approving post:", error);
    } finally {
      setShowApproveModal(false);
      setIdForApprove("");
    }
  };

  const handleDeletePost = async () => {
    if (!idForDelete) {
      toast.error("Select a post first for delete");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/lost-and-found/${idForDelete}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success("Post deleted successfully!");
        fetchData();
        // optionally refresh list or remove notification from state
      } else {
        toast.error(data.message || "Failed to delete post!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error deleting post:", error);
    } finally {
      setShowDeleteModal(false);
      setIdForDelete("");
    }
  };

  console.log(selectedData);

  return (
    <div className=" p-3 ">
      <h3 className=" text-[2rem] font-medium ">Lost & Found</h3>

      {data.length > 0 ? (
        <div className=" mt-[2rem] grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2 gap-6 md:gap-3 xl:grid-cols-3 2xl:grid-cols-4 ">
          {data.map((dt, idx) => (
            <div key={idx} className=" rounded-md overflow-hidden ">
              <div className=" h-[15rem] bg-slate-100 relative ">
                <div className=" absolute top-4 right-4 flex items-center gap-2 ">
                  <div
                    onClick={() => {
                      setIdForApprove(dt.id);
                      setShowApproveModal(true);
                    }}
                    className={` p-3 cursor-pointer rounded-full shadow-inner text-[1.3rem] ${
                      dt?.isApproved
                        ? "bg-green-100 text-green-500"
                        : "bg-slate-200 text-slate-500"
                    } `}
                  >
                    <GiCheckMark />
                  </div>
                  <div
                    onClick={() => {
                      setIdForDelete(dt.id);
                      setShowDeleteModal(true);
                    }}
                    className={` p-3 cursor-pointer rounded-full shadow-inner text-[1.3rem] bg-red-50 text-red-500 `}
                  >
                    <MdDeleteOutline />
                  </div>
                </div>
                <div className={` ${dt.status === "Found" ? "bg-green-50 text-green-500" : "bg-slate-50 text-slate-500"} absolute rounded-tl-md right-0 bottom-0 px-4 py-1 `}>
                  {dt?.status}
                </div>
                {data.imageUrl && (
                  <Image src={dt.imageUrl} alt="Lost and found img" fill className=" w-full h-full object-cover" />
                )}
              </div>
              <div className=" p-3 bg-slate-50 ">
                <div className=" font-semibold text-[#5c5c5c] mb-2 ">
                  {new Date(dt.createdAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  |{" "}
                  {new Date(dt.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <div className=" font-medium mb-2 text-[#5f5f5f] ">
                  <div>{dt?.user?.userName}</div>
                  <div>{dt?.user?.userGsuit}</div>
                </div>
                <div className=" text-[1.3rem] font-medium ">{dt?.title}</div>
                <p className=" mt-1 text-[#414141] line-clamp-3 ">{dt?.itemDescription}</p>
                <div className=" flex mt-2 ">
                  <div onClick={()=>{
                    setSelectedData(dt)
                    setShowDetailsModal(true)
                  }} className=" cursor-pointer px-1 border-b-2 border-green-500 text-green-500 ">More Info</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" mt-[2rem] h-[10rem] flex items-center justify-center font-medium ">
          No lost and found posts found.
        </div>
      )}

      {showApproveModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to change approve status for this post?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleApprovePost}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Change
              </button>
              <button
                onClick={() => setShowApproveModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this post?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeletePost}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowApproveModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {ShowDetailsModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-3 rounded-lg shadow-lg max-w-[40rem] w-full text-center">
            <div className=" flex justify-end mb-2 ">
              <div onClick={()=>setShowDetailsModal(false)} className=" text-[1.4rem] cursor-pointer ">
                <RxCross2 />
              </div>
            </div>

              <div className=" h-[15rem] bg-slate-100 relative ">
                <div className={` ${selectedData.status === "Found" ? "bg-green-50 text-green-500" : "bg-slate-50 text-slate-500"} absolute rounded-tl-md right-0 bottom-0 px-4 py-1 `}>
                  {selectedData?.status}
                </div>
                {/* {selectedData.imageUrl && (
                  <Image src={selectedData.imageUrl} alt="Lost and found img" fill className=" w-full h-full object-cover " />
                )} */}
              </div>

              <div className=" p-3 bg-slate-50 text-left ">
                <div className=" font-semibold text-[#5c5c5c] mb-2 ">
                  {new Date(selectedData.createdAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}{" "}
                  |{" "}
                  {new Date(selectedData.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <div className=" font-medium mb-2 text-[#5f5f5f] ">
                  <div>{selectedData?.user?.userName}</div>
                  <div>{selectedData?.user?.userGsuit}</div>
                  <div>Location Found: {selectedData?.locationFound}</div>
                </div>
                <div className=" text-[1.3rem] font-medium ">{selectedData?.title}</div>
                <p className=" mt-1 text-[#414141] ">{selectedData?.itemDescription}</p>
              </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
