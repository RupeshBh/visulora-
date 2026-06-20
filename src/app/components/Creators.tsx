const CREATORS = [
  { name: "Yuki Tanaka", handle: "@yuki.frames", prompts: 142, followers: "18.4k", specialty: "Cinematic" },
  { name: "Mara Solis", handle: "@marasolis", prompts: 96, followers: "12.1k", specialty: "Fashion & Editorial" },
  { name: "Eli Bergmann", handle: "@eli.b", prompts: 211, followers: "29.7k", specialty: "Architecture" },
  { name: "Noor Rahimi", handle: "@noor.studio", prompts: 78, followers: "9.3k", specialty: "Portrait" },
  { name: "Kai Whitford", handle: "@kaiwf", prompts: 154, followers: "21.0k", specialty: "Anime & Illustration" },
  { name: "Lena Park", handle: "@lenapark", prompts: 63, followers: "7.8k", specialty: "Dark & Moody" },
];

export function Creators() {
  return (
    <div style={{ padding: "32px 40px 64px" }}>
      <h2
        className="font-display"
        style={{
          fontWeight: 600,
          fontSize: 32,
          letterSpacing: "-0.03em",
          color: "#EDECF5",
          marginBottom: 8,
        }}
      >
        Creators
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
        Prompt engineers shaping the visual conversation.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 12,
        }}
      >
        {CREATORS.map((c) => (
          <div
            key={c.handle}
            style={{
              background: "#13131A",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: 20,
              transition: "border-color 180ms ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")
            }
          >
            <div className="flex items-center" style={{ gap: 12 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, #B794F4, #6D5BBE)`,
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Outfit",
                  fontWeight: 600,
                  fontSize: 16,
                  color: "#0B0B10",
                }}
              >
                {c.name.split(" ").map((s) => s[0]).join("")}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "Outfit",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "#EDECF5",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontFamily: "Outfit",
                    fontWeight: 400,
                    fontSize: 12,
                    color: "#9896B0",
                  }}
                >
                  {c.handle}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 14,
                display: "inline-block",
                background: "rgba(183,148,244,0.1)",
                border: "1px solid rgba(183,148,244,0.25)",
                borderRadius: 6,
                padding: "3px 8px",
                color: "#B794F4",
                fontFamily: "Outfit",
                fontWeight: 700,
                fontSize: 9,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {c.specialty}
            </div>

            <div
              className="flex items-center"
              style={{
                marginTop: 14,
                gap: 16,
                fontFamily: "Outfit",
                fontSize: 12,
                color: "#9896B0",
              }}
            >
              <span>
                <span style={{ color: "#EDECF5", fontWeight: 500 }}>{c.prompts}</span> prompts
              </span>
              <span>
                <span style={{ color: "#EDECF5", fontWeight: 500 }}>{c.followers}</span>{" "}
                followers
              </span>
            </div>

            <button
              style={{
                marginTop: 14,
                width: "100%",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#EDECF5",
                fontFamily: "Outfit",
                fontWeight: 500,
                fontSize: 12,
                borderRadius: 8,
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
