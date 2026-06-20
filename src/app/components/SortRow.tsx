const TABS = ["Trending", "Newest", "Popular"] as const;

export function SortRow({
  sort,
  onSort,
  count,
}: {
  sort: string;
  onSort: (v: string) => void;
  count: number;
}) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ marginTop: 24, padding: "0 40px" }}
    >
      <div
        className="inline-flex"
        style={{
          background: "#13131A",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 10,
          padding: 3,
        }}
      >
        {TABS.map((t) => {
          const active = t === sort;
          return (
            <button
              key={t}
              onClick={() => onSort(t)}
              style={{
                background: active ? "#1A1A24" : "transparent",
                color: active ? "#EDECF5" : "#9896B0",
                fontFamily: "Outfit",
                fontWeight: active ? 500 : 400,
                fontSize: 12,
                border: "none",
                borderRadius: 8,
                padding: "6px 14px",
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          );
        })}
      </div>
      <span
        style={{
          fontFamily: "Outfit",
          fontWeight: 400,
          fontSize: 12,
          color: "#5C5A72",
        }}
      >
        {count.toLocaleString()} prompts
      </span>
    </div>
  );
}
