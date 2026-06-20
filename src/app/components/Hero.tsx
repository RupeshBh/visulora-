import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORIES, type PromptCard } from "./data";
import { usePrompts } from "./usePrompts";

export function Hero() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const { prompts } = usePrompts();

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!q) return { cats: [] as string[], cards: [] as PromptCard[] };
    const cats = CATEGORIES.filter((c) => c !== "All" && c.toLowerCase().includes(q));
    const cards = prompts.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.category.toLowerCase().includes(q)
    ).slice(0, 5);
    return { cats, cards };
  }, [q, prompts]);

  const showDropdown = focused && q.length > 0;
  return (
    <section style={{ padding: "56px 0 44px" }} className="flex flex-col items-center">
      <div style={{ maxWidth: 680, width: "100%", padding: "0 24px" }} className="mx-auto flex flex-col items-center text-center">
        

        <h1
          className="font-display"
          style={{
            marginTop: 24,
            fontFamily: '"Abhaya Libre", serif',
            fontWeight: 600,
            fontSize: 55,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "#EDECF5",
          }}
        >
          Find the <span style={{ color: "#B794F4" }}>perfect</span> prompt.
          <br />
          Create stunning visuals.
        </h1>

        <p
          style={{
            marginTop: 18,
            fontFamily: "Outfit",
            fontWeight: 300,
            fontSize: 15,
            color: "#9896B0",
            lineHeight: 1.6,
          }}
        >
          Browse thousands of AI prompts. Click any image to copy it instantly.
        </p>

        <div style={{ position: "relative", width: "100%", maxWidth: 580, marginTop: 24 }}>
          <div
            className="flex items-center"
            style={{
              width: "100%",
              height: 50,
              background: "#13131A",
              border: focused
                ? "1px solid rgba(183,148,244,0.4)"
                : "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
              padding: "0 12px 0 16px",
              boxShadow: focused ? "0 0 0 3px rgba(183,148,244,0.08)" : "none",
              transition: "all 180ms ease",
            }}
          >
            <Search size={16} color="#5C5A72" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 120)}
              placeholder="Search prompts, styles, moods…"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                padding: "0 12px",
                color: "#EDECF5",
                fontFamily: "Outfit",
                fontWeight: 400,
                fontSize: 14,
              }}
            />
            <span
              style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 4,
                padding: "3px 7px",
                color: "#5C5A72",
                fontFamily: "Outfit",
                fontWeight: 500,
                fontSize: 11,
              }}
            >
              ⌘K
            </span>
          </div>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: 58,
                left: 0,
                right: 0,
                background: "#13131A",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: 8,
                textAlign: "left",
                zIndex: 20,
                boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
                maxHeight: 360,
                overflowY: "auto",
              }}
            >
              {matches.cats.length === 0 && matches.cards.length === 0 && (
                <div
                  style={{
                    padding: "12px 12px",
                    fontFamily: "Outfit",
                    fontSize: 13,
                    color: "#5C5A72",
                  }}
                >
                  No matches for "{query}"
                </div>
              )}

              {matches.cats.length > 0 && (
                <>
                  <div style={dropHeader}>Categories</div>
                  {matches.cats.map((c) => (
                    <button
                      key={c}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(
                          new CustomEvent("meizora:filter", { detail: { category: c } })
                        );
                        setQuery("");
                        setFocused(false);
                      }}
                      style={dropRow}
                    >
                      <span style={catBadge}>{c}</span>
                    </button>
                  ))}
                </>
              )}

              {matches.cards.length > 0 && (
                <>
                  <div style={{ ...dropHeader, marginTop: matches.cats.length ? 8 : 0 }}>
                    Prompts
                  </div>
                  {matches.cards.map((c) => (
                    <button
                      key={c.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        window.dispatchEvent(
                          new CustomEvent("meizora:open", { detail: { id: c.id } })
                        );
                        setQuery("");
                        setFocused(false);
                      }}
                      style={dropRow}
                    >
                      <img
                        src={c.image}
                        alt=""
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 6,
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontFamily: "Outfit",
                            fontWeight: 500,
                            fontSize: 13,
                            color: "#EDECF5",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {c.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "Outfit",
                            fontWeight: 400,
                            fontSize: 11,
                            color: "#9896B0",
                          }}
                        >
                          {c.category}
                        </div>
                      </div>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const dropHeader: React.CSSProperties = {
  padding: "6px 10px",
  fontFamily: "Outfit",
  fontWeight: 700,
  fontSize: 9,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#5C5A72",
};

const dropRow: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  width: "100%",
  padding: "8px 10px",
  background: "transparent",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  textAlign: "left",
};

const catBadge: React.CSSProperties = {
  display: "inline-block",
  background: "rgba(183,148,244,0.1)",
  border: "1px solid rgba(183,148,244,0.25)",
  borderRadius: 6,
  padding: "4px 10px",
  color: "#B794F4",
  fontFamily: "Outfit",
  fontWeight: 600,
  fontSize: 12,
};
