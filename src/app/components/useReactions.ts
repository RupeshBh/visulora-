import { useEffect, useState } from "react";
import { supabase, API, authHeaders } from "./auth";

type State = { likes: Record<string, boolean>; saves: Record<string, boolean> };
const EMPTY: State = { likes: {}, saves: {} };

let memory: State = { likes: {}, saves: {} };
let currentUserId: string | null = null;
const listeners = new Set<() => void>();
const requireAuthHandlers = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

async function hydrateFor(userId: string) {
  try {
    const headers = await authHeaders().catch(() => null);
    if (!headers) return;
    const res = await fetch(`${API}/reactions/me`, { headers });
    if (!res.ok) {
      const text = await res.text();
      console.log(`Hydrate reactions failed (${res.status}) for user ${userId}: ${text}`);
      memory = EMPTY;
      notify();
      return;
    }
    const data = await res.json();
    memory = { likes: data.likes ?? {}, saves: data.saves ?? {} };
    notify();
  } catch (err) {
    console.log(`Hydrate reactions network error: ${err}`);
  }
}

// Watch auth state — clear/hydrate accordingly
supabase.auth
  .getSession()
  .then(({ data: { session } }) => {
    currentUserId = session?.user?.id ?? null;
    if (currentUserId) hydrateFor(currentUserId);
  })
  .catch((err) => {
    console.log(`getSession (reactions) failed: ${err}`);
  });
try {
  supabase.auth.onAuthStateChange((_event, session) => {
    const nextId = session?.user?.id ?? null;
    if (nextId !== currentUserId) {
      currentUserId = nextId;
      memory = { likes: {}, saves: {} };
      notify();
      if (nextId) hydrateFor(nextId);
    }
  });
} catch (err) {
  console.log(`onAuthStateChange setup failed: ${err}`);
}

async function toggleRemote(type: "like" | "save", promptId: string) {
  if (!currentUserId) {
    requireAuthHandlers.forEach((fn) => fn());
    return;
  }
  const bag = type === "like" ? memory.likes : memory.saves;
  const wasActive = !!bag[promptId];
  if (wasActive) delete bag[promptId];
  else bag[promptId] = true;
  notify();

  try {
    const res = await fetch(`${API}/reactions/toggle`, {
      method: "POST",
      headers: await authHeaders(),
      body: JSON.stringify({ promptId, type }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.log(`Toggle ${type} failed (${res.status}) for ${promptId}: ${text}`);
      if (wasActive) bag[promptId] = true;
      else delete bag[promptId];
      notify();
    }
  } catch (err) {
    console.log(`Toggle ${type} network error for ${promptId}: ${err}`);
    if (wasActive) bag[promptId] = true;
    else delete bag[promptId];
    notify();
  }
}

export function onRequireAuth(handler: () => void) {
  requireAuthHandlers.add(handler);
  return () => {
    requireAuthHandlers.delete(handler);
  };
}

export function useReactions() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const fn = () => setTick((n) => n + 1);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  return {
    liked: (id: string) => !!memory.likes[id],
    saved: (id: string) => !!memory.saves[id],
    toggleLike: (id: string) => toggleRemote("like", id),
    toggleSave: (id: string) => toggleRemote("save", id),
    likedIds: () => Object.keys(memory.likes),
    savedIds: () => Object.keys(memory.saves),
    isAuthed: () => !!currentUserId,
  };
}
