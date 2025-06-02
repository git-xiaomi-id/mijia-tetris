import "./game-dock.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import refrigeratorItems from "@/lib/refrigerator-items";
import arrow from "./arrow-right.webp";
import useClickSound from "@/hooks/use-click-sound";
import { useState } from "react";

function DockItem({
  item,
  isActive,
  onClickItem,
}: {
  item: (typeof refrigeratorItems)[0];
  isActive: boolean;
  onClickItem: (id: (typeof refrigeratorItems)[0]["id"]) => void;
}) {
  const activeClass = isActive ? "scale-150" : "";
  return (
    <div
      onClick={() => onClickItem(item.id)}
      className="py-2 transition-all active:scale-90"
    >
      <div className="mx-auto size-14 aspect-square rounded-md relative gd-item">
        {item.image ? (
          <img
            alt={item.name}
            src={item.image}
            className={[
              "size-full object-contain transition-all",
              activeClass,
            ].join(" ")}
          />
        ) : (
          <div className="bg-gray-50 text-[10px] p-0.5 line-clamp-2 size-full aspect-square flex items-center justify-center rounded-md">
            {item.name}
          </div>
        )}
        <div className={["gd-item-count"].join(" ")}>{item.totalQty}</div>
      </div>
    </div>
  );
}

function DockRow({
  items,
  dock,
  active,
  onClickItem,
}: {
  items: typeof refrigeratorItems;
  dock: (typeof refrigeratorItems)[0]["dock"];
  active: (typeof refrigeratorItems)[0]["id"] | null;
  onClickItem: (id: (typeof refrigeratorItems)[0]["id"]) => void;
}) {
  const nav = { next: `.next-row-${dock}`, prev: `.prev-row-${dock}` };
  const { clickPlay } = useClickSound();
  return (
    <div className="gd-row">
      <div className="w-[90%] mx-auto relative h-full">
        <Swiper
          slidesPerView={4.2}
          modules={[Navigation]}
          spaceBetween={10}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: nav.next,
            prevEl: nav.prev,
          }}
          className="w-[90%] mx-auto relative"
        >
          {items.map((item, n) => (
            <SwiperSlide key={n} title={item.name}>
              <DockItem
                item={item}
                isActive={active === item.id}
                onClickItem={onClickItem}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          type="button"
          className={`${nav.prev.slice(1)} gd-nav prev`}
          onClick={clickPlay}
        >
          <img
            alt="arrow-left"
            src={arrow}
            className="size-full object-contain"
          />
        </button>
        <button
          type="button"
          className={`${nav.next.slice(1)} gd-nav next`}
          onClick={clickPlay}
        >
          <img
            alt="arrow-right"
            src={arrow}
            className="size-full object-contain"
          />
        </button>
      </div>
    </div>
  );
}

export default function ItemDock() {
  const [active, setActive] = useState<
    (typeof refrigeratorItems)[0]["id"] | null
  >(null);

  const [topItem] = useState<typeof refrigeratorItems | []>(
    refrigeratorItems.filter((item) => item.dock === "top")
  );
  const [bottomItem] = useState<typeof refrigeratorItems | []>(
    refrigeratorItems.filter((item) => item.dock === "bottom")
  );

  const { clickPlay } = useClickSound();

  function onClickItem(id: (typeof refrigeratorItems)[0]["id"]) {
    clickPlay();
    setActive(active === id ? null : id);
  }

  return (
    <div className="game-dock">
      <DockRow
        items={topItem}
        dock="top"
        active={active}
        onClickItem={onClickItem}
      />
      <DockRow
        items={bottomItem}
        dock="bottom"
        active={active}
        onClickItem={onClickItem}
      />
    </div>
  );
}
