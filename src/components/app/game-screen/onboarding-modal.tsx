import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import RegularButton from "../button-regular";
import AppCheckbox from "../checkbox";

export default function OnboardingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<number>(0);
  const [_open, setOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    setOpen(open);
  }, [open]);

  let title = "Klik bagian yang ingin diisi";
  let description =
    "Sebelum mulai mengisi kulkas, kamu harus memilih bagian kulkas yang ingin diisi terlebih dahulu.";
  let image = "/mi-bunny/mi-bunny-smile.webp";
  let textConfirm = "Selanjutnya";
  let animationImage = "animate-headscaling";
  let positionClassname = "";

  if (step > 0) {
    title = "Daftar area yang bisa diisi";
    description =
      "Tersedia beberapa area yang bisa diisi, mulai dari area utama, pintu, laci sayuran, dan laci freezer.";
    image = "/mi-bunny/mi-bunny-fun.webp";
    textConfirm = "Mulai main";
    animationImage = "animate-headshaking";
    positionClassname = "!top-[70%]";
  }

  function nextStep() {
    setStep((curr) => {
      const newValue = curr + 1;
      if (newValue > 1) {
        setOpen(false);
        onClose();
      }
      return newValue;
    });
  }

  const footer = (
    <AlertDialogFooter className="flex flex-row justify-between items-center">
      <AppCheckbox
        checked={dontShowAgain}
        onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
      >
        <div className=" text-[10px] text-[#888]">Jangan tampilkan lagi</div>
      </AppCheckbox>
      <RegularButton variant="ghost-blue" onClick={nextStep}>
        {textConfirm}
      </RegularButton>
    </AlertDialogFooter>
  );

  return (
    <>
      <AlertDialog open={_open} onOpenChange={setOpen}>
        <AlertDialogContent
          className={[
            "w-[90%] max-w-[300px] rounded-xl",
            positionClassname,
          ].join(" ")}
          showOverlay={false}
        >
          <div className="w-full flex items-center justify-center">
            <div className={`size-[120px] mx-auto relative ${animationImage}`}>
              <img
                alt="logout-illustration"
                src={image}
                className="size-full object-contain"
              />
            </div>
          </div>
          {step === 0 && (
            <div className="animate-shownSlow gap-4 flex flex-col">
              <AlertDialogHeader className="max-w-full">
                <AlertDialogTitle className="text-left font-semibold text-sm">
                  {title}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-left text-sm">
                  {description}
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
          )}
          {step === 1 && (
            <div className="animate-shownSlow gap-4 flex flex-col">
              <AlertDialogHeader className="max-w-full">
                <AlertDialogTitle className="text-left font-semibold text-sm">
                  {title}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-left text-sm">
                  {description}
                </AlertDialogDescription>
              </AlertDialogHeader>
            </div>
          )}
          {footer}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
