import WelcomeScreen from "./components/app/welcome-screen";
import { getCookie, KEY_TOKEN } from "./lib/utils";

export default function App() {
  const token = getCookie(KEY_TOKEN);
  return <WelcomeScreen tokenCookie={token} />;
}
