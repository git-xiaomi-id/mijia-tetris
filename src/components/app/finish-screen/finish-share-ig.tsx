import domtoimage from "dom-to-image-more";
import { useCallback, useState } from "react";
import FinishShareBG from "./finish-share-bg";
import RefrigeratorName from "./refrigerator-name";
import RefrigeratorPrice from "./refrigerator-price";
import { formatTime } from "@/utils/format-time";
import { toast } from "sonner";

interface ShareCardProps {
  isVisible: boolean;
  time?: number;
  username?: string | null;
  scale?: number;
}

function ShareCard({ isVisible, scale = 4, time, username }: ShareCardProps) {
  const baseWidth = 288;
  const baseHeight = 400;
  const scaledWidth = baseWidth * scale;
  const scaledHeight = baseHeight * scale;

  return (
    <div
      id="share-card-element"
      className={`relative text-white flex flex-col items-start justify-start ${
        isVisible ? "block" : "hidden"
      }`}
      style={{
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
        padding: `${20 * scale}px`,
        transform: `scale(${1 / scale})`,
        transformOrigin: "top left",
        background:
          "linear-gradient(180deg, #EDF0F5 0%, #EDF0F5 80%, white 80%, white 100%)",
        fontFamily:
          "MiSans, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        // Ultra quality font rendering
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        textRendering: "geometricPrecision",
        fontOpticalSizing: "auto",
        fontVariantLigatures: "none",
      }}
    >
      <div
        style={{
          paddingTop: `${20 * scale}px`,
          paddingBottom: `${20 * scale}px`,
          color: "#F36B22",
          fontWeight: "630",
          maxWidth: `${152 * scale}px`,
          position: "relative",
          letterSpacing: `${0.5 * scale}px`,
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "geometricPrecision",
          fontFeatureSettings: '"kern" 1, "liga" 0',
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: `${24 * scale}px`,
            whiteSpace: "pre-line",
            lineHeight: "1.2",
          }}
        >
          Yes!
        </h1>
        <h2
          style={{
            fontSize: `${16 * scale}px`,
            maxWidth: `${152 * scale}px`,
            whiteSpace: "pre-line",
            lineHeight: "1.2",
          }}
        >
          {"Aku berhasil\nnyusun barang\ndi Kulkas Xiaomi!"}
        </h2>
      </div>

      <div
        style={{
          position: "absolute",
          right: "0px",
          top: "0px",
          zIndex: 0,
          transform: `scale(${scale})`,
          transformOrigin: "top right",
        }}
      >
        <FinishShareBG />
      </div>

      {/* Ultra quality Mi Bunny image */}
      <img
        src="/mi-bunny/mi-bunny-cool.png"
        alt="Mi Bunny Cool"
        style={{
          position: "absolute",
          right: `${18 * scale}px`,
          top: "17%",
          width: `${120 * scale}px`,
          height: `${120 * scale}px`,
          objectFit: "contain",
          zIndex: 20,
        }}
        crossOrigin="anonymous"
        loading="eager"
      />

      {/* Ultra quality badges */}
      <div className="relative z-10">
        <div
          style={{
            background: "#378CE1",
            color: "white",
            padding: `${4 * scale}px ${8 * scale}px`,
            borderRadius: `${8 * scale}px`,
            fontSize: `${20 * scale}px`,
            fontWeight: "600",
            lineHeight: `${20 * scale}px`,
            marginBottom: `${8 * scale}px`,
            display: "block",
            WebkitFontSmoothing: "antialiased",
            textRendering: "geometricPrecision",
          }}
        >
          {formatTime(time || 0)}
        </div>
        <div
          style={{
            background: "rgba(243,107,34,0.9)",
            color: "white",
            padding: `${4 * scale}px ${6 * scale}px`,
            borderRadius: `${4 * scale}px`,
            fontSize: `${8 * scale}px`,
            fontWeight: "500",
            lineHeight: `${8 * scale}px`,
            display: "block",
            WebkitFontSmoothing: "antialiased",
            textRendering: "geometricPrecision",
          }}
        >
          @{username}
        </div>
      </div>

      {/* Ultra quality bottom text */}
      <div
        style={{
          position: "absolute",
          right: "15%",
          bottom: "35%",
          transform: `scale(${scale})`,
          transformOrigin: "bottom right",
        }}
      >
        <div style={{ position: "relative", lineHeight: "1" }}>
          <p
            style={{
              margin: "0",
              padding: "0",
              lineHeight: "1",
              fontSize: "8px",
              color: "#5F5F5F",
              fontWeight: "400",
              WebkitFontSmoothing: "antialiased",
              textRendering: "geometricPrecision",
            }}
          >
            Ayo ikut main di:
          </p>
          <p
            style={{
              margin: "0",
              padding: "0",
              lineHeight: "1",
              fontSize: "16px",
              fontWeight: "700",
              color: "#378CE1",
              WebkitFontSmoothing: "antialiased",
              textRendering: "geometricPrecision",
            }}
          >
            tetriskulkas.com
          </p>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "0",
          bottom: "16%",
          width: "100%",
          height: "100%",
          zIndex: 21,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <img
          src="/illustration/refrigerator-side-view.webp"
          alt="Refrigerator"
          style={{
            position: "absolute",
            bottom: "0%",
            left: "5%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            zIndex: 20,
            transform: `scale(3)`,
            transformOrigin: "bottom left",
            imageRendering: "-webkit-optimize-contrast",
            filter: "contrast(1.02) saturate(1.05)",
          }}
          crossOrigin="anonymous"
          loading="eager"
        />
        <div
          style={{
            position: "absolute",
            bottom: "8%",
            left: "43%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            zIndex: 20,
            transform: `scale(3)`,
          }}
        >
          <div className="-ml-1.5">
            <RefrigeratorName />
          </div>
          <RefrigeratorPrice />
        </div>
        {/* <img
          src="/illustration/refrigerator.png"
          alt="Refrigerator"
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            zIndex: 20,
            // Ultra quality image settings
            imageRendering: "-webkit-optimize-contrast",
            filter: "contrast(1.02) saturate(1.05)",
          }}
          crossOrigin="anonymous"
          loading="eager"
        /> */}
      </div>
    </div>
  );
}

export default function FinishShareIG({
  time,
  username,
}: Pick<ShareCardProps, "time" | "username">) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateUltraQualityImage = useCallback(async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    let tempContainer: HTMLDivElement | null = null;
    let root: any = null;

    const ULTRA_SCALE = 4;
    const OUTPUT_WIDTH = 1080; // Instagram optimal
    const OUTPUT_HEIGHT = 1350; // 4:5 aspect ratio
    const PIXEL_RATIO = 3;

    try {
      console.log("🚀 Generating ULTRA QUALITY image...");

      // Create ultra quality container
      tempContainer = document.createElement("div");
      tempContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: -${OUTPUT_WIDTH * 2}px;
        width: ${OUTPUT_WIDTH * PIXEL_RATIO}px;
        height: ${OUTPUT_HEIGHT * PIXEL_RATIO}px;
        z-index: 9999;
        background: white;
        overflow: hidden;
        opacity: 1;
        visibility: visible;
        transform: scale(${1 / PIXEL_RATIO});
        transform-origin: top left;
      `;
      document.body.appendChild(tempContainer);

      const { createRoot } = await import("react-dom/client");
      root = createRoot(tempContainer);

      // Render ultra quality component
      await new Promise<void>((resolve, reject) => {
        root.render(
          <ShareCard
            isVisible={true}
            scale={ULTRA_SCALE}
            time={time}
            username={username}
          />
        );

        setTimeout(async () => {
          try {
            const images = Array.from(tempContainer!.querySelectorAll("img"));
            await Promise.allSettled(
              images.map(
                (img) =>
                  new Promise((resolve) => {
                    if (img.complete && img.naturalWidth > 0) {
                      resolve(true);
                    } else {
                      const handleLoad = () => {
                        img.removeEventListener("load", handleLoad);
                        img.removeEventListener("error", handleLoad);
                        resolve(true);
                      };
                      img.addEventListener("load", handleLoad);
                      img.addEventListener("error", handleLoad);
                    }
                  })
              )
            );

            await new Promise((resolve) => setTimeout(resolve, 1000));
            resolve();
          } catch (error) {
            reject(error);
          }
        }, 1000);
      });

      const shareCardElement = tempContainer.querySelector(
        "#share-card-element"
      ) as HTMLElement;

      if (!shareCardElement) throw new Error("Share card element not found");

      // Ultra quality conversion settings
      const ultraQualityOptions = {
        width: OUTPUT_WIDTH,
        height: OUTPUT_HEIGHT,
        quality: 1.0,
        pixelRatio: PIXEL_RATIO,
        bgcolor: "#EDF0F5",
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
          imageRendering: "-webkit-optimize-contrast",
          WebkitImageSmoothing: "high",
          fontSmooth: "always",
          textRendering: "geometricPrecision",
          border: "none",
          outline: "none",
          boxShadow: "none",
        },
        filter: (node: Node) => {
          if (node.nodeType === Node.COMMENT_NODE) return false;

          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;

            // Ultra quality style optimization
            Object.assign(element.style, {
              imageRendering: "-webkit-optimize-contrast",
              WebkitImageSmoothing: "high",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textRendering: "geometricPrecision",
              fontFeatureSettings: '"kern" 1',
              border: "none",
              outline: "none",
              boxShadow: "none",
            });
          }

          return true;
        },
        cacheBust: true,
        copyDefaultStyles: true,
        useCORS: true,
        allowTaint: false,
      };

      // Generate ultra quality blob
      const blob = await domtoimage.toBlob(
        shareCardElement,
        ultraQualityOptions
      );

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `mijia-tetris-ULTRA-${OUTPUT_WIDTH}x${OUTPUT_HEIGHT}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);

      const isMobile =
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      if (isMobile) {
        setTimeout(() => {
          try {
            window.location.href = "instagram://story-camera";
          } catch (error) {
            toast.success(
              "Image saved! Open Instagram and share from your gallery 📱"
            );
            throw error;
          }
        }, 1500);
      } else {
        toast.success(
          "Image saved! Open Instagram and share from your gallery 📱"
        );
      }
    } catch (error) {
      toast.error("❌ Error generating image");
      throw error;
    } finally {
      setTimeout(() => {
        try {
          if (root) root.unmount();
          if (tempContainer?.parentNode)
            document.body.removeChild(tempContainer);
        } catch (cleanupError) {
          console.warn("🧹 Cleanup error:", cleanupError);
        }
      }, 100);

      setIsGenerating(false);
    }
  }, [isGenerating, time, username]);

  return { generateUltraQualityImage };
}
