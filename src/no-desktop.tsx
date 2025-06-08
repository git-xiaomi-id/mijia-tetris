import WelcomeScreenHeading from "./components/app/welcome-screen/welcome-screen-heading";
import AppButton from "./components/app/button";

export default function NoDesktopInformation() {
  return (
    <div className="welcome-screen">
      <WelcomeScreenHeading />
      <div className="bg-white/40 backdrop-blur-sm rounded-lg border border-[#D8D8D899] p-4 w-full max-w-xs  flex flex-col gap-3">
        <div className="size-40 mx-auto">
          <img
            alt="illustration"
            src="/mi-bunny/mi-bunny-fun.webp"
            className="size-full object-contain  animate-headshaking-slow"
          />
        </div>
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="font-[450]">Yuk main di Smartphone</div>
          <div className="text-xs">
            Untuk pengalaman yang lebih seru dan menyenangkan, mainkan game
            Tetris Kulkas ini di smartphone Xiaomi kamu yaa.
          </div>
        </div>
      </div>
      <div className="w-full max-w-xs">
        <a href="https://mi.co.id" target="_blank" rel="noreferrer">
          <AppButton>Kunjungi mi.co.id</AppButton>
        </a>
      </div>
    </div>
  );
}
