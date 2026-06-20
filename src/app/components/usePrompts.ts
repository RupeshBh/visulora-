import { useEffect, useState } from "react";
import { API, authHeaders } from "./auth";
import { CARDS, type PromptCard } from "./data";

type State = {
  prompts: PromptCard[];
  loading: boolean;
  syncing: boolean;
  error: string | null;
  lastSync: { added: number; updated: number; skipped: number; errors: string[] } | null;
};

let memory: State = {
  prompts: CARDS,
  loading: true,
  syncing: false,
  error: null,
  lastSync: null,
};

const listeners = new Set<() => void>();
const notify = () => listeners.forEach((fn) => fn());

function setState(patch: Partial<State>) {
  memory = { ...memory, ...patch };
  notify();
}

function normalize(p: any): PromptCard {
  return {
    id: p.id,
    title: p.title || "Untitled",
    category: p.category || "Uncategorized",
    image: p.image,
    likes: p.likes ?? 0,
    views: p.views ?? 0,
    createdDaysAgo: p.createdDaysAgo ?? 0,
    aspect: (p.aspect as PromptCard["aspect"]) || "tall",
    prompt: p.prompt || "",
    model: p.model,
    tags: Array.isArray(p.tags) ? p.tags : [],
  };
}

async function loadPrompts(retry = 0): Promise<void> {
  try {
    const headers = await authHeaders().catch(() => null);
    if (!headers) {
      setState({ loading: false });
      return;
    }
    const res = await fetch(`${API}/prompts`, { headers });
    if (!res.ok) {
      const text = await res.text();
      console.log(`Load prompts failed (${res.status}): ${text}`);
      setState({ loading: false, error: text });
      return;
    }
    const data = await res.json();
    const synced = (data.prompts || []).map(normalize);
    setState({
      prompts: synced.length > 0 ? synced : CARDS,
      loading: false,
      error: null,
    });
  } catch (err) {
    console.log(`Load prompts network error (retry ${retry}): ${err}`);
    if (retry < 2) {
      setTimeout(() => loadPrompts(retry + 1), 1500 * (retry + 1));
      return;
    }
    setState({ loading: false, error: String(err) });
  }
}

export async function syncFromNotion() {
  setState({ syncing: true, error: null });
  try {
    const res = await fetch(`${API}/sync-notion`, {
      method: "POST",
      headers: await authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.error || `Sync failed (${res.status})`;
      console.log(`Sync error: ${msg}`);
      setState({ syncing: false, error: msg });
      return { ok: false, error: msg };
    }
    setState({ syncing: false, lastSync: data });
    await loadPrompts();
    return { ok: true, ...data };
  } catch (err) {
    console.log(`Sync network error: ${err}`);
    setState({ syncing: false, error: String(err) });
    return { ok: false, error: String(err) };
  }
}

loadPrompts();

export function usePrompts() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const fn = () => setTick((n) => n + 1);
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }, []);
  return memory;
}
