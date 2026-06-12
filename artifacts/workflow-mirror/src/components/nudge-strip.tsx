import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const T = {
  bg: "#FBF8F4",
  text: "#3A3A3A",
  primary: "#166534",
  accent: "#92400E",
  muted: "#8A7F70",
  mutedStrong: "#6B6358",
  rule: "#E5DBC8",
  serif: "'Playfair Display', Georgia, serif",
  ui: "'Inter', system-ui, sans-serif",
};

export const DISMISSED_KEY = "compass.nudgeStripDismissed";
const DEMO_DELAY_MS = 30_000;
const ALLOWED_PATHS = ["/feed", "/workflow"];

function getNudgeParam() {
  return new URLSearchParams(window.location.search).get("nudge");
}

export function NudgeStrip() {
  const [location] = useLocation();
  // Track search string separately — wouter's useLocation returns pathname only,
  // so we sync it on every location change to make the main effect react to
  // query-param changes (e.g. navigating to /feed?nudge=reset while already on /feed).
  const [search, setSearch] = useState(() => window.location.search);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [description, setDescription] = useState(
    "Sending renewal emails to clients due in May"
  );
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onAllowedPage = ALLOWED_PATHS.some((p) => location.startsWith(p));

  // Sync search whenever the SPA route changes.
  useEffect(() => {
    setSearch(window.location.search);
  }, [location]);

  // Listen for the admin-page reset event so the strip reappears immediately
  // without any page navigation or reload.
  useEffect(() => {
    function handleAdminReset() {
      localStorage.removeItem(DISMISSED_KEY);
      setDismissed(false);
      setVisible(true);
    }
    window.addEventListener("compass:nudge-reset", handleAdminReset);
    return () => window.removeEventListener("compass:nudge-reset", handleAdminReset);
  }, []);

  // Main visibility logic — re-runs whenever the allowed-page flag or search
  // string changes so ?nudge=reset and ?nudge=demo are always picked up.
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const nudgeParam = getNudgeParam();

    if (nudgeParam === "reset") {
      // Clear persisted flag AND in-memory state, then show immediately.
      localStorage.removeItem(DISMISSED_KEY);
      setDismissed(false);
      setVisible(true);
      return;
    }

    const wasDismissed = localStorage.getItem(DISMISSED_KEY) === "true";
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    if (!onAllowedPage) return;

    const delay = nudgeParam === "demo" ? 0 : DEMO_DELAY_MS;
    timerRef.current = setTimeout(() => setVisible(true), delay);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onAllowedPage, search]);

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, "true");
    setDismissed(true);
    setVisible(false);
  };

  if (dismissed || !onAllowedPage) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="nudge-strip"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4"
          style={{ fontFamily: T.ui }}
          data-testid="nudge-strip"
        >
          <div
            className="w-full max-w-2xl"
            style={{
              background: T.bg,
              border: `1px solid ${T.rule}`,
              borderRadius: 4,
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.07)",
              overflow: "hidden",
            }}
          >
            {/* Top accent line */}
            <div style={{ height: 3, background: T.primary }} />

            {/* Collapsed strip — always visible */}
            <div className="flex items-center gap-3 px-4 h-12">
              {/* Compass micro-mark */}
              <span
                className="shrink-0 inline-flex items-center justify-center text-[10px] font-semibold"
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 2,
                  background: T.primary,
                  color: T.bg,
                  fontFamily: T.serif,
                  fontStyle: "italic",
                }}
                aria-hidden="true"
              >
                C
              </span>

              {/* Pattern pill */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium min-w-0 overflow-hidden"
                style={{
                  background: "rgba(146,64,14,0.09)",
                  borderRadius: 999,
                  color: T.accent,
                }}
              >
                <span
                  className="shrink-0 inline-block rounded-full"
                  style={{ width: 6, height: 6, background: T.accent }}
                />
                <span className="truncate">Renewal emails · 4× this morning</span>
              </div>

              {/* Soft peer hint */}
              <p
                className="flex-1 text-[12px] truncate hidden sm:block"
                style={{ color: T.mutedStrong }}
              >
                2 colleagues have this as a workflow
              </p>

              {/* Save workflow button */}
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="inline-flex items-center gap-1.5 h-8 px-3 text-[12px] font-medium shrink-0 transition-opacity hover:opacity-85"
                style={{
                  background: T.primary,
                  color: T.bg,
                  borderRadius: 2,
                  border: `1px solid ${T.primary}`,
                }}
                data-testid="nudge-strip-toggle"
              >
                Save workflow
                {expanded ? (
                  <ChevronUp className="w-3 h-3" strokeWidth={2} />
                ) : (
                  <ChevronDown className="w-3 h-3" strokeWidth={2} />
                )}
              </button>

              {/* Dismiss */}
              <button
                type="button"
                onClick={handleDismiss}
                className="shrink-0 transition-opacity hover:opacity-60"
                style={{ color: T.muted }}
                aria-label="Dismiss"
                data-testid="nudge-strip-dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Expandable form */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="nudge-form"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ overflow: "hidden", borderTop: `1px solid ${T.rule}` }}
                >
                  <div className="px-4 pb-4 pt-3">
                    <p className="text-[11px] mb-2.5" style={{ color: T.mutedStrong }}>
                      We pre-filled what we detected — edit if needed, then hand to
                      Compeerly:
                    </p>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        className="flex-1 h-9 text-[13px] px-3 outline-none min-w-0"
                        style={{
                          background: "#fff",
                          border: `1px solid ${T.rule}`,
                          borderRadius: 2,
                          color: T.text,
                          fontFamily: T.ui,
                        }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        data-testid="nudge-strip-description"
                      />
                      <a
                        href={`${
                          import.meta.env.BASE_URL.replace(/\/$/, "")
                        }/capture?prefill=${encodeURIComponent(description)}`}
                        className="inline-flex items-center justify-center h-9 px-4 text-[13px] font-medium shrink-0 transition-opacity hover:opacity-85"
                        style={{
                          background: T.primary,
                          color: T.bg,
                          borderRadius: 2,
                          textDecoration: "none",
                        }}
                        data-testid="nudge-strip-cta"
                      >
                        ✨ Structure with Compeerly
                      </a>
                    </div>
                    <p className="text-[11px] mt-2.5" style={{ color: T.muted }}>
                      Or{" "}
                      <a
                        href={`${
                          import.meta.env.BASE_URL.replace(/\/$/, "")
                        }/feed`}
                        className="transition-opacity hover:opacity-70"
                        style={{
                          color: T.primary,
                          borderBottom: `1px solid ${T.rule}`,
                          paddingBottom: 1,
                          textDecoration: "none",
                        }}
                        data-testid="nudge-strip-browse"
                      >
                        see what your colleagues already built for this
                      </a>
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
