import { Gallery } from "./Gallery";
import { useReactions } from "./useReactions";
import { useAuth } from "./AuthProvider";
import { type PromptCard } from "./data";
import { usePrompts } from "./usePrompts";

export function Favourites({
  onOpen,
  onLogin,
}: {
  onOpen: (card: PromptCard) => void;
  onLogin: () => void;
}) {
  const { user } = useAuth();
  const r = useReactions();
  const { prompts } = usePrompts();

  if (!user) {
    return (
      <div style={{ padding: "80px 40px", textAlign: "center" }}>
        <h2
          className="font-display"
          style={{
            fontFamily: '"Abhaya Libre", serif',
            fontWeight: 600,
            fontSize: 32,
            letterSpacing: "-0.03em",
            color: "#EDECF5",
            marginBottom: 10,
          }}
        >
          Your favourites live here.
        </h2>
        <p
          style={{
            fontFamily: "Outfit",
            fontWeight: 300,
            fontSize: 15,
            color: "#9896B0",
            marginBottom: 24,
          }}
        >
          Log in to see the prompts you've liked and saved.
        </p>
        <button
          onClick={onLogin}
          style={{
            fontFamily: "Outfit",
            fontWeight: 600,
            fontSize: 13,
            background: "#B794F4",
            color: "#0B0B10",
            borderRadius: 8,
            padding: "10px 22px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 0 1px rgba(183,148,244,0.4), 0 6px 18px rgba(183,148,244,0.25)",
          }}
        >
          Log in
        </button>
      </div>
    );
  }

  const likedIds = new Set(r.likedIds());
  const savedIds = new Set(r.savedIds());
  const liked = prompts.filter((c) => likedIds.has(c.id));
  const saved = prompts.filter((c) => savedIds.has(c.id));

  return (
    <div>
      <div style={{ padding: "48px 40px 0" }}>
        <div
          style={{
            display: "inline-block",
            background: "rgba(244,114,182,0.1)",
            border: "1px solid rgba(244,114,182,0.25)",
            borderRadius: 20,
            padding: "5px 14px",
            color: "#F472B6",
            fontFamily: "Outfit",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          ♥ Your favourites
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
          Liked & saved prompts.
        </h2>
      </div>

      <Section title={`Liked (${liked.length})`} empty="No likes yet — tap the heart on any prompt.">
        {liked.length > 0 && <Gallery cards={liked} onOpen={onOpen} />}
      </Section>

      <Section title={`Saved (${saved.length})`} empty="No saves yet — tap the bookmark on any prompt.">
        {saved.length > 0 && <Gallery cards={saved} onOpen={onOpen} />}
      </Section>
    </div>
  );
}

function Section({
  title,
  empty,
  children,
}: {
  title: string;
  empty: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginTop: 36 }}>
      <div style={{ padding: "0 40px 12px" }}>
        <h3
          className="font-display"
          style={{
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: "-0.02em",
            color: "#EDECF5",
          }}
        >
          {title}
        </h3>
      </div>
      {children || (
        <div
          style={{
            margin: "0 40px",
            padding: "32px",
            border: "1px dashed rgba(255,255,255,0.1)",
            borderRadius: 16,
            textAlign: "center",
            fontFamily: "Outfit",
            fontWeight: 300,
            fontSize: 14,
            color: "#9896B0",
          }}
        >
          {empty}
        </div>
      )}
    </div>
  );
}
