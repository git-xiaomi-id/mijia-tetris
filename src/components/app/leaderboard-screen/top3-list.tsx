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
      className={`ls-board-${position} rounded-lg flex items-center justify-between shadow-sm py-3 px-2`}
    >
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex items-center justify-center">
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
        <span className="font-semibold text-gray-800">{name}</span>
      </div>
      {typeof duration === "number" && (
        <div className="ls-time-box-top3 text-right">
          {formatTime(duration)}
        </div>
      )}
    </div>
  );
}
