"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ totalPages, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  const getPages = () => {
    let pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) pages.push(1);
    if (startPage > 2) pages.push("...");

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) pages.push("...");
    if (endPage < totalPages) pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex mt-4 max-w-full overflow-auto pb-2 mb-2 items-center space-x-2 bg-gray-100 p-2 rounded-lg w-fit mx-auto">
      <button
        className={`py-1 px-3 rounded-lg ${
          currentPage === 1 ? "text-gray-400" : "text-black"
        }`}
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
      >
        <IoIosArrowBack size={24} />
      </button>
      {getPages().map((page, index) => (
        <button
          key={index}
          className={`py-1 px-3  ${
            page === currentPage
              ? "text-blue-600 font-bold bg-blue-100 rounded-md"
              : ""
          }`}
          onClick={() => typeof page === "number" && changePage(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
      <button
        className={`py-1 px-3 rounded-lg ${
          currentPage === totalPages ? "text-gray-400" : "text-black"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
      >
        <IoIosArrowForward size={24} />
      </button>
    </div>
  );
};

export default Pagination;
