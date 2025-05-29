"use server";

// import { KEY_ID_LOCAL, KEY_TOKEN, KEY_USERNAME_LOCAL } from "./key-store";

import {
  getUserByToken,
  checkAlreadyLoggedIn,
  createUser,
  removeUserToken,
} from "./supabase-client";
import {
  delCookie,
  getCookie,
  KEY_ID_LOCAL,
  KEY_TOKEN,
  KEY_USERNAME_LOCAL,
  setCookie,
} from "@/lib/utils";

function generateRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function setUserCookie(username_ig: string, token: string, id: string) {
  setCookie(KEY_ID_LOCAL, id);
  setCookie(KEY_USERNAME_LOCAL, username_ig);
  setCookie(KEY_TOKEN, token);
}

async function removeCookieData() {
  delCookie(KEY_ID_LOCAL);
  delCookie(KEY_USERNAME_LOCAL);
  delCookie(KEY_TOKEN);
}

//
// Exported Actions
//

export async function clearCookieData() {
  setCookie(KEY_ID_LOCAL, "");
  setCookie(KEY_USERNAME_LOCAL, "");
  setCookie(KEY_TOKEN, "");
}

export async function tapLogoutUser() {
  const token = getCookie(KEY_TOKEN) ?? "";
  const username_ig = getCookie(KEY_USERNAME_LOCAL) ?? "";
  await removeCookieData();
  return await removeUserToken(token, username_ig);
}

export async function tapCheckUser() {
  const token = getCookie(KEY_TOKEN) ?? "";
  const currentUserByToken = await getUserByToken(token);
  return currentUserByToken;
}

export async function tapStartUser(usernameIG: string) {
  let token = getCookie(KEY_TOKEN) ?? "";

  const username = usernameIG.replace("@", "");

  if (!token) {
    const newToken = generateRandomString(32);
    setCookie(KEY_TOKEN, newToken);
    token = newToken;
  }

  const userAlreadyLoggedIn = await checkAlreadyLoggedIn(username, token);
  if (userAlreadyLoggedIn?.error)
    return {
      data: userAlreadyLoggedIn.data,
      error: { message: "already logged in" },
    };

  const res = await createUser(username, token);
  if (res?.data?.id) {
    const { username_ig, id, token } = res.data;
    await setUserCookie(username_ig!, token!, id!);
  }

  return res;
}
