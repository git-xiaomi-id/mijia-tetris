import { useMemo } from "react";
import LivesFill from "./icon/lives-fill";
import LivesOut from "./icon/lives-out";

interface ChancePlayProps {
  gameCount: number;
  direction: "row" | "col";
}

export default function ChancePlay({
  gameCount,
  direction = "col",
}: ChancePlayProps) {
  const maxLives = 3;
  const emptyLives = Math.min(Math.max(gameCount, 0), maxLives);
  const filledLives = maxLives - emptyLives;

  const directionClass = useMemo(
    () =>
      direction === "col"
        ? "flex-col items-end gap-1 pb-10"
        : "flex-row items-center justify-end gap-2",
    [direction]
  );

  return (
    <div className={`flex ${directionClass}`}>
      <p className="font-[520] text-[10px]">
        Kesempatan main{direction === "row" && ":"}
      </p>
      <div className="flex items-center gap-1">
        {Array.from({ length: emptyLives }, (_, index) => (
          <LivesOut key={`empty-${index}`} />
        ))}
        {Array.from({ length: filledLives }, (_, index) => (
          <LivesFill key={`filled-${index}`} />
        ))}
      </div>
    </div>
  );
}
