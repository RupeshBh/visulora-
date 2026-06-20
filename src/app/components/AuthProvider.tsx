import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase, API, type Session } from "./auth";
import { publicAnonKey } from "../../../utils/supabase/info";

type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

type AuthCtx = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const sessionToUser = (s: Session | null): AuthUser | null => {
    if (!s?.user) return null;
    return {
      id: s.user.id,
      email: s.user.email ?? "",
      name: (s.user.user_metadata?.name as string) ?? "",
    };
  };

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setUser(sessionToUser(session));
        setLoading(false);
      })
      .catch((err) => {
        console.log(`getSession (auth) failed: ${err}`);
        setLoading(false);
      });
    let unsub: (() => void) | null = null;
    try {
      const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(sessionToUser(session));
      });
      unsub = () => sub.subscription.unsubscribe();
    } catch (err) {
      console.log(`onAuthStateChange (auth) setup failed: ${err}`);
    }
    return () => {
      if (unsub) unsub();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.log(`Sign-in error for ${email}: ${error.message}`);
      throw new Error(error.message);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const res = await fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({ email, password, name }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      const msg = data.error ?? `Signup failed (${res.status})`;
      console.log(`Signup error: ${msg}`);
      throw new Error(msg);
    }
    // Auto sign-in after successful signup
    await signIn(email, password);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(`Sign-out error: ${error.message}`);
  };

  return (
    <Ctx.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</Ctx.Provider>
  );
}

export function useAuth(): AuthCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside AuthProvider");
  return v;
}
