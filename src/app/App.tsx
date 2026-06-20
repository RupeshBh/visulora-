import { useEffect, useMemo, useState } from "react";
import { Navbar, type NavView } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { CategoryBar } from "./components/CategoryBar";
import { SortRow } from "./components/SortRow";
import { Gallery } from "./components/Gallery";
import { PromptDrawer } from "./components/PromptDrawer";
import { Collections } from "./components/Collections";
import { Favourites } from "./components/Favourites";
import { AuthProvider } from "./components/AuthProvider";
import { AuthModal } from "./components/AuthModal";
import { onRequireAuth } from "./components/useReactions";
import { trendingScore, type PromptCard } from "./components/data";
import { useSupabasePrompts } from "./components/useSupabasePrompts";

function AppInner() {
  const [view, setView] = useState<NavView>("Explore");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Trending");
  const [active, setActive] = useState<PromptCard | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const { cards: prompts, loading } = useSupabasePrompts();

  const filtered = useMemo(() => {
    const base = category === "All" ? prompts : prompts.filter((c) => c.category === category);
    const sorted = [...base];
    if (sort === "Popular") sorted.sort((a, b) => b.views - a.views);
    else if (sort === "Newest") sorted.sort((a, b) => a.createdDaysAgo - b.createdDaysAgo);
    else sorted.sort((a, b) => trendingScore(b) - trendingScore(a));
    return sorted;
  }, [category, sort, prompts]);

  useEffect(() => {
    const onFilter = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.category) {
        setView("Explore");
        setCategory(detail.category);
      }
    };
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const found = prompts.find((c) => c.id === detail?.id);
      if (found) setActive(found);
    };
    window.addEventListener("meizora:filter", onFilter);
    window.addEventListener("meizora:open", onOpen);
    return () => {
      window.removeEventListener("meizora:filter", onFilter);
      window.removeEventListener("meizora:open", onOpen);
    };
  }, [prompts]);

  useEffect(() => {
    return onRequireAuth(() => setAuthOpen(true));
  }, []);

  const trending = useMemo(
    () => [...prompts].sort((a, b) => trendingScore(b) - trendingScore(a)).slice(0, 18),
    [prompts]
  );

  // ✅ Loading check AFTER all hooks
  if (loading) return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: 100, fontFamily: 'Outfit' }}>
      Loading prompts...
    </div>
  );

  function handleLogoClick() {
    if (navigating) return; // prevent double-clicks
    setNavigating(true);
    setCategory("All");
    setTimeout(() => {
      setView("Explore");
      setNavigating(false);
    }, 1300);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B0B10",
        color: "#EDECF5",
        position: "relative",
        // ⚠️ overflowX intentionally NOT set here — even pairing overflowX:"hidden"
        // with overflowY:"visible" makes the browser silently force overflowY to "auto"
        // (per CSS spec), which breaks position:sticky on the Navbar below.
      }}
    >
      <style>{`
        @keyframes pulseLogo {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.75; }
        }
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: "30%",
          background:
            "radial-gradient(ellipse at center top, rgba(183,148,244,0.06) 0%, rgba(183,148,244,0) 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar view={view} onView={setView} onLogin={() => setAuthOpen(true)} onLogoClick={handleLogoClick} />

        {view === "Explore" && (
          <>
            <Hero />
            <CategoryBar active={category} onChange={setCategory} />
            <SortRow sort={sort} onSort={setSort} count={filtered.length} />
            <Gallery cards={filtered} onOpen={setActive} />
          </>
        )}

        {view === "Trending" && (
          <>
            <div style={{ padding: "48px 40px 0" }}>
              <div
                style={{
                  display: "inline-block",
                  background: "rgba(251,191,36,0.1)",
                  border: "1px solid rgba(251,191,36,0.25)",
                  borderRadius: 20,
                  padding: "5px 14px",
                  color: "#FBBF24",
                  fontFamily: "Outfit",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                ★ Trending this week
              </div>
              <h2
                className="font-display"
                style={{
                  fontFamily: '"Abhaya Libre", serif',
                  fontWeight: 600,
                  fontSize: 32,
                  letterSpacing: "-0.03em",
                  color: "#EDECF5",
                }}
              >
                What everyone's copying.
              </h2>
              <p
                style={{
                  marginTop: 6,
                  fontFamily: "Outfit",
                  fontWeight: 300,
                  fontSize: 15,
                  color: "#9896B0",
                }}
              >
                The most-loved prompts of the last 7 days.
              </p>
            </div>
            <Gallery cards={trending} onOpen={setActive} />
          </>
        )}

        {view === "Collections" && <Collections onOpen={setActive} />}
        {view === "Favourites" && (
          <Favourites onOpen={setActive} onLogin={() => setAuthOpen(true)} />
        )}
      </div>

      <PromptDrawer card={active} onClose={() => setActive(null)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      {navigating && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(11,11,16,0.92)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            animation: "fadeInOverlay 200ms ease",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #B794F4, #6D5BBE)",
              boxShadow: "0 0 24px rgba(183,148,244,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0B0B10",
              fontWeight: 700,
              fontSize: 22,
              fontFamily: "Abhaya Libre, serif",
              animation: "pulseLogo 1s ease-in-out infinite",
            }}
          >
            V
          </div>
          <div
            style={{
              fontFamily: "Outfit",
              fontWeight: 400,
              fontSize: 13,
              letterSpacing: "0.05em",
              color: "#9896B0",
            }}
          >
            Loading Visulora...
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
