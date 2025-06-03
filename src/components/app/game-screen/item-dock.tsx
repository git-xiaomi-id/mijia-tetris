import "./game-dock.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import refrigeratorItems from "@/lib/refrigerator-items";
import arrow from "./arrow-right.webp";
import useClickSound from "@/hooks/use-click-sound";
import { useGameProvider } from "@/hooks/use-game";
import AppButton from "../button";
import { toast } from "sonner";

type items = typeof refrigeratorItems;
type item = items[0];
type id = item["id"];
type dock = item["dock"];

interface IDockItem {
  item: item;
  itemActive: string | null;
  onClickItem: (item: item) => void;
  areaActive: string | null;
}

interface IDockRow {
  items: items;
  dock: dock;
  active: id | null;
  onClickItem: (item: item) => void;
  areaActive: string | null;
}

function DockItem({ item, itemActive, onClickItem }: IDockItem) {
  const activeClass = itemActive === item.id ? "scale-150" : "";

  return (
    <div
      onClick={() => onClickItem(item)}
      className={[
        "py-2 transition-all active:scale-90",
        // areaActive && areaActive === item.rack ? "" : "grayscale",
      ].join(" ")}
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

function DockRow({ items, dock, active, onClickItem, areaActive }: IDockRow) {
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
                onClickItem={onClickItem}
                areaActive={areaActive}
                itemActive={active}
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
  const {
    itemActive: active,
    setItemActive: setActive,
    topItem,
    bottomItem,
    areaActive,
    setAreaActive,
  } = useGameProvider();

  const { clickPlay } = useClickSound();

  function onClickItem(item: item) {
    clickPlay();

    if (areaActive) {
      if (item.rack !== areaActive && active !== item.id)
        toast.error(`Oops!`, {
          description: `${item.name} tidak bisa ditaruh di ${areaActive}`,
        });
      setActive(active === item.id ? null : item.id);
    }
  }

  function closeArea() {
    setAreaActive("");
  }

  return (
    <div className="game-dock">
      {areaActive && (
        <div className="absolute -top-20 right-0">
          <AppButton size="sm" variant="red" onClick={closeArea}>
            <img
              alt="ar"
              src="/icon/arrow-left-yellow.webp"
              className="h-3 w-auto"
            />
            Kembali
          </AppButton>
        </div>
      )}
      <DockRow
        items={topItem}
        dock="top"
        active={active}
        onClickItem={onClickItem}
        areaActive={areaActive}
      />
      <DockRow
        items={bottomItem}
        dock="bottom"
        active={active}
        onClickItem={onClickItem}
        areaActive={areaActive}
      />
    </div>
  );
}
