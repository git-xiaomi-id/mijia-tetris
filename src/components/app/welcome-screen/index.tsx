import WelcomeScreenHeading from "./welcome-screen-heading";
import FooterBrand from "../footer-brand";
import WelcomeScreenView from "./welcome-screen-view";
import "./welcome-screen.css";

export default function WelcomeScreen({
  tokenCookie,
}: {
  tokenCookie?: string;
}) {
  return (
    <div className="welcome-screen">
      <WelcomeScreenHeading />
      <WelcomeScreenView tokenCookie={tokenCookie} />
      <FooterBrand />
    </div>
  );
}
