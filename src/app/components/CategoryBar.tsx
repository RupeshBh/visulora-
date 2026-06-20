import { CATEGORIES } from "./data";

export function CategoryBar({
  active,
  onChange,
}: {
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className="hide-scrollbar"
      style={{
        marginTop: 28,
        padding: "0 40px",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      <div className="inline-flex" style={{ gap: 8 }}>
        {CATEGORIES.map((c) => {
          const isActive = c === active;
          return (
            <button
              key={c}
              onClick={() => onChange(c)}
              className="transition-colors"
              style={{
                fontFamily: "Outfit",
                fontWeight: 500,
                fontSize: 12,
                color: isActive ? "#B794F4" : "#9896B0",
                background: isActive ? "rgba(183,148,244,0.1)" : "transparent",
                border: `1px solid ${
                  isActive ? "rgba(183,148,244,0.3)" : "rgba(255,255,255,0.1)"
                }`,
                borderRadius: 20,
                padding: "7px 16px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#EDECF5";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#9896B0";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }
              }}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}
