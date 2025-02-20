export default function Loading() {
    return (
      <div className="fixed left-0 right-0 z-[1000] inset-0 flex items-center justify-center bg-white ">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }