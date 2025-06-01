import "./game-dock.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import refrigeratorItems from "@/lib/refrigerator-items";
import arrow from "./arrow-right.webp";
import useClickSound from "@/hooks/use-click-sound";
import { useEffect, useState } from "react";

function DockRow({
  dock,
  active,
  onClick,
}: {
  dock: (typeof refrigeratorItems)[0]["dock"];
  active: (typeof refrigeratorItems)[0]["id"] | null;
  onClick: (id: (typeof refrigeratorItems)[0]["id"]) => void;
}) {
  const itemsSet = refrigeratorItems.filter((i) => i.dock === dock);
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
          {itemsSet
            .filter((i) => i.dock === "top")
            .map((item, n) => (
              <SwiperSlide key={n} title={item.name}>
                <div onClick={() => onClick(item.id)} className="py-2">
                  <div className="mx-auto size-14 aspect-square rounded-md relative gd-item">
                    {/* <div className="line-clamp-1 truncate">{item.name}</div> */}
                    {item.image ? (
                      <img
                        alt={item.name}
                        src={item.image}
                        className={[
                          "size-full object-contain transition-all",
                          "active:scale-90",
                          active === item.id
                            ? "scale-150 active:scale-125"
                            : "",
                        ].join(" ")}
                      />
                    ) : (
                      <div className="size-full object-contain bg-gray-200" />
                    )}
                    <div className="gd-item-count">{item.totalQty}</div>
                  </div>
                </div>
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

  const { clickPlay } = useClickSound();

  function onClick(id: (typeof refrigeratorItems)[0]["id"]) {
    clickPlay();
    setActive(active === id ? null : id);
  }

  return (
    <div className="game-dock">
      <DockRow dock="top" active={active} onClick={onClick} />
      <DockRow dock="bottom" active={active} onClick={onClick} />
    </div>
  );
}
