import type { IItemPlaced, IRackArea } from "@/lib/refrigerator-items";

export default function RackTopDoor({
  items,
  absolute = true,
  type,
}: {
  items: IItemPlaced[][];
  absolute?: boolean;
  type?: IRackArea["areaId"];
}) {
  const view = (
    <div className="gra-area">
      {/* <div className="size-full flex flex-col gap-20"> */}
      {items.map((row, rowIndex) => (
        <div key={rowIndex} className="gra-top-door-row">
          {row.map((_, colIndex) => (
            <div key={colIndex} className="gra-grid-item" />
          ))}
        </div>
      ))}
      {/* </div> */}
    </div>
  );
  if (absolute)
    return (
      <div className="gra-top-door gra-top-door-set">
        <div className={`gra-top-door-bg gra-top-door-set ${type}`} />
        {view}
      </div>
    );
  return view;
}
