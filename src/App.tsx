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
            error: "bg-red-500 border-red-500 text-red-100",
            success: "bg-green-600 border-green-600 text-green-100",
            warning: "bg-yellow-600 border-yellow-600 text-yellow-100",
            info: "bg-blue-600 border-blue-600 text-blue-100",
            content: "text-sm tracking-wide",
            title: "font-semibold",
          },
          unstyled: true,
        }}
      />
    </AppProvider>
  );
}
