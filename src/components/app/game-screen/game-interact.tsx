import { useGameProvider } from "@/hooks/use-game";

export default function GameInteract() {
  const { screenStep, screenSteps, assets } = useGameProvider();
  const asset = assets[assets.length - 1];

  return (
    screenSteps.findIndex((n) => n === screenStep) >= 2 && (
      <div className="absolute left-0 top-0 size-full">
        <div className="size-full relative border border-red-500 border-dashed">
          <img
            key={asset.key}
            alt={asset?.key || ""}
            src={asset?.src || ""}
            className="h-full object-contain block mx-auto"
          />
          {screenStep === "game" && (
            <>
              <div className="gs-mask-door-dashed door-left " />
              <div className="gs-mask-door-dashed door-middle  " />
              <div className="gs-mask-door-dashed door-right  " />

              <div className="gs-mask-door-dashed-middle door-left  " />
              <div className="gs-mask-door-dashed-middle door-right  " />

              <div className="gs-mask-door-dashed-bottom left" />
              <div className="gs-mask-door-dashed-bottom right" />

              <div className="gs-mask-door-dashed-freezerbottom left" />
              <div className="gs-mask-door-dashed-freezerbottom right" />

              {/* <div className="gs-mask-door-freezerbottom sec2 left" />
              <div className="gs-mask-door-freezerbottom sec2 right" /> */}
            </>
          )}
        </div>
      </div>
    )
  );
}
