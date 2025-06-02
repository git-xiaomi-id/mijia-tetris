import { useGameProvider } from "@/hooks/use-game";

export default function GameInteract() {
  const { screenStep, screenSteps, assets } = useGameProvider();
  const asset = assets[assets.length - 1];

  return (
    screenSteps.findIndex((n) => n === screenStep) >= 3 && (
      <div className="absolute left-0 top-0 size-full">
        <div className="size-full relative border border-red-500 border-dashed">
          <img
            key={asset.key}
            alt={asset?.key || ""}
            src={asset?.src || ""}
            className={[
              "h-full object-contain block mx-auto transition-all",
              screenStep === "game" ? "scale-110" : "",
            ].join(" ")}
          />
          {screenStep === "game" && (
            <>
              <button
                type="button"
                className="gs-mask-door-dashed door-left "
              />
              <button
                type="button"
                className="gs-mask-door-dashed door-middle  "
              />
              <button
                type="button"
                className="gs-mask-door-dashed door-middle2  "
              />
              <button
                type="button"
                className="gs-mask-door-dashed door-middle3  "
              />
              <button
                type="button"
                className="gs-mask-door-dashed door-right  "
              />

              <button
                type="button"
                className="gs-mask-door-dashed-middle door-left  !bg-blue-600"
              />
              <button
                type="button"
                className="gs-mask-door-dashed-middle door-right  "
              />

              <button
                type="button"
                className="gs-mask-door-dashed-bottom left"
              />
              <button
                type="button"
                className="gs-mask-door-dashed-bottom right"
              />

              <button
                type="button"
                className="gs-mask-door-dashed-freezerbottom left"
              />
              <button
                type="button"
                className="gs-mask-door-dashed-freezerbottom right"
              />

              {/* <div className="gs-mask-door-freezerbottom sec2 left" />
              <div className="gs-mask-door-freezerbottom sec2 right" /> */}
            </>
          )}
        </div>
      </div>
    )
  );
}
