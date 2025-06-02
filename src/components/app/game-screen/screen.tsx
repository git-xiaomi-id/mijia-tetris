import { useAppProvider } from "@/hooks/use-context";
import { useGameProvider } from "@/hooks/use-game";
import { Instagram } from "lucide-react";
import GameTimer from "./game-timer";
import ButtonTimer from "./button-timer";
import OnboardingModal from "./onboarding-modal";
import ItemDock from "./item-dock";
// import GameInteract from "./game-interact";

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
  console.log({ screenStep });
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
            // const isGameList = false;
            //   (screenStep === "onboarding" || screenStep === "game") &&
            const isGameList =
              screenSteps.findIndex((n) => n === screenStep) >= 2 &&
              screenSteps.findIndex((n) => n === asset.key) >= 2;

            return (
              <div className="absolute left-0 top-0 size-full" key={asset.key}>
                <div className="relative size-full">
                  <img
                    key={asset.key}
                    alt={asset?.key || ""}
                    src={asset?.src || ""}
                    className={[
                      "h-full object-contain block mx-auto  gs-image-wrap border border-yellow-500",
                      isKey || isGameList ? "active" : "hidden",
                    ].join(" ")}
                    onLoad={index === 0 ? runScenario : undefined}
                  />
                </div>
              </div>
            );
          })}

          {/* {screenStep === "game" && <GameInteract />} */}

          {screenStep === "onboarding" && (
            <div className="z-[1] absolute left-0 top-0 size-full border border-green-800">
              <div className="w-fit h-full relative mx-auto">
                <img
                  key={assets[assets.length - 1].key}
                  alt={assets[assets.length - 1]?.key || ""}
                  src={assets[assets.length - 1]?.src || ""}
                  className={[
                    "h-full object-contain block mx-auto border border-yellow-500 opacity-0",
                  ].join(" ")}
                />
                {onboardingStep === 1 && (
                  <>
                    <div className="gs-mask-door-top door-left " />
                    <div className="gs-mask-door-top door-middle  " />
                    <div className="gs-mask-door-top door-right  " />

                    <div className="gs-mask-door-middle door-left  " />
                    <div className="gs-mask-door-middle door-right  " />

                    <div className="gs-mask-door-bottom left" />
                    <div className="gs-mask-door-bottom right" />

                    <div className="gs-mask-door-freezerbottom left" />
                    <div className="gs-mask-door-freezerbottom right" />

                    {/* <div className="gs-mask-door-freezerbottom sec2 left" />
                    <div className="gs-mask-door-freezerbottom sec2 right" /> */}
                  </>
                )}
              </div>
            </div>
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
