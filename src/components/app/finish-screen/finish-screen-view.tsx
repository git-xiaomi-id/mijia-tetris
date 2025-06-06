import { useAppProvider } from "@/hooks/use-context";
import { useGameProvider } from "@/hooks/use-game";
import { Instagram } from "lucide-react";
import { useMemo } from "react";
import ChancePlay from "../chance-play";
import FinishHeading from "./finish-heading";
import FinishTimer from "./finish-timer";

function UsernameDisplay({ username }: { username: string }) {
  return (
    <div className="fs-usernameIg max-w-[301px]">
      <div className="fs-usernameIg-icon">
        <Instagram size={16} />
      </div>
      <div className="font-[520] text-sm truncate">@{username}</div>
    </div>
  );
}

export default function FinishScreenView() {
  const { time } = useGameProvider();
  const { user, gamesCount } = useAppProvider();

  const minutes = useMemo(() => {
    return Math.floor(time / 60);
  }, [time]);

  const completion = useMemo(() => {
    if (minutes < 3) {
      return {
        text: "Selesai <3 menit, kamu the flash ya?",
        image: "/mi-bunny/mi-bunny-cool.webp",
      };
    } else if (minutes < 5) {
      return {
        text: "Bisa selesai <5 menit, gokil jago banget!",
        image: "/mi-bunny/mi-bunny-star.webp",
      };
    } else if (minutes < 10) {
      return {
        text: "Hebat! Kamu berhasil selesai <10 menit~",
        image: "/mi-bunny/mi-bunny-smile.webp",
      };
    } else {
      return {
        text: "Akhirnya selesai juga! Tapi waktu kamu >10 menit. Nanti latihan lagi ya~",
        image: "/mi-bunny/mi-bunny-xp.webp",
      };
    }
  }, [minutes]);

  return (
    <div className="fs-view">
      <ChancePlay gameCount={gamesCount} direction="row" />
      <div className="fs-view-card">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="flex flex-col items-center justify-center">
            <FinishHeading />
            <p className="text-center text-[#5F5F5F]">{completion.text}</p>
          </div>
          <div className="size-[160px] mx-auto relative animate-headscaling">
            <img
              alt="restart-illustration"
              src={completion.image}
              className="size-full object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3">
          <FinishTimer />
          <UsernameDisplay username={user?.username_ig ?? ""} />
        </div>
      </div>
    </div>
  );
}
