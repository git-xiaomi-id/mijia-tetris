import { Route, Routes } from "react-router";
import { ToasterSonner } from "./components/ui/sonner";
import { AppProvider } from "./hooks/use-context";
import Leaderboard from "./leaderboard";
import ScreenWrapper from "./screen-wrapper";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<ScreenWrapper />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
      <ToasterSonner
        toastOptions={{
          classNames: {
            toast:
              " py-2 px-3 rounded-[12px] flex items-center justify-center gap-4 border  shadow-lg",
            error:
              " bg-gradient-to-b from-[#FFFFFF] to-[#EFEFEF] border-[#d04141] text-[#232322] shadow-[0px_4px_12px_0px_#C4090966] font-[450]",
            success:
              "bg-gradient-to-b from-[#FFFFFF] to-[#EFEFEF] border-[#2e7d32] text-[#232322] shadow-[0px_4px_12px_0px_#2e7d3266] font-[450]",
            warning:
              "bg-gradient-to-b from-[#FFFFFF] to-[#EFEFEF] border-[#ed6c02] text-[#232322] shadow-[0px_4px_12px_0px_#ed6c0266] font-[450]",
            info: "bg-gradient-to-b from-[#FFFFFF] to-[#EFEFEF] border-[#0288d1] text-[#232322] shadow-[0px_4px_12px_0px_#0288d166] font-[450]",
            content: "text-sm tracking-wide",
            title: "font-semibold",
          },
          unstyled: true,
        }}
        icons={{
          error: "❌",
          success: "✅",
          warning: "⚠️",
          info: "ℹ️",
        }}
      />
    </AppProvider>
  );
}
