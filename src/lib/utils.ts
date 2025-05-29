import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import cookie from "js-cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCookie(name: string) {
  return cookie.get(name);
}

export function setCookie(name: string, value: string, expires: number = 7) {
  return cookie.set(name, value, { expires });
}

export function delCookie(name: string) {
  return cookie.remove(name);
}

export const KEY_USERNAME_LOCAL = "mijia-game-username";
export const KEY_ID_LOCAL = "mijia-game-id";
export const KEY_TOKEN = "mijia-game-token";
