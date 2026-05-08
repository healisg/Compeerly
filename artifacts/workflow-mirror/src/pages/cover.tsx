import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowRight } from "lucide-react";

const TOKENS = {
  primary: "#166534",
  accent: "#92400E",
  bg: "#FBF8F4",
  text: "#3A3A3A",
  muted: "#8A7F70",
  rule: "#E5DBC8",
};

export default function CoverPage() {
  const [, navigate] = useLocation();
  const [transitioning, setTransitioning] = useState(false);

  const handleEnter = () => {
    setTransitioning(true);
    window.setTimeout(() => {
      navigate("/feed");
    }, 450);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: TOKENS.bg, color: TOKENS.text, fontFamily: "'Inter', system-ui, sans-serif" }}
      data-testid="cover-page"
    >
      <div
        className="absolute inset-0 flex items-center px-[8vw] md:px-[10vw]"
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

          <button
            type="button"
            onClick={handleEnter}
            data-testid="button-enter-feed"
            className="mt-10 md:mt-12 inline-flex items-center gap-3 px-7 py-4 text-[15px] font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
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
        </div>
      </div>

      {/* Inverted transition flash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none flex items-center px-[8vw] md:px-[10vw]"
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
      `}</style>
    </div>
  );
}
