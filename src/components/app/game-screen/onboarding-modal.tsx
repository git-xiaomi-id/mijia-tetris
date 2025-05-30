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

export default function OnboardingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<number>(0);
  const [_open, setOpen] = useState(false);

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
    positionClassname = "top-70%";
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
          <AlertDialogHeader className="max-w-full">
            <AlertDialogTitle className="text-left font-semibold text-sm">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left text-sm">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="justify-between items-center">
            <RegularButton variant="ghost-blue" onClick={nextStep}>
              {textConfirm}
            </RegularButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
