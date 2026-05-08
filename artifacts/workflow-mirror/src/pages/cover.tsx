import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

const TOKENS = {
  primary: "#166534",
  accent: "#92400E",
  bg: "#FBF8F4",
  text: "#3A3A3A",
  muted: "#8A7F70",
  rule: "#E5DBC8",
};

const AVATAR_SEEDS = [
  "Priya N.",
  "Marcus T.",
  "Jordan K.",
  "Sana A.",
  "Devon R.",
  "Lena M.",
  "Aiko F.",
  "Theo P.",
  "Maya S.",
  "Idris H.",
];

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=fef3c7,dcfce7,dbeafe,fee2e2,ede9fe&radius=50`;
}

type Peer = {
  seed: string;
  top: string;
  left: string;
  size: number;
  driftDuration: number;
  driftDelay: number;
  pulseDuration: number;
  pulseDelay: number;
  peakOpacity: number;
  driftVariant: 1 | 2 | 3 | 4;
};

const PEERS: Peer[] = [
  { seed: AVATAR_SEEDS[0], top: "12%", left: "72%", size: 64, driftDuration: 22, driftDelay: 0,   pulseDuration: 9,  pulseDelay: 0,   peakOpacity: 0.34, driftVariant: 1 },
  { seed: AVATAR_SEEDS[1], top: "26%", left: "88%", size: 48, driftDuration: 19, driftDelay: 3,   pulseDuration: 11, pulseDelay: 2,   peakOpacity: 0.30, driftVariant: 2 },
  { seed: AVATAR_SEEDS[2], top: "50%", left: "70%", size: 56, driftDuration: 24, driftDelay: 1,   pulseDuration: 12, pulseDelay: 4,   peakOpacity: 0.32, driftVariant: 3 },
  { seed: AVATAR_SEEDS[3], top: "64%", left: "90%", size: 42, driftDuration: 17, driftDelay: 5,   pulseDuration: 10, pulseDelay: 1,   peakOpacity: 0.28, driftVariant: 4 },
  { seed: AVATAR_SEEDS[4], top: "82%", left: "78%", size: 60, driftDuration: 21, driftDelay: 2,   pulseDuration: 13, pulseDelay: 6,   peakOpacity: 0.34, driftVariant: 1 },
  { seed: AVATAR_SEEDS[5], top: "92%", left: "60%", size: 44, driftDuration: 23, driftDelay: 4,   pulseDuration: 11, pulseDelay: 3,   peakOpacity: 0.26, driftVariant: 2 },
  { seed: AVATAR_SEEDS[6], top: "8%",  left: "4%",  size: 50, driftDuration: 20, driftDelay: 6,   pulseDuration: 12, pulseDelay: 5,   peakOpacity: 0.28, driftVariant: 3 },
  { seed: AVATAR_SEEDS[7], top: "78%", left: "3%",  size: 46, driftDuration: 25, driftDelay: 2.5, pulseDuration: 10, pulseDelay: 7,   peakOpacity: 0.30, driftVariant: 4 },
  { seed: AVATAR_SEEDS[8], top: "38%", left: "94%", size: 38, driftDuration: 18, driftDelay: 7,   pulseDuration: 9,  pulseDelay: 0,   peakOpacity: 0.26, driftVariant: 1 },
  { seed: AVATAR_SEEDS[9], top: "88%", left: "44%", size: 40, driftDuration: 19, driftDelay: 8,   pulseDuration: 11, pulseDelay: 4,   peakOpacity: 0.24, driftVariant: 2 },
];

const CONNECTORS = [
  { x1: "72%", y1: "15%", x2: "88%", y2: "28%", duration: 14, delay: 1 },
  { x1: "70%", y1: "53%", x2: "90%", y2: "66%", duration: 16, delay: 6 },
  { x1: "78%", y1: "85%", x2: "60%", y2: "94%", duration: 15, delay: 11 },
  { x1: "4%",  y1: "10%", x2: "3%",  y2: "80%", duration: 18, delay: 3 },
];

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
      {/* Ambient peer-avatar background layer */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none wm-peer-layer"
        style={{
          opacity: transitioning ? 0 : 1,
          transition: "opacity 320ms ease",
        }}
      >
        {/* Connector lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          style={{ overflow: "visible" }}
        >
          {CONNECTORS.map((c, i) => (
            <line
              key={i}
              x1={c.x1}
              y1={c.y1}
              x2={c.x2}
              y2={c.y2}
              stroke={TOKENS.rule}
              strokeWidth="1"
              strokeLinecap="round"
              className="wm-peer-connector"
              style={{
                animationDuration: `${c.duration}s`,
                animationDelay: `${c.delay}s`,
              }}
            />
          ))}
        </svg>

        {/* Avatars */}
        {PEERS.map((p, i) => (
          <div
            key={i}
            className={`absolute wm-peer wm-peer-drift-${p.driftVariant}`}
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              marginTop: `-${p.size / 2}px`,
              marginLeft: `-${p.size / 2}px`,
              animationDuration: `${p.driftDuration}s`,
              animationDelay: `${p.driftDelay}s`,
              ["--wm-peak" as string]: p.peakOpacity,
              ["--wm-pulse-duration" as string]: `${p.pulseDuration}s`,
              ["--wm-pulse-delay" as string]: `${p.pulseDelay}s`,
            }}
          >
            <div className="wm-peer-pulse w-full h-full">
              <img
                src={avatarUrl(p.seed)}
                alt=""
                width={p.size}
                height={p.size}
                loading="lazy"
                className="w-full h-full rounded-full"
                style={{
                  filter: "saturate(0.8)",
                  boxShadow: "0 1px 2px rgba(58,58,58,0.06)",
                }}
              />
            </div>
          </div>
        ))}

        {/* Soft cream wash to protect headline + body legibility */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 28% 50%, ${TOKENS.bg} 0%, ${TOKENS.bg} 32%, rgba(251,248,244,0) 65%)`,
          }}
        />
      </div>

      {/* Foreground content */}
      <div
        className="absolute inset-0 z-10 flex items-center px-[8vw] md:px-[10vw]"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(-12px)" : "translateY(0)",
          transition: "opacity 380ms ease, transform 380ms ease",
          animation: "wm-cover-fade 900ms ease-out both",
        }}
      >
        <div className="w-full max-w-[860px]">
          <div
            className="text-[12px] md:text-[13px] font-medium mb-12 md:mb-16"
            style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}
          >
            WORKFLOW MIRROR
          </div>

          <h1
            className="font-serif italic leading-[1.04] tracking-tight text-[44px] md:text-[78px]"
            style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Making private AI use visible.
          </h1>

          <h2
            className="font-serif italic leading-[1.1] tracking-tight text-[28px] md:text-[44px] mt-4 md:mt-6"
            style={{ color: TOKENS.primary, fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            So the 460 can learn from the 40.
          </h2>

          <div className="h-px w-[120px] mt-10 md:mt-12" style={{ backgroundColor: TOKENS.rule }} />

          <p
            className="mt-8 md:mt-10 text-[16px] md:text-[18px] leading-[1.6] max-w-[640px]"
            style={{ color: TOKENS.text }}
          >
            A peer-led workflow sharing feature built on Chico.ai. Active users share what works.
            Non-adopters discover it — filtered by role, surfaced at the right moment.
          </p>

          <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
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
              Explore Workflow Mirror
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

          <div className="mt-16 md:mt-20 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/about"
              data-testid="link-about-build"
              className="inline-flex items-center gap-2 text-[12px] font-medium uppercase hover:opacity-70 transition-opacity no-underline"
              style={{
                color: TOKENS.muted,
                letterSpacing: "0.28em",
              }}
            >
              About this build
              <ArrowRight className="w-3 h-3" strokeWidth={1.75} />
            </Link>
            <span aria-hidden style={{ color: TOKENS.rule }}>·</span>
            <Link
              href="/essay"
              data-testid="link-essay"
              className="inline-flex items-center gap-2 text-[12px] font-medium uppercase hover:opacity-70 transition-opacity no-underline"
              style={{
                color: TOKENS.muted,
                letterSpacing: "0.28em",
              }}
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
              style={{
                color: TOKENS.muted,
                letterSpacing: "0.28em",
              }}
            >
              One-pager (PDF)
              <ArrowRight className="w-3 h-3" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </div>

      {/* Inverted transition flash */}
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

      <style>{`
        @keyframes wm-cover-fade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .wm-peer {
          will-change: transform;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
        @keyframes wm-drift-1 {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(-14px, 10px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes wm-drift-2 {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(12px, -10px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes wm-drift-3 {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(-10px, -14px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes wm-drift-4 {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(14px, 12px); }
          100% { transform: translate(0, 0); }
        }
        .wm-peer-drift-1 { animation-name: wm-drift-1; }
        .wm-peer-drift-2 { animation-name: wm-drift-2; }
        .wm-peer-drift-3 { animation-name: wm-drift-3; }
        .wm-peer-drift-4 { animation-name: wm-drift-4; }

        @keyframes wm-peer-pulse {
          0%   { opacity: calc(var(--wm-peak) * 0.55); }
          50%  { opacity: var(--wm-peak); }
          100% { opacity: calc(var(--wm-peak) * 0.55); }
        }
        .wm-peer-pulse {
          opacity: var(--wm-peak);
          animation-name: wm-peer-pulse;
          animation-duration: var(--wm-pulse-duration);
          animation-delay: var(--wm-pulse-delay);
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        @keyframes wm-peer-connector {
          0%   { opacity: 0; }
          15%  { opacity: 0.55; }
          35%  { opacity: 0.55; }
          55%  { opacity: 0; }
          100% { opacity: 0; }
        }
        .wm-peer-connector {
          opacity: 0;
          animation-name: wm-peer-connector;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .wm-peer,
          .wm-peer-pulse,
          .wm-peer-connector {
            animation: none !important;
          }
          .wm-peer-pulse { opacity: var(--wm-peak); }
          .wm-peer-connector { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
