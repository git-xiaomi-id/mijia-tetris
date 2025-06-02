import domtoimage from "dom-to-image-more";
import { useCallback, useState } from "react";
import FinishShareBG from "./finish-share-bg";
import TetrisKulkas from "./tetris-kulkas";
import RefrigeratorName from "./refrigerator-name";
import RefrigeratorPrice from "./refrigerator-price";

interface ShareCardProps {
  isVisible: boolean;
  scale?: number;
}

function ShareCard({ isVisible, scale = 4 }: ShareCardProps) {
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
          "linear-gradient(180deg, #EDF0F5 0%, #EDF0F5 80%, #F36B22 80%, #F36B22 100%)",
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
      {/* Ultra quality title with enhanced typography */}
      <h1
        style={{
          position: "relative",
          zIndex: 10,
          fontSize: `${16 * scale}px`,
          color: "#F36B22",
          fontWeight: "700", // Slightly bolder for ultra quality
          maxWidth: `${152 * scale}px`,
          paddingTop: `${40 * scale}px`,
          paddingBottom: `${40 * scale}px`,
          whiteSpace: "pre-line",
          lineHeight: "1.2",
          letterSpacing: `${0.5 * scale}px`,
          // Ultra quality text rendering
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
          textRendering: "geometricPrecision",
          fontFeatureSettings: '"kern" 1, "liga" 0',
        }}
      >
        {"Aku berhasil\nnyusun barang\ndi Kulkas Xiaomi!"}
      </h1>

      {/* Background with ultra quality scaling */}
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
          // Ultra quality image rendering
          // imageRendering: "-webkit-optimize-contrast",
          // imageOrientation: "from-image",
          // filter: "contrast(1.05) saturate(1.1)",
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
          00:00:00
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
          @faizmasdr
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
          <div style={{ marginLeft: "-2px" }}>
            <TetrisKulkas />
          </div>
        </div>
      </div>

      {/* Ultra quality refrigerator image */}
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
            // Ultra quality image settings
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

export default function FinishShareIG() {
  const [debugResult, setDebugResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateUltraQualityImage = useCallback(async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    const startTime = Date.now();
    let tempContainer: HTMLDivElement | null = null;
    let root: any = null;

    // Ultra quality settings - optimized for maximum sharpness
    const ULTRA_SCALE = 4;
    const OUTPUT_WIDTH = 1080; // Instagram optimal
    const OUTPUT_HEIGHT = 1350; // 4:5 aspect ratio
    const PIXEL_RATIO = 3; // Ultra high pixel density

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
        root.render(<ShareCard isVisible={true} scale={ULTRA_SCALE} />);

        // Extended wait time for ultra quality
        setTimeout(async () => {
          try {
            console.log("⏳ Loading ultra quality assets...");

            // Wait for all images with extended timeout
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

            // Additional stability wait for ultra quality
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("✅ Ultra quality assets loaded");
            resolve();
          } catch (error) {
            reject(error);
          }
        }, 2000);
      });

      const shareCardElement = tempContainer.querySelector(
        "#share-card-element"
      ) as HTMLElement;
      if (!shareCardElement) throw new Error("Share card element not found");

      console.log("🎨 Converting to ULTRA QUALITY PNG...");

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
      const dataUrl = await domtoimage.toPng(
        shareCardElement,
        ultraQualityOptions
      );

      const conversionTime = Date.now() - startTime;

      console.log("🌟 ULTRA QUALITY image generated:", {
        size: `${(blob.size / 1024).toFixed(2)} KB`,
        dimensions: `${OUTPUT_WIDTH}x${OUTPUT_HEIGHT}`,
        pixelRatio: PIXEL_RATIO,
        time: `${conversionTime}ms`,
        scale: ULTRA_SCALE,
      });

      // Auto-download ultra quality image
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = `mijia-tetris-ULTRA-${OUTPUT_WIDTH}x${OUTPUT_HEIGHT}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);

      setDebugResult({
        success: true,
        dataUrl,
        blob,
        debugInfo: {
          elementFound: true,
          imagesLoaded: true,
          blobSize: blob.size,
          conversionTime,
          actualDimensions: { width: OUTPUT_WIDTH, height: OUTPUT_HEIGHT },
          scale: ULTRA_SCALE,
          pixelRatio: PIXEL_RATIO,
          qualityLevel: "ULTRA",
        },
      });
    } catch (error) {
      console.error("❌ Ultra quality generation failed:", error);
      setDebugResult({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        debugInfo: {
          elementFound: false,
          imagesLoaded: false,
          conversionTime: Date.now() - startTime,
          qualityLevel: "ULTRA",
        },
      });
    } finally {
      // Cleanup
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
  }, [isGenerating]);

  return { generateUltraQualityImage };

  // return (
  //   <>
  //     <div className="space-y-4">
  //       {/* Ultra Quality Generator */}
  //       <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border">
  //         <h2 className="text-xl font-bold mb-4 text-purple-800">
  //           🚀 Ultra Quality Generator
  //         </h2>
  //         <button
  //           onClick={generateUltraQualityImage}
  //           disabled={isGenerating}
  //           className={`px-6 py-3 rounded-lg font-semibold transition-all ${
  //             isGenerating
  //               ? "bg-gray-400 cursor-not-allowed"
  //               : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
  //           }`}
  //         >
  //           {isGenerating
  //             ? "🔄 Generating Ultra Quality..."
  //             : "🌟 Generate Ultra Quality Image"}
  //         </button>
  //       </div>

  //       {debugResult?.success && debugResult.dataUrl && !isGenerating && (
  //         <div className="p-6 bg-white rounded-lg border shadow-lg">
  //           <h3 className="text-xl font-bold mb-4 text-green-800">
  //             ✅ Image Generated Successfully!
  //           </h3>

  //           <img
  //             src={debugResult.dataUrl}
  //             alt="Generated Mijia Tetris Share Image"
  //             className="w-full max-w-sm mx-auto rounded-lg shadow border"
  //             style={{
  //               aspectRatio: "1080/1350",
  //               objectFit: "contain",
  //             }}
  //           />
  //         </div>
  //       )}

  //       {/* Processing Status */}
  //       {isGenerating && (
  //         <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
  //           <div className="flex items-center space-x-3">
  //             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
  //             <div>
  //               <h3 className="font-semibold text-blue-800">
  //                 Processing Ultra Quality Image...
  //               </h3>
  //               <p className="text-sm text-blue-600">
  //                 This may take 5-15 seconds for maximum quality
  //               </p>
  //             </div>
  //           </div>
  //           <div className="mt-3 bg-blue-200 rounded-full h-2">
  //             <div
  //               className="bg-blue-600 h-2 rounded-full animate-pulse"
  //               style={{ width: "60%" }}
  //             ></div>
  //           </div>
  //         </div>
  //       )}

  //       {/* Ultra Quality Results */}
  //       {debugResult && (
  //         <div className="p-6 bg-white rounded-lg border shadow-sm">
  //           <h3 className="text-lg font-bold mb-4">
  //             {debugResult.success
  //               ? "🌟 Ultra Quality Results"
  //               : "❌ Generation Failed"}
  //           </h3>

  //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  //             {/* Stats Panel */}
  //             <div className="space-y-3">
  //               <div className="p-4 bg-gray-50 rounded-lg">
  //                 <h4 className="font-semibold mb-3 text-gray-800">
  //                   📊 Generation Stats
  //                 </h4>
  //                 <div className="space-y-2 text-sm">
  //                   <div className="flex justify-between">
  //                     <span>Status:</span>
  //                     <span
  //                       className={`font-semibold ${
  //                         debugResult.success
  //                           ? "text-green-600"
  //                           : "text-red-600"
  //                       }`}
  //                     >
  //                       {debugResult.success ? "✅ Success" : "❌ Failed"}
  //                     </span>
  //                   </div>
  //                   <div className="flex justify-between">
  //                     <span>Quality Level:</span>
  //                     <span className="font-semibold text-purple-600">
  //                       🌟 {debugResult.debugInfo.qualityLevel || "ULTRA"}
  //                     </span>
  //                   </div>
  //                   <div className="flex justify-between">
  //                     <span>Scale Factor:</span>
  //                     <span className="font-mono text-blue-600">
  //                       {debugResult.debugInfo.scale || 4}x
  //                     </span>
  //                   </div>
  //                   <div className="flex justify-between">
  //                     <span>Pixel Ratio:</span>
  //                     <span className="font-mono text-blue-600">
  //                       {debugResult.debugInfo.pixelRatio || 3}x
  //                     </span>
  //                   </div>
  //                   <div className="flex justify-between">
  //                     <span>Processing Time:</span>
  //                     <span className="font-mono">
  //                       {debugResult.debugInfo.conversionTime}ms
  //                     </span>
  //                   </div>
  //                   {debugResult.debugInfo.actualDimensions && (
  //                     <div className="flex justify-between">
  //                       <span>Output Size:</span>
  //                       <span className="font-mono text-green-600">
  //                         {debugResult.debugInfo.actualDimensions.width}×
  //                         {debugResult.debugInfo.actualDimensions.height}px
  //                       </span>
  //                     </div>
  //                   )}
  //                   {debugResult.debugInfo.blobSize && (
  //                     <div className="flex justify-between">
  //                       <span>File Size:</span>
  //                       <span className="font-mono text-orange-600">
  //                         {(debugResult.debugInfo.blobSize / 1024).toFixed(2)}{" "}
  //                         KB
  //                       </span>
  //                     </div>
  //                   )}
  //                 </div>
  //               </div>

  //               {/* Quality Assessment */}
  //               {debugResult.success && debugResult.debugInfo.blobSize && (
  //                 <div className="p-4 bg-green-50 rounded-lg border border-green-200">
  //                   <h4 className="font-semibold mb-3 text-green-800">
  //                     🎯 Quality Assessment
  //                   </h4>
  //                   <div className="space-y-2 text-sm">
  //                     <div className="flex justify-between">
  //                       <span>Image Quality:</span>
  //                       <span className="font-semibold">
  //                         {debugResult.debugInfo.blobSize > 300000
  //                           ? "🌟 Exceptional"
  //                           : debugResult.debugInfo.blobSize > 200000
  //                           ? "⭐ Excellent"
  //                           : debugResult.debugInfo.blobSize > 100000
  //                           ? "✨ Very Good"
  //                           : "📱 Good"}
  //                       </span>
  //                     </div>
  //                     <div className="flex justify-between">
  //                       <span>Instagram Ready:</span>
  //                       <span className="text-green-600 font-semibold">
  //                         ✅ Optimized
  //                       </span>
  //                     </div>
  //                     <div className="flex justify-between">
  //                       <span>Print Quality:</span>
  //                       <span className="text-green-600 font-semibold">
  //                         ✅ High DPI
  //                       </span>
  //                     </div>
  //                     <div className="flex justify-between">
  //                       <span>Text Clarity:</span>
  //                       <span className="text-green-600 font-semibold">
  //                         ✅ Crisp
  //                       </span>
  //                     </div>
  //                   </div>
  //                 </div>
  //               )}

  //               {/* Error Display */}
  //               {debugResult.error && (
  //                 <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
  //                   <h4 className="font-semibold text-red-800 mb-2">
  //                     ❌ Error Details
  //                   </h4>
  //                   <p className="text-sm text-red-600">{debugResult.error}</p>
  //                 </div>
  //               )}
  //             </div>

  //             {/* Preview Panel */}
  //             {debugResult.dataUrl && (
  //               <div className="space-y-3">
  //                 <div className="p-4 bg-gray-50 rounded-lg">
  //                   <h4 className="font-semibold mb-3 text-gray-800">
  //                     📸 Ultra Quality Preview
  //                   </h4>
  //                   <div className="bg-white p-4 rounded border shadow-inner">
  //                     <img
  //                       src={debugResult.dataUrl}
  //                       alt="Ultra Quality Generated Image"
  //                       className="w-full max-w-xs mx-auto rounded border shadow-sm"
  //                       style={{
  //                         aspectRatio: "1080/1350",
  //                         objectFit: "contain",
  //                       }}
  //                     />
  //                     <p className="text-xs text-gray-500 mt-3 text-center">
  //                       Preview scaled for display • Actual output is full{" "}
  //                       {debugResult.debugInfo.actualDimensions?.width}×
  //                       {debugResult.debugInfo.actualDimensions?.height}{" "}
  //                       resolution
  //                     </p>
  //                   </div>
  //                 </div>

  //                 {/* Download Actions */}
  //                 <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
  //                   <h4 className="font-semibold mb-3 text-blue-800">
  //                     💾 Download Options
  //                   </h4>
  //                   <div className="space-y-2">
  //                     <button
  //                       onClick={() => {
  //                         if (debugResult.blob) {
  //                           const url = URL.createObjectURL(debugResult.blob);
  //                           const link = document.createElement("a");
  //                           link.href = url;
  //                           link.download = `mijia-tetris-ultra-${Date.now()}.png`;
  //                           link.click();
  //                           URL.revokeObjectURL(url);
  //                         }
  //                       }}
  //                       className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
  //                     >
  //                       📱 Download for Instagram
  //                     </button>
  //                     <button
  //                       onClick={() => {
  //                         if (debugResult.dataUrl) {
  //                           const link = document.createElement("a");
  //                           link.href = debugResult.dataUrl;
  //                           link.download = `mijia-tetris-ultra-dataurl-${Date.now()}.png`;
  //                           link.click();
  //                         }
  //                       }}
  //                       className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
  //                     >
  //                       🖼️ Download PNG
  //                     </button>
  //                   </div>
  //                 </div>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       )}

  //       {/* Technical Details */}
  //       <details className="p-4 bg-gray-50 rounded-lg border">
  //         <summary className="font-semibold text-gray-800 cursor-pointer hover:text-gray-600">
  //           🔧 Technical Implementation Details
  //         </summary>
  //         <div className="mt-4 space-y-2 text-sm text-gray-600">
  //           <div>
  //             <strong>Rendering Engine:</strong> React DOM with high-DPI scaling
  //           </div>
  //           <div>
  //             <strong>Image Processing:</strong> dom-to-image-more with canvas
  //             optimization
  //           </div>
  //           <div>
  //             <strong>Font Rendering:</strong> Geometric precision with
  //             antialiasing
  //           </div>
  //           <div>
  //             <strong>Color Space:</strong> sRGB with enhanced contrast
  //           </div>
  //           <div>
  //             <strong>Compression:</strong> PNG with optimal quality settings
  //           </div>
  //           <div>
  //             <strong>Memory Usage:</strong> ~50-100MB during processing
  //             (automatically cleaned)
  //           </div>
  //         </div>
  //       </details>
  //     </div>
  //   </>
  // );
}
