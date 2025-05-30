"use client";

import { type ReactNode } from "react";
import AppModal from "./modal";

export default function LoggedInModal({
  children,
  open,
  onOpenChange,
  onCancelClick,
}: {
  children?: ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onCancelClick?: () => void;
}) {
  return (
    <AppModal
      image="/mi-bunny/mi-bunny-shock.webp"
      open={open}
      title="Akun terdeteksi sudah digunakan"
      description="Akun yang kamu gunakan terdeteksi sudah digunakan di perangkat lain. Silakan logout terlebih dahulu dari perangkat tersebut."
      textConfirm="Oke, mengerti"
      onOpenChange={onOpenChange}
      animationImage="animate-headshaking"
      textCancel="Paksa Logout"
      onCancelClick={onCancelClick}
    >
      {children}
    </AppModal>
  );
}
