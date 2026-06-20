import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";
import { CATEGORIES } from "./data";

export function SubmitModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      requestAnimationFrame(() => setMounted(true));
    } else setMounted(false);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        opacity: mounted ? 1 : 0,
        transition: "opacity 220ms ease",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 560,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#13131A",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 20,
          padding: 28,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="flex items-start justify-between" style={{ marginBottom: 18 }}>
          <div>
            <h2
              className="font-display"
              style={{
                fontWeight: 600,
                fontSize: 28,
                letterSpacing: "-0.03em",
                color: "#EDECF5",
              }}
            >
              Share your prompt
            </h2>
            <p
              style={{
                marginTop: 6,
                fontFamily: "Outfit",
                fontWeight: 300,
                fontSize: 14,
                color: "#9896B0",
              }}
            >
              Help the community discover prompts that create stunning results.
            </p>
          </div>
          <button
            onClick={onClose}
            style={closeBtn}
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>

        {submitted ? (
          <div
            style={{
              padding: "32px 16px",
              textAlign: "center",
              fontFamily: "Outfit",
              color: "#EDECF5",
            }}
          >
            <div style={{ fontSize: 32, color: "#4ADE80", marginBottom: 8 }}>✓</div>
            <div style={{ fontWeight: 500 }}>Submitted for review</div>
            <div style={{ color: "#9896B0", fontSize: 13, marginTop: 4 }}>
              We'll let you know once it's approved.
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              setTimeout(onClose, 1400);
            }}
            className="flex flex-col"
            style={{ gap: 14 }}
          >
            <label
              style={{
                border: "1px dashed rgba(183,148,244,0.25)",
                borderRadius: 14,
                height: 160,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#5C5A72",
                fontFamily: "Outfit",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              <Upload size={20} />
              Drop your AI-generated image here or click to browse
              <input type="file" accept="image/*" hidden />
            </label>

            <textarea
              placeholder="Prompt text…"
              required
              style={{
                ...fieldStyle,
                minHeight: 120,
                fontFamily: "JetBrains Mono",
                fontSize: 12,
                lineHeight: 1.7,
                resize: "vertical",
              }}
            />

            <input placeholder="Title" required style={fieldStyle} />

            <select required defaultValue="" style={fieldStyle}>
              <option value="" disabled>
                AI Model used…
              </option>
              {["Midjourney", "FLUX", "DALL·E 3", "Stable Diffusion", "ChatGPT Image", "Other"].map(
                (m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                )
              )}
            </select>

            <select required defaultValue="" style={fieldStyle}>
              <option value="" disabled>
                Category…
              </option>
              {CATEGORIES.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              type="submit"
              style={{
                marginTop: 6,
                width: "100%",
                height: 48,
                background: "#B794F4",
                color: "#0B0B10",
                border: "none",
                borderRadius: 12,
                fontFamily: "Outfit",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              Submit for Review
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const fieldStyle: React.CSSProperties = {
  background: "#0B0B10",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  padding: "12px 16px",
  color: "#EDECF5",
  fontFamily: "Outfit",
  fontWeight: 400,
  fontSize: 14,
  outline: "none",
  width: "100%",
};

const closeBtn: React.CSSProperties = {
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
};
