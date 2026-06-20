import { useEffect, useState } from "react";
import { X, Copy, Check, Heart, Bookmark } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { PromptCard } from "./data";
import { useReactions } from "./useReactions";

export function PromptDrawer({
  card,
  onClose,
}: {
  card: PromptCard | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const r = useReactions();

  useEffect(() => {
    if (card) {
      setCopied(false);
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [card]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (card) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, onClose]);

  if (!card) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(card.prompt);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        opacity: mounted ? 1 : 0,
        transition: "opacity 220ms ease",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "calc(100% - 24px)",
          maxWidth: 640,
          marginBottom: 24,
          background: "#13131A",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 20,
          overflow: "hidden",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          transform: mounted ? "translateY(0)" : "translateY(32px)",
          transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div style={{ width: "100%", height: 220, overflow: "hidden", flexShrink: 0 }}>
          <ImageWithFallback
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div style={{ padding: "22px 24px", overflowY: "auto" }}>
          <div className="flex items-start justify-between" style={{ gap: 16 }}>
            <div>
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(183,148,244,0.1)",
                  border: "1px solid rgba(183,148,244,0.25)",
                  borderRadius: 6,
                  padding: "3px 8px",
                  color: "#B794F4",
                  fontFamily: "Outfit",
                  fontWeight: 700,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {card.category}
              </span>
              <h2
                className="font-display"
                style={{
                  marginTop: 10,
                  fontWeight: 600,
                  fontSize: 20,
                  color: "#EDECF5",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.25,
                }}
              >
                {card.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                width: 34,
                height: 34,
                background: "#1A1A24",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "#9896B0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <X size={14} />
            </button>
          </div>

          <div
            style={{
              marginTop: 18,
              background: "#0B0B10",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: "16px 18px",
            }}
          >
            <div
              style={{
                fontFamily: "Outfit",
                fontWeight: 700,
                fontSize: 9,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#5C5A72",
                marginBottom: 10,
              }}
            >
              Prompt
            </div>
            <div
              className="font-mono-prompt"
              style={{
                fontSize: 12,
                lineHeight: 1.8,
                color: "#C5C3D8",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {card.prompt}
            </div>
          </div>

          <div className="flex" style={{ gap: 8, marginTop: 14 }}>
            <button
              onClick={() => r.toggleLike(card.id)}
              style={{
                ...iconBtn,
                color: r.liked(card.id) ? "#FF6B8A" : "#EDECF5",
                background: r.liked(card.id) ? "rgba(255,107,138,0.12)" : "#1A1A24",
                borderColor: r.liked(card.id)
                  ? "rgba(255,107,138,0.35)"
                  : "rgba(255,255,255,0.1)",
              }}
            >
              <Heart size={14} fill={r.liked(card.id) ? "#FF6B8A" : "none"} />
              {r.liked(card.id) ? "Liked" : "Like"}
            </button>
            <button
              onClick={() => r.toggleSave(card.id)}
              style={{
                ...iconBtn,
                color: r.saved(card.id) ? "#B794F4" : "#EDECF5",
                background: r.saved(card.id) ? "rgba(183,148,244,0.12)" : "#1A1A24",
                borderColor: r.saved(card.id)
                  ? "rgba(183,148,244,0.35)"
                  : "rgba(255,255,255,0.1)",
              }}
            >
              <Bookmark size={14} fill={r.saved(card.id) ? "#B794F4" : "none"} />
              {r.saved(card.id) ? "Saved" : "Save"}
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="transition-all"
            style={{
              marginTop: 14,
              width: "100%",
              height: 48,
              background: copied ? "#4ADE80" : "#B794F4",
              color: "#0B0B10",
              border: "none",
              borderRadius: 12,
              fontFamily: "Outfit",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              transition: "background 300ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied!" : "Copy Prompt"}
          </button>

          <div
            className="hide-scrollbar flex"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: 14,
              marginTop: 18,
              gap: 8,
              overflowX: "auto",
            }}
          >
            {card.model && <Chip label={card.model} />}
            {card.tags.map((t) => (
              <Chip key={t} label={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const iconBtn: React.CSSProperties = {
  flex: 1,
  height: 40,
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  fontFamily: "Outfit",
  fontWeight: 500,
  fontSize: 13,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  transition: "all 180ms ease",
};

function Chip({ label }: { label: string }) {
  return (
    <span
      style={{
        whiteSpace: "nowrap",
        background: "#1A1A24",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 6,
        padding: "4px 10px",
        color: "#9896B0",
        fontFamily: "Outfit",
        fontWeight: 500,
        fontSize: 11,
      }}
    >
      {label}
    </span>
  );
}
