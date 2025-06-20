"use client";
import useFetchData from "@/app/hooks/useFetchData";
import Button from "@/components/Button";
import { FormSelectField, FormSelectFieldSearch } from "@/components/FormField";
import { ButtonLoading, SubPageLoading } from "@/components/PageLoading";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { toast } from "react-toastify";

const AssignBusForm = ({ edit, adminId, fetchAssignBus }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // editable assign bus id
  const editId = Number(edit);

  // fetch editable assign bus
  const { data: editableAssignBus, isLoading: editableLoading } =
    useFetchData({ endpoint: `/assign-bus/${editId}` }) || {};

  const isEditableLoading = edit && editableLoading;

  // fetch bus info
  const { data: busInfo } = useFetchData({ endpoint: "/bus-info" });

  // const busInfo = await getBusInfo();
  const busNo = busInfo?.buses?.map((bus) => bus.busNo) || [];

  // Bus Schedule
  const { data: busSchedules } = useFetchData({ endpoint: "/bus-schedules" });
  const busSchedulesName =
    busSchedules?.schedules?.map((schedules) => schedules.scheduleName) || [];

  // Destructure editable assign bus
  const {
    busNo: editableBusNo,
    scheduleName,
    busType,
    Gender,
  } = editableAssignBus || {};

  // Handle submit
  // const onSubmit = async (formData) => {
  //   "use server";
  //   const fromEntries = Object.fromEntries(formData.entries());
  //   const data = { ...fromEntries, busNo: Number(fromEntries.busNo) };

  //   // if editable, then edit data otherwise add data
  //   if (edit) {
  //     const edited = await editData({
  //       endpoint: `/assign-bus/${editId}`,
  //       data,
  //     });

  //     if (!edited?.error) {
  //       redirect(`/dashboard/${adminId}/assigned-bus`);
  //     }
  //   } else {
  //     const created = await create({ endpoint: "/assign-bus", data });

  //     if (!created?.error) {
  //       redirect(`/dashboard/${adminId}/assigned-bus`);
  //     }
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!edit) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.salmanshahriar.wiki/api/admin/assign-bus`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        console.log(data);
        if (response.ok) {
          toast.success("Added successfully!");
          router.push(`/dashboard/${adminId}/assigned-bus`);
          await fetchAssignBus();
        } else {
          toast.error(data.message || "Failed to add!");
        }
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
        console.error("Error submitting driver details:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.salmanshahriar.wiki/api/admin/assign-bus/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        console.log(data);
        if (response.ok) {
          toast.success("Updated successfully!");
          router.push(`/dashboard/${adminId}/assigned-bus`);
          await fetchAssignBus();
        } else {
          toast.error(data.message || "Failed to update!");
        }
      } catch (error) {
        toast.error("Something went wrong! Please try again.");
        console.error("Error submitting driver details:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="max-w-xl mx-auto my-8 p-8 bg-white md:shadow-[0px_1px_10px_rgba(0,0,0,0.15)] rounded-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">
          {edit ? "Edit Assign " : "Assign New "}Bus
        </h2>
        <Link
          href={`/dashboard/${adminId}/assigned-bus`}
          className=" p-2 rounded-full bg-slate-50 shadow-inner cursor-pointer text-[1.5rem] "
        >
          <IoArrowBackSharp />
        </Link>
      </div>

      {isEditableLoading ? (
        <SubPageLoading />
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <FormSelectFieldSearch
            label="Bus No"
            name="busNo"
            placeholder="Search Bus No"
            required
            defaultValue={editableBusNo}
            selectOption={busNo}
          />
          <FormSelectFieldSearch
            label="Slot Name"
            name="scheduleName"
            placeholder="Search Schedule Name"
            required
            defaultValue={scheduleName}
            selectOption={busSchedulesName}
          />

          <FormSelectField
            label="Bus Type"
            name="busType"
            defaultValue={busType}
            selectOption={["Students", "Teachers", "Staff"]}
          />
          <FormSelectField
            label="Gender"
            name="Gender"
            defaultValue={Gender}
            selectOption={["Both", "Male", "Female"]}
          />

          <Button
            type="submit"
            classes="bg-green-500 w-full active:scale-90 rounded-lg text-lg font-semibold shadow-md transition-all duration-300"
          >
            {isLoading && <ButtonLoading />}{" "}
            {edit ? "Edit Assign " : " Assign "}Bus
          </Button>
        </form>
      )}
    </div>
  );
};

export default AssignBusForm;
