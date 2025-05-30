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
  if (!token) return null;
  return await clientSupabase
    .from("user")
    .select()
    .eq("username_ig", username_ig)
    .is("token", null)
    .single();
}

export async function createUser(username_ig: string, token: string) {
  const updated_at = new Date().toISOString();
  return await clientSupabase
    .from("user")
    .upsert(
      {
        token,
        username_ig,
        updated_at,
      },
      { onConflict: "username_ig" }
    )
    .select()
    .maybeSingle();
}

export async function removeUserToken(token: string, username_ig: string) {
  if (!token) return null;
  return await clientSupabase
    .from("user")
    .update({ token: "" })
    .eq("token", token)
    .eq("username_ig", username_ig!)
    .select()
    .maybeSingle();
}

export async function getIdByUsername(username_ig: string) {
  if (!username_ig) return null;
  return await clientSupabase
    .from("user")
    .select("id")
    .eq("username_ig", username_ig);
}

export async function removeTokenFromUser(username_ig: string) {
  if (!username_ig) return null;
  const res = await clientSupabase
    .from("user")
    .update({ token: null })
    .eq("username_ig", username_ig.replace("@", ""));
  return res;
}

export async function checkValidUser(
  username_ig: string,
  token: string,
  id: string
) {
  return await clientSupabase
    .from("user")
    .select()
    .eq("username_ig", username_ig)
    .eq("token", token)
    .eq("id", id)
    .maybeSingle();
}
