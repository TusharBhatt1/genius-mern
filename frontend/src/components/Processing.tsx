import logo from "../assets/logo.png";

export default function Processing({isProcessing,isError}:{isProcessing:boolean, isError:boolean}) {
  return (
    <>
    {isProcessing && (
        <div className="flex gap-2 items-center mt-2">
          <img
            className="animate-spin"
            src={logo}
            height={18}
            width={18}
            alt="Genius"
          />
          <span className="p-2 text-xs text-slate-400 rounded-md mr-4">
            Genius is Thinking
          </span>
        </div>
      )}
      {isError && <span className="text-red-500 text-xs mt-20">Check Connection , Kindly Retry</span>}
      </>
  )
}
