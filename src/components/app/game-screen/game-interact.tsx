import { useGameProvider } from "@/hooks/use-game";

export default function GameInteract() {
  const { screenStep, screenSteps, assets } = useGameProvider();
  const asset = assets[assets.length - 1];

  return (
    screenSteps.findIndex((n) => n === screenStep) >= 2 && (
      <div className="absolute left-0 top-0 size-full">
        <img
          key={asset.key}
          alt={asset?.key || ""}
          src={asset?.src || ""}
          className="h-full object-contain block mx-auto"
        />
      </div>
    )
  );
}
