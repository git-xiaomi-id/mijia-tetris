import type { IItemPlaced } from "@/lib/refrigerator-items";

export default function RackTopMiddle({
  items,
  absolute = true,
}: {
  items: IItemPlaced[][];
  absolute?: boolean;
}) {
  console.log("rack-top-middle", { items });

  const view = (
    <div className="gra-area  flex flex-col gap-4 items-center">
      {items.map((row, rowIndex) => (
        <div key={rowIndex} className="gra-top-middle-row">
          {row.map((_, colIndex) => (
            <div
              key={colIndex}
              className="gra-grid-item  w-10"
              style={{
                transform: "rotateX(0deg) rotateY(10deg)",
                transformStyle: "preserve-3d",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
  if (absolute)
    return (
      <>
        <div className="gra-top-middle"></div>
        {view}
      </>
    );
  return view;
}
