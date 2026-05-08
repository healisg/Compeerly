import React from "react";
import { ArrowRight } from "lucide-react";

export function HybridDataPeekAnimated() {
  const activeIndices = [
    12, 45, 67, 89, 102, 134, 156, 178, 199, 215, 234, 256, 278, 290, 312, 345, 367,
    389, 401, 423, 445, 467, 489, 15, 38, 72, 94, 115, 147, 182, 205, 248, 271, 305,
    338, 372, 395, 418, 452, 475,
  ].sort((a, b) => a - b);

  const activeSet = new Set(activeIndices);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "#FBF8F4",
        color: "#3A3A3A",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>
        {`
          @keyframes compass-dot-in {
            0%   { opacity: 0; transform: scale(0.4); }
            60%  { opacity: 1; transform: scale(1.18); }
            100% { opacity: 1; transform: scale(1.1); }
          }
          @keyframes compass-card-in {
            0%   { opacity: 0; transform: translateY(12px) rotate(-4deg) scale(0.98); }
            100% { opacity: 1; transform: translateY(0) rotate(-4deg) scale(1); }
          }
        `}
      </style>

      <main className="flex-1 flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto">
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 lg:px-20 py-12 lg:py-0">
          <div className="mb-16">
            <svg
              width="48"
              height="48"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: "#166534" }}
            >
              <circle
                cx="32"
                cy="32"
                r="29"
                stroke="currentColor"
                strokeWidth={2.2}
                fill="none"
              />
              <g transform="rotate(-22 32 32)">
                <path d="M32 10 L36 32 L32 54 L28 32 Z" fill="currentColor" />
                <circle cx="32" cy="32" r="2.2" fill="#FBF8F4" />
              </g>
            </svg>
          </div>

          <div className="space-y-6 max-w-2xl">
            <p
              className="uppercase font-semibold text-sm tracking-[0.2em]"
              style={{ color: "#8A7F70" }}
            >
              COMPASS
            </p>
            <h1
              className="text-5xl lg:text-6xl tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Making private AI use <i className="italic">visible.</i>
            </h1>
            <h2
              className="text-2xl lg:text-3xl"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#166534",
              }}
            >
              So the <i className="italic">460</i> can learn from the <i className="italic">40</i>.
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              A peer-led workflow sharing feature built on Chico.ai. Active users share what works. Non-adopters discover it — filtered by role, surfaced at the right moment.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <button
              className="flex items-center gap-2 px-8 py-4 rounded-sm font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#166534", color: "#FFFFFF", borderRadius: "2px" }}
            >
              Explore Compass
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#"
              className="font-medium transition-colors hover:opacity-70"
              style={{ color: "#3A3A3A", borderBottom: "1px solid #3A3A3A" }}
            >
              See the admin view
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center items-center px-8 lg:px-12 bg-white/30 backdrop-blur-sm relative border-l border-black/5 py-12 lg:py-0">
          <div className="relative w-full max-w-[500px]">
            {/* The Dot Grid */}
            <div
              className="grid gap-2 lg:gap-3 w-full"
              style={{
                gridTemplateColumns: "repeat(20, minmax(0, 1fr))",
              }}
            >
              {Array.from({ length: 500 }).map((_, i) => {
                const isActive = activeSet.has(i);
                if (isActive) {
                  const order = activeIndices.indexOf(i);
                  const delay = 300 + order * 35;
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-full"
                      style={{
                        backgroundColor: "#166534",
                        boxShadow: "0 0 10px rgba(22,101,52,0.6)",
                        animation: `compass-dot-in 520ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms forwards`,
                        opacity: 0,
                        transform: "scale(0.4)",
                      }}
                    />
                  );
                } else {
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-full"
                      style={{
                        border: "1px solid #E5DBC8",
                        opacity: 0.4,
                      }}
                    />
                  );
                }
              })}
            </div>

            {/* Overlapping Workflow Card */}
            <div className="absolute -bottom-10 -right-6 lg:-bottom-12 lg:-right-10 pointer-events-none w-[280px]">
              {/* Ghost Duplicate behind */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #E5DBC8",
                  borderRadius: "2px",
                  transform: "rotate(-8deg) translate(8px, 12px)",
                  opacity: 0.5,
                  animation: `compass-card-in 600ms cubic-bezier(0.22, 1, 0.36, 1) 1900ms forwards`,
                  animationFillMode: "forwards"
                }}
              />

              {/* Main Card */}
              <div
                className="relative w-full p-5 flex flex-col gap-4"
                style={{
                  backgroundColor: "#FBF8F4",
                  border: "1px solid #E5DBC8",
                  borderRadius: "2px",
                  boxShadow: "0 18px 40px -20px rgba(58,58,58,0.25), 0 2px 6px rgba(58,58,58,0.06)",
                  transform: "rotate(-4deg)",
                  opacity: 0,
                  animation: `compass-card-in 600ms cubic-bezier(0.22, 1, 0.36, 1) 1900ms forwards`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{ backgroundColor: "#166534", color: "#FFFFFF" }}
                  >
                    PN
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold" style={{ color: "#3A3A3A" }}>
                      Priya N.
                    </span>
                    <span className="text-xs" style={{ color: "#8A7F70" }}>
                      Senior PM · Product
                    </span>
                  </div>
                </div>

                <div
                  className="text-sm leading-snug italic"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  "Turning customer interviews into a one-page synthesis"
                </div>

                <div className="flex gap-2 mt-1">
                  <span
                    className="text-xs px-2 py-1 rounded-sm"
                    style={{ backgroundColor: "#E5DBC8", color: "#3A3A3A" }}
                  >
                    Claude
                  </span>
                  <span
                    className="text-xs px-2 py-1 rounded-sm"
                    style={{
                      backgroundColor: "rgba(22,101,52,0.12)",
                      color: "#166534",
                    }}
                  >
                    45 min with Compass
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p
            className="mt-16 text-center text-sm"
            style={{ color: "#8A7F70" }}
          >
            40 of 500 users drive most AI activity.
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer
        className="flex items-center justify-between px-8 lg:px-20 py-8"
        style={{ borderTop: "1px solid #E5DBC8" }}
      >
        <span
          className="text-xs uppercase"
          style={{ letterSpacing: "0.28em", color: "#8A7F70" }}
        >
          COMPASS
        </span>
        <a
          href="https://www.linkedin.com/in/gordonhealis/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "#3A3A3A" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Builder: Gordon Healis
        </a>
      </footer>
    </div>
  );
}
