export const convertTo12HourFormat = (time24) => {
  let [hours, minutes] = time24.split(":").map(Number);
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // Convert 24-hour to 12-hour format
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};
