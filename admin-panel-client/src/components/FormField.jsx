"use client";
export const InputField = ({ placeholder, value, onChange, type = "text" }) => (
  <input
    className="border px-4 py-2 rounded w-1/3"
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export const SelectField = ({ options, value, onChange }) => (
  <select
    className="border px-4 py-2 rounded"
    value={value}
    onChange={onChange}
  >
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
