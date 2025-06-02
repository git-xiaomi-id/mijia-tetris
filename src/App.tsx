import { ToasterSonner } from "./components/ui/sonner";
import { AppProvider } from "./hooks/use-context";
import ScreenWrapper from "./screen-wrapper";

export default function App() {
  return (
    <AppProvider>
      <ScreenWrapper />
      <ToasterSonner
        toastOptions={{
          classNames: {
            toast: " p-4 rounded-lg flex items-start gap-4  shadow-lg",
            error:
              " bg-gradient-to-b from-[#FFFFFF] to-[#EFEFEF] border-[#d04141] text-[#232322]",
            success:
              "bg-gradient-to-b from-[#FFFFFF] to-[#EFEFEF] border-[#2e7d32] text-[#232322]",
            warning:
              "bg-gradient-to-b from-[#FFFFFF] to-[#EFEFEF] border-[#ed6c02] text-[#232322]",
            info: "bg-gradient-to-b from-[#FFFFFF] to-[#EFEFEF] border-[#0288d1] text-[#232322]",
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
