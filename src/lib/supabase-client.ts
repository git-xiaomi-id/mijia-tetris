import clientSupabase from "@/lib/clientSupabase";

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
  return await clientSupabase
    .from("game")
    .select(
      `
      user!inner(username_ig),
      duration,
      score,
      finish_at,
      start_at
    `
    )
    .order("duration", { ascending: true })
    .limit(15);
}
