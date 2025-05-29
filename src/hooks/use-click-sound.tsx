"use client";

import { useEffect, useRef } from "react";

export default function useClickSound() {
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  function clickPlay() {
    const sound = clickSoundRef.current;
    if (sound) {
      sound.currentTime = 0;
      sound?.play();
    }
  }

  useEffect(() => {
    clickSoundRef.current = new Audio("/sound-click-1.mp3");
  }, []);

  return { clickPlay };
}
