import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

// Function to detect developer tools
const isDevToolsOpen = () => {
  const threshold = 160;

  // Method 1: Check window size difference
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;

  // Method 2: Check console object
  const devtools = { open: false };
  const element = new Image();
  Object.defineProperty(element, "id", {
    get: function () {
      devtools.open = true;
    },
  });
  // Set up continuous console logging when devtools are detected
  if (devtools.open) {
    console.log("%c", element);
    setInterval(() => {
      console.log("Don't Try. I watch u bro 🫠");
    }, 3000);
  }

  return widthThreshold || heightThreshold || devtools.open;
};

// Function to detect if user is on desktop
const isDesktop = () => {
  // Skip desktop detection in development environment
  if (import.meta.env.DEV) return false;

  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    "mobile",
    "android",
    "iphone",
    "ipad",
    "ipod",
    "blackberry",
    "windows phone",
    "opera mini",
  ];

  // Check if any mobile keywords exist in user agent
  const isMobile = mobileKeywords.some((keyword) =>
    userAgent.includes(keyword)
  );

  // Also check screen width as additional detection
  const screenWidth = window.screen.width;
  const isSmallScreen = screenWidth <= 768;

  // Check if dev tools are open (indicates desktop usage)
  const devToolsDetected = isDevToolsOpen();

  return !isMobile && (!isSmallScreen || devToolsDetected);
};

// Enhanced protection with continuous monitoring
const startProtection = () => {
  // Disable right-click context menu
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    return false;
  });

  // Disable common keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    if (
      e.keyCode === 123 ||
      (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) ||
      (e.ctrlKey && e.keyCode === 85)
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Continuous monitoring
  setInterval(() => {
    if (isDesktop()) {
      window.location.reload();
    }
  }, 3000);
};

// Desktop blocking component
const DesktopBlocker = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#1a1a2e",
      color: "#ffffff",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      padding: "20px",
    }}
  >
    <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
      📱 Mobile Only App
    </h1>
    <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
      Aplikasi ini hanya dapat diakses melalui perangkat mobile.
    </p>
    <p style={{ fontSize: "1rem", color: "#cccccc" }}>
      Silakan buka menggunakan smartphone atau tablet Anda.
    </p>
    <div style={{ marginTop: "2rem", fontSize: "0.8rem", color: "#999" }}>
      <p>⚠️ Developer tools terdeteksi</p>
      <p>Akses melalui inspect browser tidak diizinkan</p>
    </div>
  </div>
);

// Initialize protection
if (!isDesktop()) {
  startProtection();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isDesktop() ? (
      <DesktopBlocker />
    ) : (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )}
  </StrictMode>
);
