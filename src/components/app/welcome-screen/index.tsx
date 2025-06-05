import WelcomeScreenHeading from "./welcome-screen-heading";
import FooterBrand from "../footer-brand";
import WelcomeScreenView from "./welcome-screen-view";
import "./welcome-screen.css";
import { useAppProvider } from "@/hooks/use-context";
import ChancePlay from "../chance-play";

export default function WelcomeScreen({
  tokenCookie,
}: {
  tokenCookie?: string;
}) {
  const { gamesCount } = useAppProvider();
  const { user, userLoading } = useAppProvider();
  return (
    <div className="welcome-screen">
      {user && !userLoading && (
        <div className="w-full max-w-[280px] mx-auto">
          <ChancePlay gameCount={gamesCount} direction="col" />
        </div>
      )}
      <WelcomeScreenHeading />
      <WelcomeScreenView tokenCookie={tokenCookie} />
      <FooterBrand />
    </div>
  );
}
