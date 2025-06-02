import { useGameProvider } from "@/hooks/use-game";

export default function OnboardingOverlay() {
  const { screenStep, onboardingStep, assets } = useGameProvider();

  const asset = assets[assets.length - 1];

  return (
    screenStep === "onboarding" && (
      <div className="z-[1] absolute left-0 top-0 size-full">
        <div className="w-fit h-full relative mx-auto">
          <img
            key={asset.key}
            alt={asset?.key || ""}
            src={asset?.src || ""}
            className="h-full object-contain block mx-auto opacity-0"
          />
          {onboardingStep === 1 && (
            <>
              <div className="gs-mask-door-top door-left " />
              <div className="gs-mask-door-top door-middle  " />
              <div className="gs-mask-door-top door-right  " />

              <div className="gs-mask-door-middle door-left " />
              <div className="gs-mask-door-middle door-right  " />

              <div className="gs-mask-door-bottom left" />
              <div className="gs-mask-door-bottom right" />

              <div className="gs-mask-door-freezerbottom left" />
              <div className="gs-mask-door-freezerbottom right" />

              <div className="gs-mask-door-freezerbottom sec2 left" />
              <div className="gs-mask-door-freezerbottom sec2 right" />
            </>
          )}
        </div>
      </div>
    )
  );
}
