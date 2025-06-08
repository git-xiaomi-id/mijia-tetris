import clientSupabase, { adminSupabase } from "@/lib/clientSupabase";
import {
  END_DATE_LEADERBOARD,
  KEY_PLAY_COUNT,
  setCookie,
  START_DATE_LEADERBOARD,
} from "./utils";

export async function getUserByToken(token: string) {
  if (!token) return null;
  return await clientSupabase
    .from("user")
    .select()
    .eq("token", token)
    .maybeSingle();
}

export async function checkAlreadyLoggedIn(username_ig: string, token: string) {
  const username = username_ig.replace("@", "");
  if (!token) return null;
  const res = await clientSupabase
    .from("user")
    .select()
    .eq("username_ig", username)
    .single();
  if (res.error) return await createUser(username, token);
  else if (res.data && res.data.token)
    return { data: null, error: { message: "already-logged-in" } };
  return res;
}

export async function createUser(username_ig: string, token: string) {
  const username = username_ig.replace("@", "");
  const updated_at = new Date().toISOString();
  return await clientSupabase
    .from("user")
    .upsert(
      {
        token,
        username_ig: username,
        updated_at,
      },
      { onConflict: "username_ig" }
    )
    .select()
    .maybeSingle();
}

export async function removeUserToken(token: string, username_ig: string) {
  const username = username_ig.replace("@", "");
  if (!token) return null;
  return await clientSupabase
    .from("user")
    .update({ token: "" })
    .eq("token", token)
    .eq("username_ig", username!)
    .select()
    .maybeSingle();
}

export async function getIdByUsername(username_ig: string) {
  const username = username_ig.replace("@", "");
  if (!username_ig) return null;
  return await clientSupabase
    .from("user")
    .select("id")
    .eq("username_ig", username);
}

export async function removeTokenFromUser(username_ig: string) {
  const username = username_ig.replace("@", "");
  if (!username_ig) return null;
  const res = await clientSupabase
    .from("user")
    .update({ token: null })
    .eq("username_ig", username)
    .select()
    .maybeSingle();
  return res;
}

export async function checkValidUser(
  username_ig: string,
  token: string,
  id: string
) {
  const username = username_ig.replace("@", "");
  return await clientSupabase
    .from("user")
    .select()
    .eq("username_ig", username)
    .eq("token", token)
    .eq("id", id)
    .maybeSingle();
}

export async function getLeaderboardWithUserInfo() {
  const startDate = new Date(START_DATE_LEADERBOARD).toISOString();
  const endDate = new Date(END_DATE_LEADERBOARD).toISOString();

  return await clientSupabase.rpc("get_unique_leaderboard", {
    start_date: startDate,
    end_date: endDate,
    limit_count: 15,
  });
}

export async function getUserGamesCountToday(username: string) {
  if (!username) return null;

  const today = new Date();
  const startOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).toISOString();
  const endOfDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1
  ).toISOString();

  const { data, error, count } = await clientSupabase
    .from("game")
    .select("*", { count: "exact", head: true })
    .eq("username_ig", username)
    .gte("created_at", startOfDay)
    .lt("created_at", endOfDay);

  if (error) {
    return { data: null, error, count: 0 };
  }

  setCookie(KEY_PLAY_COUNT, count?.toString() || "0");

  return { data, error: null, count: count || 0 };
}

function getUserAgent() {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform || "";
  return [userAgent, platform].join("|||");
}

export async function postGameResult({
  user,
  username_ig,
  token,
  duration,
  score,
  finishAt,
  startAt,
  items,
}: {
  user: string;
  username_ig: string | null;
  token: string | null;
  duration: number;
  score: number;
  finishAt: string;
  startAt: string;
  items: number;
}) {
  const useragent = getUserAgent();
  return await adminSupabase
    .from("game")
    .insert({
      user,
      token,
      duration,
      score,
      startAt,
      finishAt,
      username_ig,
      items,
      useragent,
    })
    .select();
}
