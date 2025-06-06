import { useAppProvider } from "@/hooks/use-context";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import AppButton from "../button";

export default function LeaderboardAction() {
  const navigate = useNavigate();
  const { setScreen } = useAppProvider();

  function goBack() {
    setScreen("finished");
    navigate("/");
  }

  return (
    <div className="ls-action">
      <AppButton variant="blue" className="flex-1" onClick={goBack}>
        <div className="flex items-center justify-center gap-2.5 w-full [&_svg]:size-5">
          <ArrowLeft className="font-medium" strokeWidth={3} />
          <div className="text-center text-base">Kembali</div>
        </div>
      </AppButton>
    </div>
  );
}
