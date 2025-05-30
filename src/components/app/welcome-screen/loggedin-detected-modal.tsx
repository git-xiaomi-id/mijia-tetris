"use client";

import { useEffect, useState, type ReactNode } from "react";
import AppModal from "./modal";
import { tapForceLogoutUser } from "@/lib/actions";
import { toast } from "sonner";

type TStep = "inform" | "loading" | "success-logout";

export default function LoggedInModal({
  children,
  open,
  onOpenChange,
  username,
}: {
  children?: ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onCancelClick?: () => void;
  username: string;
}) {
  const [step, setStep] = useState<TStep>("inform");

  async function callLogout() {
    setStep("loading");
    const res = await tapForceLogoutUser(username);
    console.log("calllogout: ", res);
    if (res?.data) setStep("success-logout");
    else {
      toast.error("Failed", { description: res?.error?.message });
      setStep("inform");
    }
  }

  const content = {
    inform: {
      title: "Akun terdeteksi sudah digunakan",
      description:
        "Akun yang kamu gunakan terdeteksi sudah digunakan di perangkat lain. Silakan logout terlebih dahulu dari perangkat tersebut.",
      textConfirm: "Oke, mengerti",
      animationImage: "animate-headshaking",
      image: "/mi-bunny/mi-bunny-shock.webp",
      textCancel: "Paksa Logout",
      onCancelClick: callLogout,
    },
    loading: {
      title: "Memulai logout",
      description: "Tunggu yaaa kami sedang melepaskan Akun kamu dari game.",
      textConfirm: "",
      animationImage: "animate-headshaking",
      image: "/mi-bunny/mi-bunny-shock.webp",
      textCancel: "",
      onCancelClick: undefined,
    },
    "success-logout": {
      title: "Akun berhasil di Logout",
      description:
        "Akun berhasil di logout! Sekarang, kamu bisa main dengan akun lain.",
      textConfirm: "Oke, lanjutkan",
      animationImage: "animate-headscaling",
      image: "/mi-bunny/mi-bunny-fun.webp",
      textCancel: "",
      onCancelClick: undefined,
    },
  };

  useEffect(() => {
    if (!open) setStep("inform");
  }, [open]);

  return (
    <AppModal
      image={content[step].image}
      open={open}
      title={content[step].title}
      description={content[step].description}
      textConfirm={content[step].textConfirm}
      onOpenChange={onOpenChange}
      animationImage={content[step].animationImage}
      textCancel={content[step].textCancel}
      onCancelClick={content[step].onCancelClick}
    >
      {children}
    </AppModal>
  );
}
