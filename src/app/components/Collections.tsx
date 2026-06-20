import { ImageWithFallback } from "./figma/ImageWithFallback";
import { type PromptCard } from "./data";
import { usePrompts } from "./usePrompts";

export function Collections({ onOpen }: { onOpen: (c: PromptCard) => void }) {
  const { prompts } = usePrompts();
  const groups = Array.from(new Set(prompts.map((c) => c.category))).map((cat) => ({
    cat,
    items: prompts.filter((c) => c.category === cat),
  }));

  return (
    <div style={{ padding: "32px 40px 64px" }}>
      <h2
        className="font-display"
        style={{
          fontFamily: '"Abhaya Libre", serif',
          fontWeight: 600,
          fontSize: 32,
          letterSpacing: "-0.03em",
          color: "#EDECF5",
          marginBottom: 8,
        }}
      >
        Collections
      </h2>
      <p
        style={{
          fontFamily: "Outfit",
          fontWeight: 300,
          fontSize: 15,
          color: "#9896B0",
          marginBottom: 32,
        }}
      >
        Curated prompt sets grouped by category.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {groups.map((g) => (
          <div
            key={g.cat}
            onClick={() => onOpen(g.items[0])}
            style={{
              background: "#13131A",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              overflow: "hidden",
              cursor: "pointer",
              transition: "border-color 180ms ease, transform 180ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", height: 160, gap: 2 }}>
              <ImageWithFallback
                src={g.items[0].image}
                alt={g.cat}
                className="w-full h-full object-cover"
              />
              <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 2 }}>
                <ImageWithFallback
                  src={(g.items[1] ?? g.items[0]).image}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <ImageWithFallback
                  src={(g.items[2] ?? g.items[0]).image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <div
                style={{
                  fontFamily: "Outfit",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#B794F4",
                }}
              >
                Collection
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontFamily: "Outfit",
                  fontWeight: 600,
                  fontSize: 17,
                  color: "#FFFFFF",
                }}
              >
                {g.cat}
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontFamily: "Outfit",
                  fontWeight: 400,
                  fontSize: 12,
                  color: "#B8B6CC",
                }}
              >
                {g.items.length} prompt{g.items.length === 1 ? "" : "s"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
