"use client";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import ScheduleType from "@/components/ScheduleType"; // Ensure this component is imported
import { CgClose } from "react-icons/cg";

const ScheduleModal = ({ scheduleTypes }) => {
  const [isModal, setIsModal] = useState(false);
  const allRef = useRef(null);

  const handleOpen = () => {
    setIsModal((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (allRef.current && !allRef.current.contains(event.target)) {
        setIsModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={allRef}>
      <Button bg="red" onClick={handleOpen}>
        Active/Inactive Schedule
      </Button>

      {isModal && (
        <div className="absolute rounded-xl top-12 left-1/2 -translate-x-1/2 shadow-md bg-white p-4">
          <div
            className="ml-auto w-full p-1 mb-3 max-w-min rounded-full bg-slate-200 cursor-pointer"
            onClick={handleOpen}
          >
            <CgClose size={24} />
          </div>

          <ScheduleType scheduleTypes={scheduleTypes} />
        </div>
      )}
    </div>
  );
};

export default ScheduleModal;
