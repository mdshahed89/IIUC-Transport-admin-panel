export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}



export const ButtonLoading = () => {
  return(
    <div className="absolute top-0 left-0 w-full h-full inset-0 flex items-center justify-center z-50">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}


export const SubPageLoading = () => {
  return(
    <div className="absolute top-0 left-0 w-full h-full inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}