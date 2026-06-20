import { useState } from "react";
import { LogOut, RefreshCw } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { syncFromNotion, usePrompts } from "./usePrompts";

export type NavView = "Explore" | "Trending" | "Collections" | "Favourites";

export function Navbar({
  view,
  onView,
  onLogin,
}: {
  view: NavView;
  onView: (v: NavView) => void;
  onLogin: () => void;
}) {
  const { user, signOut } = useAuth();
  const { syncing, lastSync, error } = usePrompts();
  const [menuOpen, setMenuOpen] = useState(false);

  const initials = (user?.name || user?.email || "?")
    .split(/[@.\s]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]!.toUpperCase())
    .join("");

  return (
    <header
      className="sticky top-0 z-30 w-full"
      style={{
        height: 60,
        background: "rgba(11, 11, 16, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="h-full flex items-center justify-between" style={{ padding: "0 40px" }}>
        <div
          className="flex items-center"
          style={{
            gap: 10,
            padding: "6px 14px 6px 10px",
            borderRadius: 999,
            background: "rgba(183,148,244,0.06)",
            border: "1px solid rgba(183,148,244,0.18)",
          }}
        >
          <span
            className="font-display"
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #B794F4, #6D5BBE)",
              boxShadow: "0 0 12px rgba(183,148,244,0.55)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B0B10",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "-0.02em",
            }}
          >
            V
          </span>
          <span
            className="font-display"
            style={{ fontFamily: '"Abhaya Libre", serif', fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", color: "#EDECF5" }}
          >Visulora</span>
        </div>

        <nav className="hidden md:flex items-center" style={{ gap: 28 }}>
          {(["Explore", "Trending", "Collections", "Favourites"] as NavView[]).map((item) => {
            const active = item === view;
            return (
              <button
                key={item}
                onClick={() => onView(item)}
                className="transition-colors"
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  fontFamily: "Outfit",
                  fontWeight: active ? 500 : 400,
                  fontSize: 13,
                  color: active ? "#EDECF5" : "#9896B0",
                  borderBottom: active
                    ? "1px solid rgba(183,148,244,0.6)"
                    : "1px solid transparent",
                  paddingBottom: 2,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#EDECF5")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = active ? "#EDECF5" : "#9896B0")
                }
              >
                {item}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center" style={{ gap: 14, position: "relative" }}>
          {user ? (
            <>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="font-display"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #B794F4, #6D5BBE)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#0B0B10",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "-0.02em",
                  cursor: "pointer",
                }}
              >
                {initials}
              </button>
              {menuOpen && (
                <div
                  onMouseLeave={() => setMenuOpen(false)}
                  style={{
                    position: "absolute",
                    top: 46,
                    right: 0,
                    background: "#13131A",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: 8,
                    minWidth: 200,
                    boxShadow: "0 12px 32px rgba(0,0,0,0.45)",
                    zIndex: 40,
                  }}
                >
                  <div
                    style={{
                      padding: "8px 10px",
                      fontFamily: "Outfit",
                      fontSize: 12,
                      color: "#9896B0",
                      borderBottom: "1px solid rgba(255,255,255,0.07)",
                      marginBottom: 6,
                    }}
                  >
                    <div style={{ color: "#EDECF5", fontWeight: 500, fontSize: 13 }}>
                      {user.name || "Account"}
                    </div>
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.email}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      onView("Favourites");
                    }}
                    style={menuItem}
                  >
                    My favourites
                  </button>
                  <button
                    onClick={async () => {
                      const res = await syncFromNotion();
                      if (res.ok) {
                        alert(
                          `Sync complete — added ${res.added}, updated ${res.updated}, skipped ${res.skipped}` +
                            (res.errors?.length ? `\n${res.errors.slice(0, 3).join("\n")}` : "")
                        );
                      } else {
                        alert(`Sync failed: ${res.error}`);
                      }
                    }}
                    disabled={syncing}
                    style={{ ...menuItem, opacity: syncing ? 0.6 : 1 }}
                  >
                    <RefreshCw size={13} className={syncing ? "animate-spin" : ""} />
                    {syncing ? "Syncing…" : "Sync from Notion"}
                  </button>
                  {lastSync && !syncing && (
                    <div
                      style={{
                        padding: "4px 10px 6px",
                        fontFamily: "Outfit",
                        fontSize: 11,
                        color: "#5C5A72",
                      }}
                    >
                      +{lastSync.added} new · {lastSync.updated} updated
                    </div>
                  )}
                  {error && (
                    <div
                      style={{
                        padding: "4px 10px 6px",
                        fontFamily: "Outfit",
                        fontSize: 11,
                        color: "#FCA5A5",
                      }}
                    >
                      {error.slice(0, 80)}
                    </div>
                  )}
                  <button
                    onClick={async () => {
                      setMenuOpen(false);
                      await signOut();
                    }}
                    style={{ ...menuItem, color: "#FCA5A5" }}
                  >
                    <LogOut size={13} /> Sign out
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={onLogin}
              className="transition-opacity hover:opacity-90"
              style={{
                fontFamily: "Outfit",
                fontWeight: 600,
                fontSize: 13,
                background: "#B794F4",
                color: "#0B0B10",
                borderRadius: 8,
                padding: "8px 18px",
                border: "none",
                cursor: "pointer",
                boxShadow:
                  "0 0 0 1px rgba(183,148,244,0.4), 0 6px 18px rgba(183,148,244,0.25)",
              }}
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

const menuItem: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  width: "100%",
  background: "transparent",
  border: "none",
  textAlign: "left",
  padding: "8px 10px",
  borderRadius: 8,
  fontFamily: "Outfit",
  fontSize: 13,
  color: "#EDECF5",
  cursor: "pointer",
};
