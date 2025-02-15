"use client";

const Button = ({ bg = "blue", children, calsses = "", ...props }) => {
  let bgColor;
  if (bg === "blue") {
    bgColor = "bg-blue-500";
  } else if (bg === "green") {
    bgColor = "bg-green-500";
  } else if (bg === "red") {
    bgColor = "bg-red-500";
  } else {
    bgColor = bg;
  }
  return (
    <button
      className={`px-4 py-2  rounded  text-white ${bgColor} ${calsses}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
