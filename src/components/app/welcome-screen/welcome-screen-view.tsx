"use client";

import { useAppProvider } from "@/hooks/use-context";
import { tapStartUser } from "@/lib/actions";
import { Loader } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import AppButton from "../button";
import RegularButton from "../button-regular";
import AppInput from "../input";
import GameInstruction from "./game-instruction";
import LoggedInModal from "./loggedin-detected-modal";
import LogoutModal from "./logout-modal";
import AppModal from "./modal";

export default function WelcomeScreenView({
  tokenCookie,
}: {
  tokenCookie?: string;
}) {
  const [username, setUsername] = useState("");
  const { user, userLoading, setScreen, gamesCount } = useAppProvider();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [loggedinDetected, setLoggedinDetected] = useState(false);
  const [chanceModal, setChanceModal] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.username_ig) setUsername(`@${user?.username_ig || ""}`);
  }, [user]);

  useEffect(() => {
    const uname = username.trim();
    if (uname.length > 1) {
      const regexIgUser = /^@([a-zA-Z0-9._]{1,30})$/;
      if (!regexIgUser.test(uname)) setError("Username IG tidak valid");
      else setError("");
    } else setError("");
  }, [username]);

  async function clickStart() {
    setLoading(true);
    const res = await tapStartUser(username.trim());
    setLoading(false);

    if (res?.data?.id) {
      await mutate("user");
      await mutate("games");
      checkChancePlay(res?.count ?? gamesCount);
    } else if (res.error?.message === "already-logged-in")
      setLoggedinDetected(true);
    // else alert(res?.error?.message);
    else toast.error("Failed to Start", { description: res?.error?.message });
  }

  function switchLogout() {
    setLoggedinDetected(false);
    setLogoutModal(true);
  }

  function checkChancePlay(chance: number) {
    if (chance >= 3) {
      setChanceModal(true);
    } else {
      setScreen("game");
    }
  }

  function closeChanceModal() {
    setChanceModal(false);
  }

  return (
    <>
      <WelcomeScreenInput
        localUsername={user?.username_ig ? `@${user?.username_ig || ""}` : ""}
        username={username}
        setUsername={setUsername}
        userLoading={userLoading}
        tokenCookie={tokenCookie}
        error={error}
      />
      <WelcomeScreenButton
        loading={loading}
        username={username}
        clickStart={clickStart}
        localUsername={user?.username_ig ? `@${user?.username_ig || ""}` : ""}
        error={error}
        logoutModal={logoutModal}
      />
      <LoggedInModal
        username={username}
        open={loggedinDetected}
        onOpenChange={setLoggedinDetected}
        onCancelClick={switchLogout}
      />
      {chanceModal && (
        <AppModal
          open={chanceModal}
          title="Kesempatan main habis"
          description="Kamu sudah menghabiskan semua kesempatan main hari ini. Kembali lagi besok untuk mendapatkan 3 kesempatan main tambahan."
          image="/mi-bunny/mi-bunny-cry.webp"
          animationImage="animate-headshaking"
          textConfirm="Oke, mengerti"
          onOpenChange={closeChanceModal}
          onCancelClick={closeChanceModal}
        />
      )}
    </>
  );
}

function WelcomeScreenButton({
  username,
  clickStart,
  loading,
  localUsername,
  error,
  logoutModal,
}: {
  username: string;
  clickStart: () => void;
  loading: boolean;
  localUsername?: string;
  error?: string;
  logoutModal: boolean;
}) {
  return (
    <div className="relative z-10 mb-20 flex flex-col items-center justify-center gap-5  w-full max-w-[280px] mx-auto">
      <AppButton
        variant="blue"
        disabled={(error?.length || 0) > 1 || username.length < 2}
        onClick={clickStart}
        loading={loading}
      >
        Mulai Main
      </AppButton>
      <GameInstruction />
      {localUsername && (
        <LogoutModal open={logoutModal}>
          <RegularButton variant="ghost-red">Keluar dari akun</RegularButton>
        </LogoutModal>
      )}
    </div>
  );
}

function WelcomeScreenInput({
  username,
  setUsername,
  localUsername,
  userLoading,
  tokenCookie,
  error,
}: {
  localUsername: string;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  userLoading: boolean;
  tokenCookie?: string;
  error?: string;
}) {
  return userLoading && tokenCookie ? (
    <Loader className="size-6 mx-auto animate-spin" />
  ) : localUsername ? (
    <div className="flex flex-col gap-3 items-center justify-center  w-full max-w-[280px] mx-auto">
      <div className="flex justify-center items-center w-full">
        {localUsername ? "Main lagi dengan akun" : "Tulis akun ig kamu"}{" "}
        <div className="hand-down">👇🏼</div>
      </div>
      <div className="ws-currentUsername">{localUsername}</div>
    </div>
  ) : (
    <div className="flex flex-col gap-3 items-center justify-center  w-full max-w-[280px] mx-auto">
      <div className="flex justify-center items-center w-full">
        {localUsername ? "Main lagi dengan akun" : "Tulis akun ig kamu"}{" "}
        <div className="hand-down">👇🏼</div>
      </div>
      <div className="w-full">
        <AppInput
          className="w-full text-center"
          placeholder="Ketik @username_ig"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onClick={() => {
            if (!username) setUsername("@");
          }}
          onBlur={() => {
            if (username === "@") setUsername("");
          }}
          readOnly={localUsername ? true : false}
        />
        {error && (
          <div className="text-center text-red-600 text-sm mt-2 font-semibold">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
