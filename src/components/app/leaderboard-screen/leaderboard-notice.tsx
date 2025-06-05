import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useClickSound from "@/hooks/use-click-sound";
import { useAppProvider } from "@/hooks/use-context";
import { getCookie, KEY_PRIZE_ALERT, setCookie } from "@/lib/utils";
import { useEffect, useState } from "react";
import CloseDialog from "../welcome-screen/close-dialog";
import InformationIcon from "./information-icon";
import NoticeHeading from "./notice-heading";
import Top3List from "./top3-list";

export default function LeaderboardNotice() {
  const { hasPrizeAlert, setHasPrizeAlert } = useAppProvider();
  const { clickPlay } = useClickSound();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const hasSeenPrizeAlert = getCookie(KEY_PRIZE_ALERT);
    if (!hasSeenPrizeAlert && hasPrizeAlert) {
      setIsDialogOpen(true);
    }
  }, [hasPrizeAlert]);

  function handleInfoClick() {
    clickPlay();
    setIsDialogOpen(true);
  }

  function handleCloseDialog() {
    clickPlay();
    setIsDialogOpen(false);
    setCookie(KEY_PRIZE_ALERT, "true", 30);
    setHasPrizeAlert(false);
  }

  const prizes = [
    "Redmi Note 14 5G",
    "Xiaomi Smart Watch S4",
    "Xiaomi Smart Band 9 Pro",
  ];

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          onClick={handleInfoClick}
          className="focus:outline-none animate-app-ping"
          aria-label="Show prize information"
        >
          <InformationIcon />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] max-w-sm rounded-xl">
        <button
          type="button"
          onClick={handleCloseDialog}
          className="absolute right-0 translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full"
          aria-label="Close dialog"
        >
          <CloseDialog size={40} />
        </button>
        <div className="flex flex-col gap-10 items-center w-full">
          <div className="flex flex-col gap-5 w-full">
            <AlertDialogTitle className="w-full [&>svg]:w-full">
              <NoticeHeading />
            </AlertDialogTitle>
            <img
              alt="prize-illustration"
              src="/illustration/prizes.webp"
              className="object-contain"
              loading="lazy"
            />
            <div className="flex flex-col gap-0.5">
              {prizes.map((prize, index) => (
                <Top3List key={prize} position={index + 1} name={prize} />
              ))}
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
