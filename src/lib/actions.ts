"use server";

import {
  delCookie,
  getCookie,
  KEY_ID_LOCAL,
  KEY_PLAY_COUNT,
  KEY_PRIZE_ALERT,
  KEY_TOKEN,
  KEY_USERNAME_LOCAL,
  setCookie,
} from "@/lib/utils";
import {
  checkAlreadyLoggedIn,
  checkValidUser,
  createUser,
  getUserByToken,
  getUserGamesCountToday,
  removeTokenFromUser,
  removeUserToken,
} from "./supabase-client";

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
  setCookie(KEY_PLAY_COUNT, "");
  setCookie(KEY_PRIZE_ALERT, "");
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

export async function tapCheckUserGames() {
  let username = getCookie(KEY_USERNAME_LOCAL);

  if (!username) {
    const userCheck = await tapCheckUser();
    if (userCheck?.data?.username_ig) {
      username = userCheck.data.username_ig;
      setCookie(KEY_USERNAME_LOCAL, username);
    } else {
      return { error: { message: "No valid user found" }, count: 0 };
    }
  }

  return await getUserGamesCountToday(username);
}

export async function tapStartUser(usernameIG: string) {
  let token = getCookie(KEY_TOKEN) ?? "";
  const id = getCookie(KEY_ID_LOCAL) ?? "";
  const username = usernameIG.replace("@", "");

  if (token && id && username) {
    if (import.meta.env.DEV)
      console.log("[tapStartUser] Checking user with token:", token);
    const user = await checkValidUser(username, token, id);
    if (user && user.data) return user;
  }

  if (import.meta.env.DEV) {
    console.log("[tapStartUser] Starting with username:", username);
    console.log("[tapStartUser] Existing token:", token);
  }

  if (!token) {
    const newToken = generateRandomString(32);
    setCookie(KEY_TOKEN, newToken);
    token = newToken;
    if (import.meta.env.DEV) {
      console.log("[tapStartUser] Generated new token:", newToken);
    }
  }

  const userAlreadyLoggedIn = await checkAlreadyLoggedIn(username, token);
  if (import.meta.env.DEV) {
    console.log("[tapStartUser] Check login result:", userAlreadyLoggedIn);
  }

  if (userAlreadyLoggedIn?.error)
    return {
      data: userAlreadyLoggedIn.data,
      error: { message: "already-logged-in" },
    };

  const res = await createUser(username, token);
  if (import.meta.env.DEV) {
    console.log("[tapStartUser] Create user result:", res);
  }

  if (res?.data?.id) {
    const { username_ig, id, token } = res.data;
    await setUserCookie(username_ig!, token!, id!);
    if (import.meta.env.DEV) {
      console.log("[tapStartUser] Set cookies for user:", {
        username_ig,
        id,
        token,
      });
    }
  }

  return res;
}

export async function tapForceLogoutUser(username_ig: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return await removeTokenFromUser(username_ig);
}
