import { createClient, type Session } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
);

export const API = `https://${projectId}.supabase.co/functions/v1/make-server-dac9a38a`;

export async function authHeaders(): Promise<Record<string, string>> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token ?? publicAnonKey;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export type { Session };
