import { useAppProvider } from "@/hooks/use-context";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import AppButton from "../button";
import { getCookie } from "@/lib/utils";
import { useGameProvider } from "@/hooks/use-game";
import FinishHome from "../finish-screen/icons/finish-home";

export default function LeaderboardAction() {
  const navigate = useNavigate();
  const { setScreen } = useAppProvider();
  const { doResetGame } = useGameProvider();
  const lastGameResult = getCookie("mijia-game-last-result");

  function goBack() {
    if (lastGameResult) {
      setScreen("finished");
      navigate("/");
      return;
    }
    doResetGame();
    setScreen("welcome");
    navigate("/");
  }

  const content = !lastGameResult
    ? {
        text: "ke halaman awal",
        icon: <FinishHome />,
      }
    : { text: "", icon: <ArrowLeft className="font-medium" strokeWidth={3} /> };

  return (
    <div className="ls-action">
      <AppButton variant="blue" className="flex-1" onClick={goBack}>
        <div className="flex items-center justify-center gap-2.5 w-full [&_svg]:size-5">
          {content.icon}
          <div className="text-center text-base">Kembali{content.text}</div>
        </div>
      </AppButton>
    </div>
  );
}
