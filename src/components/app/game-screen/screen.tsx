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
          {assets.map((asset, index) => {
            const isKey = screenStep === asset.key;
            const isGameList =
              screenStep === "game" &&
              screenSteps.findIndex((n) => n === asset.key) >= 2;
            return (
              <img
                key={asset.key}
                alt={asset?.key || ""}
                src={asset?.src || ""}
                className={[
                  "size-full object-contain  gs-image-wrap absolute left-0 top-0",
                  isKey || isGameList ? "active" : "hidden",
                ].join(" ")}
                onLoad={index === 0 ? runScenario : undefined}
              />
            );
          })}

          {screenStep === "game" && (
            <div className="size-full absolute left-0 top-0">
              <div className="relative size-full border border-blue-500">
                {/* Left Top Door */}
                <div className="absolute top-4 left-[40%] -translate-x-[70px] bg-white/80 w-12 h-52 border-2 border-dashed border-green-600"></div>
                {/* Right Top Door */}
                <div className="absolute top-4 right-[40%] translate-x-[70px] bg-white/80 w-12 h-52 border-2 border-dashed border-green-600"></div>

                {/* Middle Top Door 1 */}
                <div className="absolute top-8 left-[50%] -translate-x-[50%] bg-white/80 w-32 h-8 border-2 border-dashed border-green-600"></div>
                {/* Middle Top Door 2 */}
                <div className="absolute top-[72px] left-[50%] -translate-x-[50%] bg-white/80 w-32 h-8 border-2 border-dashed border-green-600"></div>
                {/* Middle Top Door 3 */}
                <div className="absolute top-[114px] left-[50%] -translate-x-[50%] bg-white/80 w-32 h-8 border-2 border-dashed border-green-600"></div>

                {/* Middle Left Door */}
                <div className="absolute top-[188px] left-[36%] bg-white/80 w-[66px] h-9 border-2 border-dashed border-green-600"></div>
                {/* Middle Right Door */}
                <div className="absolute top-[188px] right-[35.75%] bg-white/80 w-[66px] h-9 border-2 border-dashed border-green-600"></div>
              </div>
            </div>
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
