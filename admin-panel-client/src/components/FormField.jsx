"use client";

import { useEffect, useRef, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

export const InputField = ({
  placeholder,
  value,
  onChange,
  type = "text",
  classes,
}) => (
  <input
    className={`border px-4 py-2 rounded w-1/3 ${classes}`}
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

  useEffect(() => {
    getValue(option);
  }, [option]);

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

// export const FormSelectFieldSearch = ({
//   selectOption = [],
//   name = "",
//   defaultValue = "",
//   className = "",
//   label = "",
//   placeholder = "",
//   getData = () => {},
// }) => {
//   const [allOpen, setAllOpen] = useState(false);
//   const [search, setSearch] = useState(defaultValue);
//   const [error, setError] = useState(false);

//   const allRef = useRef(null);

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setError(false); // Reset error when typing
//   };

//   const searchFilter = (val) =>
//     !search
//       ? true
//       : val.toString().toLowerCase().includes(search.toString().toLowerCase());

//   useEffect(() => {
//     getData(search);
//   }, [search]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (allRef.current && !allRef.current.contains(event.target)) {
//         setAllOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // **Validate Input on Blur**
//   const validateInput = () => {
//     if (!selectOption.includes(search)) {
//       setSearch(""); // Reset input if invalid
//       setError(true);
//     } else {
//       setError(false);
//     }
//   };

//   // **Handle Option Selection**
//   const handleOptionClick = (option) => {
//     setSearch(option);
//     setAllOpen(false);
//     setError(false);
//   };

//   return (
//     <div className={`min-w-[200px] relative ${className}`} ref={allRef}>
//       {label && (
//         <label className="block text-gray-600 font-medium mb-1">{label}</label>
//       )}

//       <div className="relative">
//         <input
//           type="text"
//           className={`w-full px-4 py-2 border ${
//             error ? "border-red-500" : "border-gray-300"
//           } rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 ${
//             error ? "focus:ring-red-500" : "focus:ring-green-500"
//           }`}
//           onClick={() => setAllOpen(true)}
//           onChange={handleSearch}
//           onBlur={validateInput} // **Validation on Blur**
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               validateInput();
//               setAllOpen(false);
//             }
//           }}
//           placeholder={placeholder}
//           value={search}
//           name={name}
//         />
//         {search && (
//           <MdOutlineCancel
//             size={24}
//             className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-gray-500"
//             onClick={() => setSearch("")}
//           />
//         )}
//       </div>

//       {error && <p className="text-red-500 text-sm mt-1">Invalid selection!</p>}

//       {allOpen && (
//         <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
//           {selectOption?.filter(searchFilter).map((option) => (
//             <li
//               key={option}
//               className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleOptionClick(option)}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

export const FormSelectFieldSearch = ({
  selectOption = [],
  name = "",
  defaultValue = "",
  className = "",
  label = "",
  placeholder = "",
  getData = () => {},
}) => {
  const [allOpen, setAllOpen] = useState(false);
  const [search, setSearch] = useState(defaultValue);

  const allRef = useRef(null);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // **Filter options based on search input**
  const searchFilter = (val) =>
    !search
      ? true
      : val.toString().toLowerCase().includes(search.toString().toLowerCase());

  // **Effect to update data when search changes**
  useEffect(() => {
    getData(search);
  }, [search]);

  // **Close dropdown when clicking outside**
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

  // **Handle option selection**
  const handleOptionClick = (option) => {
    setSearch(option);
    setAllOpen(false); // Close dropdown
    getData(option); // Call getData with the selected option
  };

  return (
    <div className={`min-w-[200px] relative ${className}`} ref={allRef}>
      {label && (
        <label className="block text-gray-600 font-medium mb-1">{label}</label>
      )}

      <div className="relative">
        <input
          type="text"
          className={`w-full px-4 py-2 border "border-gray-300"
        rounded-lg outline-none transition-all duration-300 ease-in-out focus:ring-1 
             "focus:ring-green-500"
          `}
          onClick={() => setAllOpen(true)}
          onChange={handleSearch}
          placeholder={placeholder}
          value={search}
          name={name}
        />
        {search && (
          <MdOutlineCancel
            size={24}
            className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer text-gray-500"
            onClick={() => {
              setSearch("");
            }}
          />
        )}
      </div>

      {allOpen && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto">
          {selectOption?.filter(searchFilter).map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
