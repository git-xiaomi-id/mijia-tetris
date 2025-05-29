"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import "./game-instruction.css";
import AppButton from "../button";
import useClickSound from "@/hooks/use-click-sound";
import CloseDialog from "./close-dialog";
import { useState } from "react";

export default function GameInstruction() {
  const [open, setOpen] = useState(false);

  const { clickPlay } = useClickSound();

  function onClose() {
    clickPlay();
    setOpen(false);
  }

  const rule = [
    <>
      Klik <strong>area kulkas</strong> yang ingin kamu isi.
    </>,
    <>
      Pilih makanan, minuman atau item lainnya dan masukkan ke dalam bagian
      kulkas.
    </>,
    <>
      Masukkan item sesuai dengan tempat yang seharusnya, contoh: masukkan ice
      cream ke dalam freezer.
    </>,
    <>Waktu akan terus berjalan, susun barang secepat mungkin!</>,
    <>Barang harus disusun hingga habis untuk mengakhiri permainan.</>,
    <>
      Share pencapaian waktu tercepat kamu ke <strong>instagram story</strong>{" "}
      dan tag <strong>@xiaomicommunity_id</strong>.
    </>,
  ];

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <AppButton variant="orange">Panduan Main</AppButton>
      </AlertDialogTrigger>
      <AlertDialogContent
        overlayClassname="opacity-0"
        className="game-instruction"
      >
        <AlertDialogHeader className="sr-only">
          <AlertDialogTitle hidden>Panduan Main</AlertDialogTitle>
          <AlertDialogDescription hidden>Panduan main</AlertDialogDescription>
        </AlertDialogHeader>
        <button type="button" onClick={onClose} className="gi-close-btn">
          <CloseDialog />
        </button>
        <div className="flex flex-col gap-5">
          <h2 className="gi-title">Panduan Main</h2>
          <div className="px-5 w-full mx-auto">
            <ol itemType="number" className="list-decimal text-[#5F5F5F]">
              {rule.map((r, n) => (
                <li key={n} className="my-1">
                  {r}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
