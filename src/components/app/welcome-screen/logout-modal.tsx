"use client";

import { tapLogoutUser } from "../../../lib/actions";
import { type ReactNode, useEffect, useState } from "react";
import { mutate } from "swr";
import AppModal from "./modal";

export default function LogoutModal({
  children,
  open,
}: {
  children: ReactNode;
  open?: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");
  const [_open, setOpen] = useState(open || false);

  useEffect(() => {
    setOpen(open || false);
  }, [open]);

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

  useEffect(() => {
    if (open) callLogout();
    else {
      setLoading(false);
      setResponse("");
    }
  }, [open]);

  return (
    <AppModal
      open={_open}
      title={title}
      description={description}
      image={image}
      animationImage={animation}
      loadingConfirm={loading}
      textConfirm="Oke, lanjutkan"
      children={children}
      onOpenChange={setOpen}
      onConfirmClick={callLogout}
    />
  );
}
