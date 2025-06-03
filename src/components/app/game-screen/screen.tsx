import { useAppProvider } from "@/hooks/use-context";
import { useGameProvider } from "@/hooks/use-game";
import { Instagram } from "lucide-react";
import GameTimer from "./game-timer";
import ButtonTimer from "./button-timer";
import OnboardingModal from "./onboarding-modal";
import ItemDock from "./item-dock";
import OnboardingOverlay from "./onboarding-overlay";
import GameInteract from "./game-interact";

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
  const { screenStep, screenSteps, assets, runScenario, onboardingOpen } =
    useGameProvider();
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
            <GameTimer />
            <ButtonTimer />
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
              <div className="absolute left-0 top-0 size-full" key={asset.key}>
                <div className="relative size-full">
                  <img
                    key={asset.key}
                    alt={asset?.key || ""}
                    src={asset?.src || ""}
                    className={[
                      "h-full object-contain block mx-auto gs-image-wrap",
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

        {/* Onboarding Parts */}
        {onboardingOpen && (
          <>
            {/* Overlay */}
            <div className="absolute bg-[#22222298] size-full" />

            {/* Modal */}
            <OnboardingModal />
          </>
        )}
      </div>
    </div>
  );
}
