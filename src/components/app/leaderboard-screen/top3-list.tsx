import { formatTime } from "@/utils/format-time";

interface Top3ListProps {
  position: number;
  name: string;
  duration?: number;
}

export default function Top3List({ position, name, duration }: Top3ListProps) {
  const medalsIcon = [
    "/icon/icon-medal-gold.webp",
    "/icon/icon-medal-silver.webp",
    "/icon/icon-medal-bronze.webp",
  ];

  return (
    <div
      className={`ls-board-${position} flex-1 rounded-lg flex items-center justify-between shadow-sm py-3 px-2 overflow-hidden`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
          <img
            src={medalsIcon[position - 1]}
            alt={`Medal for position ${position}`}
            width="40"
            height="40"
            className="object-contain"
            loading="eager"
          />
          <span className="absolute inset-0 -top-2 flex items-center justify-center font-bold text-lg text-white drop-shadow-md">
            {position}
          </span>
        </div>
        <span className="font-[520] text-[#222222] truncate min-w-0">
          {name}
        </span>
      </div>
      {typeof duration === "number" && (
        <div className="ls-time-box-top3 text-right flex-shrink-0 ml-2">
          {formatTime(duration)}
        </div>
      )}
    </div>
  );
}
