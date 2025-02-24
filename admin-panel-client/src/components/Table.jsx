"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

export const Table = ({ tableHeaders = [], children }) => {
  return (
    <div className="overflow-x-auto border">
      <table className="border w-full">
        <thead>
          <tr>
            {tableHeaders.map((heading, index) => (
              <th
                key={index}
                className="py-2 px-4 border-b bg-gray-100 text-gray-700 text-center "
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export const Td = ({ children }) => {
  return (
    <td className={`p-2 border text-gray-700 text-center  `}>{children}</td>
  );
};

export function HelperTable({ helpers, fetchHelpers }) {
  const deleteHelperHandler = async (id) => {
    if (!id) {
      toast.error("Helper id is required");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/helper-info/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Helper deleted successfully!");
        fetchHelpers();
      } else {
        toast.error(data.message || "Failed to delete helper!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting helper delete:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className=" w-full mx-auto border shadow-md border-gray-100 my-6">
        <thead>
          <tr className="bg-[#666666] text-white">
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Helper Name
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Helper ID
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Phone
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              NID
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {helpers.map((helper, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition duration-300 border-b"
            >
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {helper?.name}
              </td>
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {helper?.helperID}
              </td>
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {helper?.phone}
              </td>
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {helper?.helperNID}
              </td>

              <td className="px-2 py-2 text-center h-full">
                <div className="h-full flex items-center justify-center gap-2 text-[1.4rem]  ">
                  <div
                    onClick={() => deleteHelperHandler(helper?.id)}
                    className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
                  >
                    <MdDeleteOutline />
                  </div>
                  <Link
                    href={`/dashboard/helper-info/edit-helper/${
                      helper?.id || "0"
                    }`}
                    className="bg-slate-100 p-2 rounded-full shadow-inner cursor-pointer"
                  >
                    <CiEdit />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DriverTable({ drivers, fetchDrivers }) {
  const deleteDriveHandler = async (id) => {
    if (!id) {
      toast.error("Driver id is required");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/driver-info/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Driver deleted successfully!");
        fetchDrivers();
      } else {
        toast.error(data.message || "Failed to delete driver!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting driver delete:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className=" w-full mx-auto border shadow-md border-gray-100 my-6">
        <thead>
          <tr className="bg-[#666666] text-white">
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Driver Name
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Driver ID
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Address
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              NID
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              License
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition duration-300 border-b"
            >
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {driver?.driverName}
              </td>
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {driver?.driverID}
              </td>
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {driver?.address}
              </td>
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {driver?.driverNID}
              </td>
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {driver?.driverLicense}
              </td>
              <td className="px-2 py-2 text-center h-full">
                <div className="h-full flex items-center justify-center gap-2 text-[1.4rem]  ">
                  <div
                    onClick={() => deleteDriveHandler(driver?.id)}
                    className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
                  >
                    <MdDeleteOutline />
                  </div>
                  <Link
                    href={`/dashboard/driver-info/edit-driver/${
                      driver?.id || "0"
                    }`}
                    className="bg-slate-100 p-2 rounded-full shadow-inner cursor-pointer"
                  >
                    <CiEdit />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TripTable({ data }) {

  const tableRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const tableContainer = tableRef.current;
    if (!tableContainer) return;

    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - tableContainer.offsetLeft);
      setScrollLeft(tableContainer.scrollLeft);
      tableContainer.style.cursor = "grabbing"; // Change cursor
      e.preventDefault(); // Prevent text selection
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const x = e.pageX - tableContainer.offsetLeft;
      const walk = (x - startX) * 2; // Adjust speed
      tableContainer.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      tableContainer.style.cursor = "grab";
    };

    tableContainer.addEventListener("mousedown", handleMouseDown);
    tableContainer.addEventListener("mousemove", handleMouseMove);
    tableContainer.addEventListener("mouseup", handleMouseUp);
    tableContainer.addEventListener("mouseleave", handleMouseUp);

    return () => {
      tableContainer.removeEventListener("mousedown", handleMouseDown);
      tableContainer.removeEventListener("mousemove", handleMouseMove);
      tableContainer.removeEventListener("mouseup", handleMouseUp);
      tableContainer.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  return (
    <div ref={tableRef}
      className="overflow-x-auto cursor-grab select-none" // Disable text selection
      style={{
        whiteSpace: "nowrap", 
        userSelect: "none", // Prevents text selection
        WebkitUserSelect: "none", // Prevents selection in Safari
        MsUserSelect: "none", // Prevents selection in IE
      }}>
      {data && Array.isArray(data) && data.length > 0 ? (
        <table className=" w-full mx-auto border shadow-md border-gray-100 my-6">
          <thead>
            <tr className="bg-[#666666] text-white">
              <th className="py-3 px-4 text-center whitespace-nowrap border-b">
                Bus No
              </th>
              <th className="py-3 px-4 text-center whitespace-nowrap border-b">
                Start Point
              </th>
              <th className="py-3 px-4 text-center whitespace-nowrap border-b">
                Driver Name
              </th>
              <th className="py-3 px-4 text-center whitespace-nowrap border-b">
                Helper Name
              </th>
              <th className="py-3 px-4 text-center whitespace-nowrap border-b">
                Sub Driver Name
              </th>
              <th className="py-3 px-4 text-center whitespace-nowrap border-b">
                Sub Helper Name
              </th>
              <th className="py-3 px-4 text-center whitespace-nowrap border-b">
                No. of Students
              </th>
              <th className="py-3 px-4 text-center whitespace-nowrap border-b">
                Trip Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition duration-300 border-b"
              >
                <td className="py-4 px-2 whitespace-nowrap text-center">
                  {dt?.busNo}
                </td>
                <td className="py-4 px-2 whitespace-nowrap text-center">
                  {dt?.startPoint}
                </td>
                <td className="py-4 px-2 whitespace-nowrap text-center">
                  {dt?.driverName}
                </td>
                <td className="py-4 px-2 whitespace-nowrap text-center">
                  {dt?.helperName}
                </td>
                <td className="py-4 px-2 whitespace-nowrap text-center">
                  {dt?.subDriverName}
                </td>
                <td className="py-4 px-2 whitespace-nowrap text-center">
                  {dt?.subHelperName}
                </td>
                <td className="py-4 px-2 whitespace-nowrap text-center">
                  {dt?.noOfStudents}
                </td>
                <td className="py-4 px-2 whitespace-nowrap text-center">
                  {dt?.tripDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h4 className=" text-center text-gray-500 ">Data Not Found</h4>
      )}
    </div>
  );
}

export function UserTable({ users, fetchUsers, token, adminId }) {


  const deleteUserHandler = async (id) => {
    if (!token) {
      toast.error("You are not authenticated to remove user");
      return;
    }
    if (!id) {
      toast.error("User id is required");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("User removed successfully!");
        fetchUsers();
      } else {
        toast.error(data.message || "Failed to remove driver!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting user delete:", error);
    }
  };

  return (
    <div className="overflow-x-auto " 
    >
      <table className=" w-full mx-auto border shadow-md border-gray-100 my-6">
        <thead>
          <tr className="bg-[#666666] text-white">
            {/* <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              ID
            </th> */}
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Name
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Email
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Role
            </th>
            <th className="py-3 px-4 text-center whitespace-nowrap border-b">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr
              key={idx}
              className="hover:bg-gray-50 transition duration-300 border-b"
            >
              {/* <td className="py-4 px-2 whitespace-nowrap text-center">
                {user?.id}
              </td> */}
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {user?.name}
              </td>
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {user?.email}
              </td>
              <td className="py-4 px-2 whitespace-nowrap text-center">
                {user?.role}
              </td>
              <td className="px-2 py-2 text-center h-full">
                {
                  user?.role === "Super Admin" ? "N/A" : <div className="h-full flex items-center justify-center gap-2 text-[1.4rem]  ">
                  <div
                    onClick={() => deleteUserHandler(user?.id)}
                    className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
                  >
                    <MdDeleteOutline />
                  </div>
                  <Link
                    href={`/dashboard/profile/${adminId}/edit-user/${user?.id}`}
                    className="bg-slate-100 p-2 rounded-full shadow-inner cursor-pointer"
                  >
                    <CiEdit />
                  </Link>
                </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
