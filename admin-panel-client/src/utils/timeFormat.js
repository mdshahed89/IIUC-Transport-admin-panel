export function convertTo12HourFormat(time) {
  const [hours, minutes] = time.split(":");
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString();
  return `${formattedHours}:${minutes} ${period}`;
}
