import { Heart, Bookmark } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { PromptCard } from "./data";
import { useReactions } from "./useReactions";

const ASPECT_HEIGHT: Record<PromptCard["aspect"], number> = {
  tall: 420,
  square: 280,
  landscape: 240,
  wide: 200,
};

export function Gallery({
  cards,
  onOpen,
}: {
  cards: PromptCard[];
  onOpen: (c: PromptCard) => void;
}) {
  return (
    <div
      style={{
        marginTop: 20,
        padding: "0 40px 64px",
        columnCount: 4,
        columnGap: 12,
      }}
      className="meizora-grid"
    >
      <style>{`
        @media (max-width: 1100px) { .meizora-grid { column-count: 3 !important; } }
        @media (max-width: 760px) { .meizora-grid { column-count: 2 !important; padding-left: 16px !important; padding-right: 16px !important; column-gap: 8px !important; } }
      `}</style>
      {cards.map((card) => (
        <Card key={card.id} card={card} height={ASPECT_HEIGHT[card.aspect]} onOpen={onOpen} />
      ))}
    </div>
  );
}

function Card({
  card,
  height,
  onOpen,
}: {
  card: PromptCard;
  height: number;
  onOpen: (c: PromptCard) => void;
}) {
  const r = useReactions();
  const isLiked = r.liked(card.id);
  const isSaved = r.saved(card.id);
  const displayLikes = card.likes + (isLiked ? 1 : 0);
  return (
    <div
      onClick={() => onOpen(card)}
      className="group transition-all"
      style={{
        breakInside: "avoid",
        marginBottom: 12,
        background: "#13131A",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
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
      <div style={{ position: "relative", width: "100%", height }}>
        <ImageWithFallback
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />

        {/* Top badges */}
        <div
          className="flex items-center justify-between"
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            right: 10,
          }}
        >
          <span
            style={{
              background: "rgba(11,11,16,0.72)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 5,
              padding: "3px 8px",
              fontFamily: "Outfit",
              fontWeight: 700,
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#EDECF5",
            }}
          >
            {card.category}
          </span>
          <span
            className="inline-flex items-center"
            style={{
              gap: 4,
              background: "rgba(11,11,16,0.72)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 5,
              padding: "3px 8px",
              fontFamily: "Outfit",
              fontWeight: 500,
              fontSize: 11,
              color: isLiked ? "#FF6B8A" : "#EDECF5",
            }}
          >
            <Heart size={11} fill={isLiked ? "#FF6B8A" : "none"} /> {formatLikes(displayLikes)}
          </span>
        </div>

        {/* Hover overlay */}
        <div
          className="opacity-0 group-hover:opacity-100"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(11,11,16,0.95) 0%, rgba(11,11,16,0.6) 30%, transparent 55%)",
            transition: "opacity 200ms ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 16,
          }}
        >
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
            {card.category}
          </div>
          <div
            style={{
              marginTop: 4,
              fontFamily: "Outfit",
              fontWeight: 500,
              fontSize: 13,
              color: "#EDECF5",
              lineHeight: 1.35,
            }}
          >
            {card.title}
          </div>
          <div className="flex" style={{ gap: 8, marginTop: 10 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                r.toggleLike(card.id);
              }}
              style={{
                ...overlayBtn,
                color: isLiked ? "#FF6B8A" : "#EDECF5",
                background: isLiked ? "rgba(255,107,138,0.15)" : "rgba(255,255,255,0.08)",
              }}
            >
              <Heart size={11} fill={isLiked ? "#FF6B8A" : "none"} />
              {isLiked ? "Liked" : "Like"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                r.toggleSave(card.id);
              }}
              style={{
                ...overlayBtn,
                color: isSaved ? "#B794F4" : "#EDECF5",
                background: isSaved ? "rgba(183,148,244,0.15)" : "rgba(255,255,255,0.08)",
              }}
            >
              <Bookmark size={11} fill={isSaved ? "#B794F4" : "none"} />
              {isSaved ? "Saved" : "Save"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpen(card);
              }}
              style={overlayBtn}
            >
              Copy ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatLikes(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "k";
  return String(n);
}

const overlayBtn: React.CSSProperties = {
  fontFamily: "Outfit",
  fontWeight: 500,
  fontSize: 11,
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 6,
  padding: "5px 10px",
  color: "#EDECF5",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
};
