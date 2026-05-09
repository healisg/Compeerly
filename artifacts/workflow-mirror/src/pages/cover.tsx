import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import { CompassMark } from "@/components/compass-mark";

const TOKENS = {
  primary: "#166534",
  accent: "#92400E",
  bg: "#FBF8F4",
  text: "#3A3A3A",
  muted: "#8A7F70",
  rule: "#E5DBC8",
};

// Hardcoded indices for the 40 active users (out of 500) — stable, hand-picked
// to scatter across the 25x20 grid so the pattern reads as "spread, not clustered".
const ACTIVE_INDICES_ARR = [
  12, 45, 67, 89, 102, 134, 156, 178, 199, 215,
  234, 256, 278, 290, 312, 345, 367, 389, 401, 423,
  445, 467, 489, 15, 38, 72, 94, 115, 147, 182,
  205, 248, 271, 305, 338, 372, 395, 418, 452, 475,
];
const ACTIVE_INDICES = new Set(ACTIVE_INDICES_ARR);
// Stagger order: each active dot gets an index 0..39, used to delay its reveal.
const ACTIVE_ORDER: Record<number, number> = ACTIVE_INDICES_ARR
  .slice()
  .sort((a, b) => a - b)
  .reduce((acc, idx, order) => {
    acc[idx] = order;
    return acc;
  }, {} as Record<number, number>);

const TOTAL_DOTS = 500;
const GRID_COLS = 20;

export default function CoverPage() {
  const [, navigate] = useLocation();
  const [transitioning, setTransitioning] = useState(false);

  const handleEnter = () => {
    setTransitioning(true);
    window.setTimeout(() => {
      navigate("/feed");
    }, 1200);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: TOKENS.bg, color: TOKENS.text, fontFamily: "'Inter', system-ui, sans-serif" }}
      data-testid="cover-page"
    >
      <main
        className="relative z-10 flex min-h-screen flex-col lg:flex-row"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(-12px)" : "translateY(0)",
          transition: "opacity 380ms ease, transform 380ms ease",
          animation: "wm-cover-fade 900ms ease-out both",
        }}
      >
        <div className="flex w-full flex-col justify-center px-[8vw] pt-12 pb-10 lg:w-[55%] lg:px-[6vw] lg:pt-12 lg:pb-14">
          <div className="mb-10 lg:mb-12" style={{ color: TOKENS.primary }}>
            <CompassMark size={48} />
          </div>

          <div className="max-w-[640px] space-y-5 lg:space-y-6">
            <div
              className="text-[12px] md:text-[13px] font-medium"
              style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}
            >
              COMPASS
            </div>

            <h1
              className="font-serif leading-[1.04] tracking-tight text-[44px] md:text-[68px]"
              style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Making private AI use <em className="italic">visible.</em>
            </h1>

            <h2
              className="font-serif leading-[1.1] tracking-tight text-[26px] md:text-[36px]"
              style={{ color: TOKENS.primary, fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              So the <em className="italic">460</em> can learn from the <em className="italic">40.</em>
            </h2>

            <p
              className="text-[16px] md:text-[18px] leading-[1.6] max-w-[560px]"
              style={{ color: TOKENS.text }}
            >
              A peer-led workflow sharing feature built on Chico.ai. Active users share what works.
              Non-adopters discover it — filtered by role, surfaced at the right moment.
            </p>
          </div>

          <div className="mt-9 md:mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <button
              type="button"
              onClick={handleEnter}
              data-testid="button-enter-feed"
              className="inline-flex items-center gap-3 px-7 py-4 text-[15px] font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                backgroundColor: TOKENS.primary,
                fontFamily: "'Inter', system-ui, sans-serif",
                borderRadius: "2px",
                letterSpacing: "0.01em",
              }}
            >
              Explore Compass
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
            <Link
              href="/admin"
              data-testid="link-admin-view"
              className="inline-flex items-center gap-2 text-[14px] font-medium hover:opacity-70 transition-opacity no-underline"
              style={{
                color: TOKENS.muted,
                borderBottom: `1px solid ${TOKENS.rule}`,
                paddingBottom: "2px",
                letterSpacing: "0.01em",
              }}
            >
              See the admin view
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </Link>
          </div>

          <div className="mt-11 md:mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/about"
              data-testid="link-about-build"
              className="inline-flex items-center gap-2 text-[12px] font-medium uppercase hover:opacity-70 transition-opacity no-underline"
              style={{ color: TOKENS.muted, letterSpacing: "0.28em" }}
            >
              About this build
              <ArrowRight className="w-3 h-3" strokeWidth={1.75} />
            </Link>
            <span aria-hidden style={{ color: TOKENS.rule }}>·</span>
            <Link
              href="/essay"
              data-testid="link-essay"
              className="inline-flex items-center gap-2 text-[12px] font-medium uppercase hover:opacity-70 transition-opacity no-underline"
              style={{ color: TOKENS.muted, letterSpacing: "0.28em" }}
            >
              The argument
              <ArrowRight className="w-3 h-3" strokeWidth={1.75} />
            </Link>
            <span aria-hidden style={{ color: TOKENS.rule }}>·</span>
            <a
              href={`${import.meta.env.BASE_URL}workflow-mirror-one-pager.pdf`}
              download
              data-testid="link-one-pager-pdf"
              className="inline-flex items-center gap-2 text-[12px] font-medium uppercase hover:opacity-70 transition-opacity no-underline"
              style={{ color: TOKENS.muted, letterSpacing: "0.28em" }}
            >
              One-pager (PDF)
              <ArrowRight className="w-3 h-3" strokeWidth={1.75} />
            </a>
          </div>
        </div>

        <div
          className="relative flex w-full items-center justify-center px-[8vw] pb-24 pt-4 lg:w-[45%] lg:border-l lg:px-12 lg:pb-12 lg:pt-12"
          style={{ borderColor: "rgba(58,58,58,0.06)" }}
        >
          <div className="w-full max-w-[520px]">
            <div
              aria-hidden="true"
              className="grid gap-2 lg:gap-3"
              style={{ gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: TOTAL_DOTS }).map((_, i) => {
                const isActive = ACTIVE_INDICES.has(i);
                const order = isActive ? ACTIVE_ORDER[i] ?? 0 : 0;
                const delayMs = isActive ? 300 + order * 35 : 0;
                return (
                  <div
                    key={i}
                    className={isActive ? "wm-dot wm-dot-active" : "wm-dot wm-dot-muted"}
                    style={
                      isActive
                        ? ({ ["--wm-dot-delay" as string]: `${delayMs}ms` } as React.CSSProperties)
                        : undefined
                    }
                  />
                );
              })}
            </div>
            <div
              className="mt-8 text-center text-[13px] tracking-wide"
              style={{ color: TOKENS.muted }}
            >
              40 of 500 users drive most AI activity.
            </div>
          </div>
        </div>
      </main>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center px-[8vw] md:px-[10vw] z-20"
        style={{
          backgroundColor: TOKENS.primary,
          opacity: transitioning ? 1 : 0,
          transition: "opacity 280ms ease 120ms",
        }}
      >
        <div
          className="font-serif italic text-[44px] md:text-[78px] leading-[1.04]"
          style={{
            color: "#FFFFFF",
            fontFamily: "'Playfair Display', Georgia, serif",
            opacity: transitioning ? 1 : 0,
            transform: transitioning ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 280ms ease 200ms, transform 320ms ease 200ms",
          }}
        >
          Making private AI use visible.
        </div>
      </div>

      <footer
        className="absolute bottom-6 left-[8vw] right-[8vw] z-30 flex items-center justify-between text-[12px] uppercase tracking-[0.28em]"
        style={{ color: TOKENS.muted }}
      >
        <span>Compass</span>
        <a
          href="https://www.linkedin.com/in/gordonhealis/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity no-underline"
          style={{ color: TOKENS.muted }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Builder: Gordon Healis
        </a>
      </footer>

      <style>{`
        @keyframes wm-cover-fade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wm-dot {
          aspect-ratio: 1 / 1;
          border-radius: 9999px;
        }
        .wm-dot-muted {
          background-color: transparent;
          border: 1px solid ${TOKENS.rule};
          opacity: 0.4;
        }
        .wm-dot-active {
          background-color: ${TOKENS.primary};
          border: 1px solid ${TOKENS.primary};
          box-shadow: 0 0 10px ${TOKENS.primary}40;
          opacity: 0;
          transform: scale(0.4);
          animation: wm-dot-in 520ms cubic-bezier(0.22, 1, 0.36, 1) var(--wm-dot-delay, 0ms) forwards;
        }
        @keyframes wm-dot-in {
          0%   { opacity: 0; transform: scale(0.4); }
          60%  { opacity: 1; transform: scale(1.18); }
          100% { opacity: 1; transform: scale(1.1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .wm-dot-active {
            animation: none !important;
            opacity: 1 !important;
            transform: scale(1.1) !important;
          }
        }
      `}</style>
    </div>
  );
}
