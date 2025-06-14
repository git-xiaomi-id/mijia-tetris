import { useAppProvider } from "@/hooks/use-context";
import { useGameProvider } from "@/hooks/use-game";
import { Instagram, Loader } from "lucide-react";
import OnboardingModal from "./onboarding-modal";
import ItemDock from "./item-dock";
import OnboardingOverlay from "./onboarding-overlay";
import GameInteract from "./game-interact";
import TimeSet from "./time-set";

function UsernameDisplay({ username }: { username: string }) {
  return (
    <div className="gs-usernameIg max-w-[204px]">
      <div className="gs-usernameIg-icon">
        <Instagram />
      </div>
      <div className="font-[520] truncate">@{username}</div>
    </div>
  );
}

export default function GameScreenContent() {
  const {
    screenStep,
    screenSteps,
    assets,
    runScenario,
    onboardingOpen,
    loadingSubmit,
  } = useGameProvider();
  const { user } = useAppProvider();

  return (
    <div className="h-screen relative flex flex-col items-start">
      {/* JANGAN ADA FIXED DLL, GRID COL BAGI RATA */}
      <div className="gs-gamearea">
        {/* 1 */}
        <div className="gs-toparea z-10">
          <UsernameDisplay username={user?.username_ig ?? ""} />
          <div
            className={[
              "flex flex-col items-end gap-4 relative h-14",
              screenStep?.includes("game")
                ? ""
                : "opacity-0 pointer-events-none",
            ].join(" ")}
          >
            <TimeSet />
          </div>
        </div>

        {/* 2 */}
        <div className="relative w-full flex flex-1 items-center justify-center">
          {assets.map((asset, index) => {
            const isKey = screenStep === asset.key;
            const isGameList = false;
            //   (screenStep === "onboarding" || screenStep === "game") &&
            // const isGameList =
            //   screenSteps.findIndex((n) => n === screenStep) >= 2 &&
            //   screenSteps.findIndex((n) => n === asset.key) >= 2;

            return (
              <div
                className="absolute left-0 top-0 size-full   "
                key={asset.key}
              >
                <div className="relative size-full">
                  <img
                    key={asset.key}
                    alt={asset?.key || ""}
                    src={asset?.src || ""}
                    className={[
                      "gs-image-wrap",
                      `gs-image-wrap-i${index + 1}`,
                      isKey || isGameList ? "active" : "hidden",
                    ].join(" ")}
                    onLoad={index === 0 ? runScenario : undefined}
                  />
                </div>
              </div>
            );
          })}

          {/* Only shown in 'game' screenStep */}
          <GameInteract />

          {/* Only shown in 'onboarding' screenStep */}
          <OnboardingOverlay />
        </div>

        {/* 3 */}
        <div
          className={`gs-item-drawer ${
            screenSteps.indexOf(screenStep) >= 2 ? "shown" : ""
          }`}
        >
          <ItemDock />
        </div>

        {loadingSubmit && (
          <>
            <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
              <Loader className="size-6 animate-spin text-white" />
            </div>
          </>
        )}

        {/* Onboarding Parts */}
        {onboardingOpen && (
          <>
            <div className="absolute bg-[#22222298] size-full" />
            <OnboardingModal />
          </>
        )}
      </div>
    </div>
  );
}
