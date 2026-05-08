import React from "react";
import { ArrowRight } from "lucide-react";

export function HybridDataPeek() {
  const activeIndices = new Set([
    12, 45, 67, 89, 102, 134, 156, 178, 199, 215, 234, 256, 278, 290, 312, 345,
    367, 389, 401, 423, 445, 467, 489, 15, 38, 72, 94, 115, 147, 182, 205, 248,
    271, 305, 338, 372, 395, 418, 452, 475,
  ]);

  const totalDots = 500;
  const dots = Array.from({ length: totalDots }).map((_, i) => i);

  return (
    <div
      className="min-h-screen flex flex-col w-full"
      style={{ backgroundColor: "#FBF8F4", fontFamily: "'Inter', system-ui, sans-serif", color: "#3A3A3A" }}
    >
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto">
        {/* LEFT COLUMN */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 lg:px-20 py-12 lg:py-0">
          <div className="mb-16">
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "#166534" }}>
              <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth={2.2} fill="none" />
              <g transform="rotate(-22 32 32)">
                <path d="M32 10 L36 32 L32 54 L28 32 Z" fill="currentColor" />
                <circle cx="32" cy="32" r="2.2" fill="#FBF8F4" />
              </g>
            </svg>
          </div>

          <div className="space-y-6 max-w-2xl">
            <p className="uppercase text-sm font-semibold tracking-[0.2em]" style={{ color: "#8A7F70" }}>
              COMPASS
            </p>
            <h1 className="text-5xl lg:text-6xl font-medium leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Making private AI use <i style={{ fontStyle: "italic" }}>visible.</i>
            </h1>
            <h2 className="text-3xl lg:text-4xl font-medium" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: "#166534" }}>
              So the <i style={{ fontStyle: "italic" }}>460</i> can learn from the <i style={{ fontStyle: "italic" }}>40</i>.
            </h2>
            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "#3A3A3A" }}>
              A peer-led workflow sharing feature built on Chico.ai. Active users share what works. Non-adopters discover it — filtered by role, surfaced at the right moment.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button
              className="flex items-center gap-2 px-8 py-4 rounded-sm transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: "#166534", color: "#FFFFFF", borderRadius: "2px" }}
            >
              <span className="font-medium">Explore Compass</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#"
              className="font-medium pb-0.5 transition-colors hover:opacity-80"
              style={{ color: "#3A3A3A", borderBottom: "1px solid #3A3A3A" }}
            >
              See the admin view
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div
          className="w-full lg:w-[45%] flex flex-col justify-center items-center px-8 lg:px-12 py-12 lg:py-0 relative"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.3)", backdropFilter: "blur(4px)", borderLeft: "1px solid rgba(0, 0, 0, 0.05)" }}
        >
          <div className="relative w-full max-w-[500px]">
            {/* The Dot Grid */}
            <div
              className="grid w-full gap-2 lg:gap-3"
              style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}
            >
              {dots.map((i) => {
                const isActive = activeIndices.has(i);
                return (
                  <div
                    key={i}
                    className="aspect-square rounded-full transition-all duration-700 ease-in-out"
                    style={{
                      backgroundColor: isActive ? "#166534" : "transparent",
                      border: isActive ? "none" : "1px solid #E5DBC8",
                      opacity: isActive ? 1 : 0.4,
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                      boxShadow: isActive ? "0 0 10px rgba(22, 101, 52, 0.5)" : "none",
                    }}
                  />
                );
              })}
            </div>
            
            <p className="mt-8 text-center text-sm font-medium" style={{ color: "#8A7F70" }}>
              40 of 500 users drive most AI activity.
            </p>

            {/* Overlapping Workflow Card */}
            <div className="absolute -bottom-6 -right-6 lg:-bottom-12 lg:-right-12 z-10 w-[280px]">
              {/* Ghost shadow behind */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #E5DBC8",
                  borderRadius: "2px",
                  transform: "rotate(-8deg) translate(8px, 12px)",
                  opacity: 0.5,
                }}
              />
              {/* Real Card */}
              <div
                className="relative z-10 p-5 flex flex-col gap-4"
                style={{
                  backgroundColor: "#FBF8F4",
                  border: "1px solid #E5DBC8",
                  borderRadius: "2px",
                  boxShadow: "0 18px 40px -20px rgba(58,58,58,0.25), 0 2px 6px rgba(58,58,58,0.06)",
                  transform: "rotate(-4deg)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                    style={{ backgroundColor: "#166534", color: "#FFFFFF" }}
                  >
                    PN
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-none" style={{ color: "#3A3A3A" }}>Priya N.</span>
                    <span className="text-xs mt-1 leading-none" style={{ color: "#8A7F70" }}>Senior PM · Product</span>
                  </div>
                </div>
                
                <h3
                  className="text-sm leading-snug"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", color: "#3A3A3A" }}
                >
                  "Turning customer interviews into a one-page synthesis"
                </h3>
                
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs px-2 py-1 rounded-sm font-medium"
                    style={{ backgroundColor: "#E5DBC8", color: "#3A3A3A" }}
                  >
                    Claude
                  </span>
                  <span
                    className="text-xs px-2 py-1 rounded-sm font-medium"
                    style={{ backgroundColor: "rgba(22, 101, 52, 0.12)", color: "#166534" }}
                  >
                    45 min with Compass
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="w-full flex items-center justify-between px-8 lg:px-20 py-8"
        style={{ borderTop: "1px solid #E5DBC8" }}
      >
        <span className="text-xs uppercase font-semibold tracking-[0.28em]" style={{ color: "#8A7F70" }}>
          COMPASS
        </span>
        <a
          href="https://www.linkedin.com/in/gordonhealis/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ color: "#3A3A3A" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Builder: Gordon Healis
        </a>
      </div>
    </div>
  );
}
