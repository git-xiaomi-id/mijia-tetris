import { useAppProvider } from "@/hooks/use-context";
import LeaderboardAction from "./leaderboard-action";
import LeaderboardHeading from "./leaderboard-heading";
import LeaderboardList from "./leaderboard-list";
import "./leaderboard-screen.css";
import LeaderboardShiny from "./leaderboard-shiny";
import AppModal from "../welcome-screen/modal";
import { useState, useEffect, useCallback } from "react";
import { useGameProvider } from "@/hooks/use-game";
import { useNavigate } from "react-router";

function LeaderboardIllustration() {
  return (
    <div className="absolute top-0 left-0 w-full aspect-square bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className="absolute -z-10">
        <LeaderboardShiny />
      </div>
      <div className="ls-shiny-gradient absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <img
        src="/illustration/trophy.webp"
        alt="Trophy illustration"
        className="max-w-40 max-h-40 object-contain animate-headscaling"
        loading="lazy"
      />
      <img
        src="/mi-bunny/mi-bunny-cool.webp"
        alt="Mi Bunny Cool"
        className="absolute right-5 translate-y-1/2 rotate-12 max-w-20 max-h-20 object-contain animate-headshaking-offset-right"
        loading="lazy"
      />
      <img
        src="/mi-bunny/mi-bunny-star.webp"
        alt="Mi Bunny Star"
        className="absolute left-5 translate-y-1/2 -rotate-12 max-w-20 max-h-20 object-contain animate-headshaking-offset-left"
        loading="lazy"
      />
      <img
        src="/mi-bunny/mi-bunny-fun.webp"
        alt="Mi Bunny Fun"
        className="absolute bottom-5 max-w-20 max-h-20 object-contain animate-headshaking-slow"
        loading="lazy"
      />
    </div>
  );
}

export default function LeaderboardScreen() {
  const { user, userLoading } = useAppProvider();
  const navigate = useNavigate();
  const { setTime, setTimerStep, setScreenStep, setOnboardingStep } =
    useGameProvider();
  const { setScreen } = useAppProvider();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  function doResetGame() {
    setTime(0);
    setTimerStep("pause");
    setScreenStep("intro1");
    setOnboardingStep(0);
  }

  function goHome() {
    doResetGame();
    setScreen("welcome");
    navigate("/");
  }

  useEffect(() => {
    if (!user && !userLoading) {
      setShowLoginModal(true);
    }
  }, [user, userLoading]);

  const handleModalClose = useCallback((open: boolean) => {
    setShowLoginModal(open);
    goHome();
  }, []);

  const handleLoginConfirm = useCallback(() => {
    setShowLoginModal(false);
    goHome();
  }, []);

  return (
    <div className="leaderboard-screen relative h-full flex flex-col">
      <div className="ls-heading sticky top-8 z-10">
        <LeaderboardHeading />
      </div>

      <div className="flex-1 relative overflow-hidden">
        <LeaderboardIllustration />

        <div className="relative z-20 h-full overflow-y-auto px-5 ls-scrollable">
          <div className="h-[400px] w-full" />
          <LeaderboardList />
        </div>
      </div>

      <div className="ls-action-container sticky bottom-0 z-10">
        <LeaderboardAction />
      </div>
      {!user && (
        <AppModal
          open={showLoginModal}
          title="Kamu terdeteksi belum login"
          description="Untuk mengakses halaman ini, kamu harus login dulu ya. Yuk login ke akun kamu dan main game sekarang!"
          image="/mi-bunny/mi-bunny-shock.webp"
          animationImage="animate-headshaking"
          textConfirm="Oke, login akun"
          onOpenChange={handleModalClose}
          onCancelClick={handleLoginConfirm}
        />
      )}
    </div>
  );
}
