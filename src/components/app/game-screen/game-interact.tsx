import { useGameProvider } from "@/hooks/use-game";

export default function GameInteract() {
  const { assets } = useGameProvider();
  return (
    <div className="size-full absolute left-0 top-0">
      <div className="relative size-full border border-blue-500">
        <div className="h-full w-fit border border-dashed border-green-500 mx-auto">
          <img
            alt={assets[assets.length - 1].key}
            src={assets[assets.length - 1].src}
            className="h-full object-contain block border-2 border-red-500"
          />
        </div>
        {/* Left Top Door */}
        {/* <div className="absolute top-4 left-[40%] -translate-x-[70px] bg-white/80 w-12 h-52 border-2 border-dashed border-green-600"></div> */}
        {/* Right Top Door */}
        {/* <div className="absolute top-4 right-[40%] translate-x-[70px] bg-white/80 w-12 h-52 border-2 border-dashed border-green-600"></div> */}

        {/* Middle Top Door 1 */}
        {/* <div className="absolute top-8 left-[50%] -translate-x-[50%] bg-white/80 w-32 h-8 border-2 border-dashed border-green-600"></div> */}
        {/* Middle Top Door 2 */}
        {/* <div className="absolute top-[72px] left-[50%] -translate-x-[50%] bg-white/80 w-32 h-8 border-2 border-dashed border-green-600"></div> */}
        {/* Middle Top Door 3 */}
        {/* <div className="absolute top-[114px] left-[50%] -translate-x-[50%] bg-white/80 w-32 h-8 border-2 border-dashed border-green-600"></div> */}

        {/* Middle Left Door */}
        {/* <div className="absolute top-[188px] left-[36%] bg-white/80 w-[66px] h-9 border-2 border-dashed border-green-600"></div> */}
        {/* Middle Right Door */}
        {/* <div className="absolute top-[188px] right-[35.75%] bg-white/80 w-[66px] h-9 border-2 border-dashed border-green-600"></div> */}
      </div>
    </div>
  );
}
