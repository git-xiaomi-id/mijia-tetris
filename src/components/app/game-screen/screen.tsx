import { useAppProvider } from "@/hooks/use-context";
import { useGameProvider } from "@/hooks/use-game";
import { Instagram } from "lucide-react";
import GameTimer from "./game-timer";
import ButtonTimer from "./button-timer";
import OnboardingModal from "./onboarding-modal";
import ItemDock from "./item-dock";

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
    onboardingStep,
    onboardingOpen,
  } = useGameProvider();
  const { user } = useAppProvider();

  return (
    <div className="h-screen relative flex flex-col items-start">
      {/* JANGAN ADA FIXED DLL, GRID COL BAGI RATA */}
      <div className="gs-gamearea">
        {/* 1 */}
        <div className="gs-toparea">
          <UsernameDisplay username={user?.username_ig ?? ""} />
          {screenSteps.indexOf(screenStep)}
          <div
            className={[
              "flex flex-col items-end gap-4 relative h-14",
              screenStep.includes("game")
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
          {screenStep.includes("intro") ? (
            assets.map((asset, index) => (
              <img
                key={asset.key}
                alt={asset?.key || ""}
                src={asset?.src || ""}
                className={[
                  "size-full object-contain  gs-image-wrap absolute left-0 top-0",
                  screenStep === asset.key ? "active" : "hidden",
                ].join(" ")}
                onLoad={index === 0 ? runScenario : undefined}
              />
            ))
          ) : (
            // Onboarding image
            <img
              key={assets[assets.length - 1].key}
              alt={assets[assets.length - 1]?.key || ""}
              src={assets[assets.length - 1]?.src || ""}
              className="size-full object-contain  gs-image-wrap absolute left-0 top-0 active"
            />
          )}

          {onboardingStep === 1 && (
            <>
              <div className="z-[1] w-full h-full relative">
                <div className="gs-mask-door-top door-left  " />
                <div className="gs-mask-door-top door-middle  " />
                <div className="gs-mask-door-top door-right  " />
                <div className="gs-mask-door-top door-right  " />

                <div className="gs-mask-door-middle door-left  " />
                <div className="gs-mask-door-middle door-right  " />

                <div className="gs-mask-door-bottom left" />
                <div className="gs-mask-door-bottom right" />

                <div className="gs-mask-door-freezerbottom left" />
                <div className="gs-mask-door-freezerbottom right" />

                <div className="gs-mask-door-freezerbottom sec2 left" />
                <div className="gs-mask-door-freezerbottom sec2 right" />
              </div>
            </>
          )}
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
