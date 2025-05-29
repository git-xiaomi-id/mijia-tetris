import { createClient } from "@supabase/supabase-js";
import { type Database } from "./supabase";

const clientSupabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_SERVICE_KEY
);

export default clientSupabase;
