export default function Loading() {
  return (
    <div className="absolute top-0 left-0 w-full h-full inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
