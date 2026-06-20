import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
const app = new Hono();

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const NOTION_DATABASE_ID = "3663af86141a81af9adae4fdde6c70bd";
const NOTION_VERSION = "2022-06-28";
const BUCKET = "make-dac9a38a-prompts";

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Cinematic: ["cinematic", "film", "movie", "anamorphic", "scene", "blockbuster"],
  Anime: ["anime", "manga", "ghibli", "studio ghibli", "shonen", "kawaii"],
  Portrait: ["portrait", "headshot", "face", "model", "beauty shot"],
  Cyberpunk: ["cyberpunk", "neon", "blade runner", "dystopian", "cyber"],
  Fantasy: ["fantasy", "dragon", "magic", "wizard", "elf", "mythical", "knight"],
  Nature: ["nature", "forest", "mountain", "landscape", "river", "wildlife", "ocean", "sunset"],
  Abstract: ["abstract", "geometric", "fluid", "psychedelic", "pattern"],
  Street: ["street", "urban", "alley", "city", "graffiti"],
  Surreal: ["surreal", "dream", "dreamlike", "dali", "uncanny"],
  Minimal: ["minimal", "minimalist", "simple", "clean", "negative space"],
  Architecture: ["architecture", "building", "skyscraper", "interior", "facade", "structure"],
};

function autoCategorize(text: string): string {
  const lower = text.toLowerCase();
  let best = { cat: "Uncategorized", score: 0 };
  for (const [cat, words] of Object.entries(CATEGORY_KEYWORDS)) {
    const score = words.reduce((n, w) => n + (lower.includes(w) ? 1 : 0), 0);
    if (score > best.score) best = { cat, score };
  }
  return best.cat;
}

async function ensureBucket() {
  try {
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    if (!buckets?.some((b) => b.name === BUCKET)) {
      await supabaseAdmin.storage.createBucket(BUCKET, { public: false });
      console.log(`Created bucket ${BUCKET}`);
    }
  } catch (err) {
    console.log(`ensureBucket error: ${err}`);
  }
}
ensureBucket();

async function getUserFromRequest(authHeader: string | undefined) {
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  if (!token) return null;
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) return null;
  return data.user;
}

app.use("*", logger(console.log));

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.get("/make-server-dac9a38a/health", (c) => {
  return c.json({ status: "ok" });
});

// === Auth ===
app.post("/make-server-dac9a38a/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    if (!email || !password) {
      return c.json({ error: "Email and password are required" }, 400);
    }
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name ?? "" },
      email_confirm: true,
    });
    if (error) {
      console.log(`Signup error for ${email}: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }
    return c.json({ userId: data.user?.id });
  } catch (err) {
    console.log(`Signup unexpected error: ${err}`);
    return c.json({ error: `Signup failed: ${err}` }, 500);
  }
});

// === Reactions ===
const TYPES = new Set(["like", "save"]);

app.get("/make-server-dac9a38a/reactions/me", async (c) => {
  try {
    const user = await getUserFromRequest(c.req.header("Authorization"));
    if (!user) return c.json({ error: "Unauthorized" }, 401);
    const entries = await kv.getByPrefix(`reaction:${user.id}:`);
    const likes: Record<string, boolean> = {};
    const saves: Record<string, boolean> = {};
    for (const entry of entries) {
      if (entry && entry.type === "like") likes[entry.promptId] = true;
      if (entry && entry.type === "save") saves[entry.promptId] = true;
    }
    return c.json({ likes, saves });
  } catch (err) {
    console.log(`GET reactions error: ${err}`);
    return c.json({ error: `Failed to load reactions: ${err}` }, 500);
  }
});

app.post("/make-server-dac9a38a/reactions/toggle", async (c) => {
  try {
    const user = await getUserFromRequest(c.req.header("Authorization"));
    if (!user) return c.json({ error: "Unauthorized" }, 401);
    const body = await c.req.json();
    const { promptId, type } = body ?? {};
    if (!promptId || !TYPES.has(type)) {
      return c.json({ error: "promptId and type ('like'|'save') required" }, 400);
    }
    const key = `reaction:${user.id}:${type}:${promptId}`;
    const counterKey = `counter:${type}:${promptId}`;
    const existing = await kv.get(key);
    const currentCount = (await kv.get(counterKey)) ?? 0;
    if (existing) {
      await kv.del(key);
      await kv.set(counterKey, Math.max(0, currentCount - 1));
      return c.json({ active: false, count: Math.max(0, currentCount - 1) });
    } else {
      await kv.set(key, { type, promptId, userId: user.id, createdAt: Date.now() });
      await kv.set(counterKey, currentCount + 1);
      return c.json({ active: true, count: currentCount + 1 });
    }
  } catch (err) {
    console.log(`Toggle reaction error: ${err}`);
    return c.json({ error: `Failed to toggle reaction: ${err}` }, 500);
  }
});

// === Prompts ===
app.get("/make-server-dac9a38a/prompts", async (c) => {
  try {
    const prompts = await kv.getByPrefix("prompt:");
    return c.json({ prompts: prompts.filter(Boolean) });
  } catch (err) {
    console.log(`GET prompts error: ${err}`);
    return c.json({ error: `Failed to load prompts: ${err}` }, 500);
  }
});

// === Notion sync ===
function readPlainText(prop: any): string {
  if (!prop) return "";
  if (prop.title) return prop.title.map((t: any) => t.plain_text).join("");
  if (prop.rich_text) return prop.rich_text.map((t: any) => t.plain_text).join("");
  if (prop.select) return prop.select?.name ?? "";
  if (prop.multi_select) return prop.multi_select.map((s: any) => s.name).join(",");
  if (prop.url) return prop.url;
  return "";
}
function readMultiSelect(prop: any): string[] {
  if (!prop?.multi_select) return [];
  return prop.multi_select.map((s: any) => s.name);
}
function readFileUrl(prop: any): string | null {
  if (!prop?.files?.length) return null;
  const f = prop.files[0];
  if (f.type === "external") return f.external?.url ?? null;
  if (f.type === "file") return f.file?.url ?? null;
  return null;
}
function findProperty(props: Record<string, any>, candidates: string[]): any {
  const keys = Object.keys(props);
  for (const c of candidates) {
    const match = keys.find((k) => k.toLowerCase() === c.toLowerCase());
    if (match) return props[match];
  }
  return undefined;
}

async function downloadAndStore(url: string, pageId: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`Image download failed (${res.status}) for ${pageId}: ${url}`);
      return null;
    }
    const contentType = res.headers.get("content-type") || "image/jpeg";
    const ext = (contentType.split("/")[1] || "jpg").split(";")[0];
    const bytes = new Uint8Array(await res.arrayBuffer());
    const path = `${pageId}.${ext}`;
    const { error } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType, upsert: true });
    if (error) {
      console.log(`Storage upload error for ${pageId}: ${error.message}`);
      return null;
    }
    const { data: signed, error: sErr } = await supabaseAdmin.storage
      .from(BUCKET)
      .createSignedUrl(path, 60 * 60 * 24 * 365);
    if (sErr || !signed) {
      console.log(`Signed URL error for ${pageId}: ${sErr?.message}`);
      return null;
    }
    return signed.signedUrl;
  } catch (err) {
    console.log(`downloadAndStore error for ${pageId}: ${err}`);
    return null;
  }
}

app.post("/make-server-dac9a38a/sync-notion", async (c) => {
  try {
    const user = await getUserFromRequest(c.req.header("Authorization"));
    if (!user) return c.json({ error: "Unauthorized" }, 401);

    const token = Deno.env.get("NOTION_TOKEN");
    if (!token) return c.json({ error: "NOTION_TOKEN not configured" }, 500);

    let cursor: string | undefined = undefined;
    let added = 0;
    let updated = 0;
    let skipped = 0;
    const errors: string[] = [];

    while (true) {
      const body: any = { page_size: 100 };
      if (cursor) body.start_cursor = cursor;
      const res = await fetch(
        `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Notion-Version": NOTION_VERSION,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );
      if (!res.ok) {
        const text = await res.text();
        console.log(`Notion query failed (${res.status}): ${text}`);
        return c.json({ error: `Notion API ${res.status}: ${text}` }, 500);
      }
      const data = await res.json();
      for (const page of data.results ?? []) {
        try {
          const props = page.properties ?? {};
          const titleProp = findProperty(props, ["Title", "Name"]);
          const promptProp = findProperty(props, ["Prompt", "Description", "Body", "Text"]);
          const imageProp = findProperty(props, ["Image", "Images", "Photo", "Cover"]);
          const categoryProp = findProperty(props, ["Category"]);
          const tagsProp = findProperty(props, ["Tags", "Tag"]);

          const title = readPlainText(titleProp);
          const prompt = readPlainText(promptProp);
          const imageUrl = readFileUrl(imageProp);
          const categoryRaw = readPlainText(categoryProp);
          const tags = readMultiSelect(tagsProp);

          if (!title && !prompt) {
            skipped++;
            continue;
          }
          if (!imageUrl) {
            errors.push(`No image on "${title || page.id}"`);
            skipped++;
            continue;
          }

          const existing = await kv.get(`prompt:${page.id}`);
          const lastEdited = page.last_edited_time;

          let storedImage = existing?.image;
          if (!existing || existing.lastEdited !== lastEdited || !storedImage) {
            const newUrl = await downloadAndStore(imageUrl, page.id);
            if (newUrl) storedImage = newUrl;
            if (!storedImage) {
              errors.push(`Image upload failed for "${title}"`);
              skipped++;
              continue;
            }
          }

          const category = categoryRaw || autoCategorize(`${title} ${prompt} ${tags.join(" ")}`);
          const record = {
            id: page.id,
            title: title || "Untitled",
            prompt,
            image: storedImage,
            category,
            tags,
            aspect: "tall",
            likes: existing?.likes ?? 0,
            views: existing?.views ?? 0,
            createdDaysAgo: 0,
            lastEdited,
            syncedAt: Date.now(),
          };
          await kv.set(`prompt:${page.id}`, record);
          if (existing) updated++;
          else added++;
        } catch (perPageErr) {
          console.log(`Page sync error: ${perPageErr}`);
          errors.push(`Page ${page.id}: ${perPageErr}`);
        }
      }
      if (!data.has_more) break;
      cursor = data.next_cursor;
    }

    return c.json({ added, updated, skipped, errors });
  } catch (err) {
    console.log(`sync-notion error: ${err}`);
    return c.json({ error: `Sync failed: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);
