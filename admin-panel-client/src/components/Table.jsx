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

export function HelperTable({ helpers, fetchHelpers, adminId }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedHelperId, setSelectedHelperId] = useState(null);

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
        const data = await response.json();
        toast.error(data.message || "Failed to delete helper!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error submitting helper delete:", error);
    } finally {
      setShowModal(false);
      setSelectedHelperId(null);
    }
  };

  const confirmDelete = (id) => {
    setSelectedHelperId(id);
    setShowModal(true);
  };

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this helper?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteHelperHandler(selectedHelperId)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full mx-auto border shadow-md border-gray-100 my-6">
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
                  <div className="h-full flex items-center justify-center gap-2 text-[1.4rem]">
                    <div
                      onClick={() => confirmDelete(helper?.id)}
                      className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
                    >
                      <MdDeleteOutline />
                    </div>
                    <Link
                      href={`/dashboard/${adminId}/helper-info/edit-helper/${
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
    </>
  );
}

export function DriverTable({ drivers, fetchDrivers, adminId }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  const confirmDelete = (id) => {
    setSelectedDriverId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedDriverId) {
      toast.error("Driver ID is required");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/driver-info/${selectedDriverId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("Driver deleted successfully!");
        fetchDrivers();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete driver!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error deleting driver:", error);
    } finally {
      setShowModal(false);
      setSelectedDriverId(null);
    }
  };

  return (
    <>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full mx-auto border shadow-md border-gray-100 my-6">
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
                <td className="px-2 py-2 text-center">
                  <div className="flex items-center justify-center gap-2 text-[1.4rem]">
                    <div
                      onClick={() => confirmDelete(driver?.id)}
                      className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
                    >
                      <MdDeleteOutline />
                    </div>
                    <Link
                      href={`/dashboard/${adminId}/driver-info/edit-driver/${
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this driver?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
      tableContainer.style.cursor = "grabbing";
      e.preventDefault();
    };

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const x = e.pageX - tableContainer.offsetLeft;
      const walk = (x - startX) * 2;
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
    <div
      ref={tableRef}
      className="overflow-x-auto cursor-grab select-none"
      style={{
        whiteSpace: "nowrap",
        userSelect: "none",
        WebkitUserSelect: "none",
        MsUserSelect: "none",
      }}
    >
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
    <div className="overflow-x-auto ">
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
                {user?.role === "Super Admin" ? (
                  "N/A"
                ) : (
                  <div className="h-full flex items-center justify-center gap-2 text-[1.4rem]  ">
                    <div
                      onClick={() => deleteUserHandler(user?.id)}
                      className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
                    >
                      <MdDeleteOutline />
                    </div>
                    <Link
                      href={`/dashboard/${adminId}/profile/${adminId}/edit-user/${user?.id}`}
                      className="bg-slate-100 p-2 rounded-full shadow-inner cursor-pointer"
                    >
                      <CiEdit />
                    </Link>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GeneralUsersTable({ generalUsers, fetchGeneralUsers, adminId }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUserId) {
      toast.error("General user ID is required");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/all-users/${selectedUserId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("General user deleted successfully!");
        fetchGeneralUsers();
      } else {
        toast.error(data.message || "Failed to delete general user!");
      }
    } catch (error) {
      toast.error("Something went wrong! Please try again.");
      console.error("Error deleting general user:", error);
    } finally {
      setShowModal(false);
      setSelectedUserId(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full mx-auto border border-gray-100 my-6">
        <thead>
          <tr className="bg-[#666666] text-white">
            <th className="py-3 px-4 text-center border-b">Name</th>
            <th className="py-3 px-4 text-center border-b">ID</th>
            <th className="py-3 px-4 text-center border-b">Gsuit</th>
            <th className="py-3 px-4 text-center border-b">Department</th>
            <th className="py-3 px-4 text-center border-b">Pickup Point</th>
            <th className="py-3 px-4 text-center border-b">Gender</th>
            <th className="py-3 px-4 text-center border-b">User Type</th>
            <th className="py-3 px-4 text-center border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {generalUsers.map((user, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition border-b">
              <td className="py-4 px-2 text-center">{user?.userName}</td>
              <td className="py-4 px-2 text-center">{user?.userID}</td>
              <td className="py-4 px-2 text-center">{user?.userGsuit}</td>
              <td className="py-4 px-2 text-center">{user?.Department}</td>
              <td className="py-4 px-2 text-center">{user?.pickupPoint}</td>
              <td className="py-4 px-2 text-center">{user?.gender}</td>
              <td className="py-4 px-2 text-center">{user?.userType}</td>
              <td className="px-2 py-2 text-center">
                <div className="flex justify-center items-center gap-2 text-[1.4rem]">
                  <div
                    onClick={() => handleDeleteClick(user?.id)}
                    className="bg-red-50 p-2 text-red-500 rounded-full shadow-inner cursor-pointer"
                  >
                    <MdDeleteOutline />
                  </div>
                  <Link
                    href={`/dashboard/${adminId}/general-users/edit-general-user/${user?.id || "0"}`}
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

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure you want to delete this user?
            </h2>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
