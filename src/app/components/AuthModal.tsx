import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "./AuthProvider";

export function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      setErr("");
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      if (mode === "signin") await signIn(email, password);
      else await signUp(email, password, name);
      onClose();
      setEmail("");
      setPassword("");
      setName("");
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

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
          maxWidth: 420,
          background: "#13131A",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 20,
          padding: 28,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "transform 280ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="flex items-start justify-between" style={{ marginBottom: 20 }}>
          <div>
            <h2
              className="font-display"
              style={{
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: "-0.03em",
                color: "#EDECF5",
              }}
            >
              {mode === "signin" ? "Welcome back" : "Create an account"}
            </h2>
            <p
              style={{
                marginTop: 4,
                fontFamily: "Outfit",
                fontWeight: 300,
                fontSize: 13,
                color: "#9896B0",
              }}
            >
              {mode === "signin"
                ? "Sign in to save and like prompts."
                : "Save your favourites across devices."}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close" style={closeBtn}>
            <X size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 12 }}>
          {mode === "signup" && (
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={field}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            style={field}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            style={field}
          />

          {err && (
            <div
              style={{
                background: "rgba(248,113,113,0.08)",
                border: "1px solid rgba(248,113,113,0.25)",
                color: "#FCA5A5",
                borderRadius: 8,
                padding: "8px 12px",
                fontFamily: "Outfit",
                fontSize: 12,
              }}
            >
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            style={{
              marginTop: 4,
              width: "100%",
              height: 46,
              background: "#B794F4",
              color: "#0B0B10",
              border: "none",
              borderRadius: 12,
              fontFamily: "Outfit",
              fontWeight: 700,
              fontSize: 14,
              cursor: busy ? "default" : "pointer",
              opacity: busy ? 0.7 : 1,
            }}
          >
            {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div
          style={{
            marginTop: 18,
            textAlign: "center",
            fontFamily: "Outfit",
            fontSize: 13,
            color: "#9896B0",
          }}
        >
          {mode === "signin" ? (
            <>
              New to Visulora?{" "}
              <button onClick={() => setMode("signup")} style={linkBtn}>
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode("signin")} style={linkBtn}>
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const field: React.CSSProperties = {
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

const linkBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#B794F4",
  fontFamily: "Outfit",
  fontWeight: 600,
  fontSize: 13,
  cursor: "pointer",
  padding: 0,
};
