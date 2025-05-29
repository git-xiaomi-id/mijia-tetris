"use client";

import { tapLogoutUser } from "../../../lib/actions";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { type ReactNode, useEffect, useState } from "react";
import RegularButton from "../button-regular";
import { mutate } from "swr";

export default function LogoutModal({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);

  let title = "Logouting...";
  let description = "Tunggu yaaa kami sedang melepaskan Akun kamu dari game.";
  let image = "/mi-bunny/mi-bunny-shock.webp";
  let animation = "animate-headshaking";

  if (response === "success") {
    title = "Akun berhasil di Logout";
    description =
      "Akun berhasil di logout! Sekarang, kamu bisa main dengan akun lain.";
    image = "/mi-bunny/mi-bunny-fun.webp";
    animation = "animate-headscaling";
  }

  async function callLogout() {
    setLoading(true);
    setTimeout(async () => {
      await tapLogoutUser();
      await mutate("user");
      setLoading(false);
      setResponse("success");
      // if (logouting?.data?.id) setResponse("success");
    }, 3000);
  }

  function close() {
    setOpen(false);
  }

  useEffect(() => {
    if (open) callLogout();
    else {
      setLoading(false);
      setResponse("");
    }
  }, [open]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="w-[90%] max-w-[280px] rounded-xl">
        <div className="w-full flex items-center justify-center">
          <div className={`size-[120px] mx-auto relative ${animation}`}>
            <img
              alt="logout-illustration"
              src={image}
              className="size-full object-contain"
            />
          </div>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left font-semibold text-sm">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left text-sm">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {!loading && (
          <div className="flex justify-end w-full">
            <RegularButton
              variant="ghost-blue"
              className="w-fit block"
              onClick={close}
            >
              Oke, lanjutkan
            </RegularButton>
          </div>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
