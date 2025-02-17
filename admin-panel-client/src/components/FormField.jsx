"use client";

import { useEffect, useRef, useState } from "react";

export const InputField = ({ placeholder, value, onChange, type = "text" }) => (
  <input
    className="border px-4 py-2 rounded w-1/3"
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export const SelectField = ({
  selectOption = [],
  className = "",
  getValue = () => {},
  label = "",
}) => {
  const [option, setOption] = useState(selectOption[0]);
  const [allOpen, setAllOpen] = useState(false);

  const allRef = useRef(null);

  getValue(option);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (allRef.current && !allRef.current.contains(event.target)) {
        setAllOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`min-w-[200px] relative ${className}`} ref={allRef}>
      <label className="block text-gray-600 font-medium mb-1">{label}</label>
      <div
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
        onClick={() => setAllOpen(!allOpen)}
      >
        {option}
      </div>
      {allOpen && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10">
          {selectOption.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setOption(option);
                setAllOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const FormSelectField = ({
  selectOption = [],
  name = "",
  defaultValue,
  className = "",
  label = "",
}) => {
  const [option, setOption] = useState(defaultValue || selectOption[0]);
  const [allOpen, setAllOpen] = useState(false);

  const allRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (allRef.current && !allRef.current.contains(event.target)) {
        setAllOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`min-w-[200px] relative ${className}`} ref={allRef}>
      <input type="text" hidden value={option} name={name} readOnly />
      <label className="block text-gray-600 font-medium mb-1">{label}</label>
      <div
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
        onClick={() => setAllOpen(!allOpen)}
      >
        {option}
      </div>
      {allOpen && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
          {selectOption.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setOption(option);
                setAllOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
