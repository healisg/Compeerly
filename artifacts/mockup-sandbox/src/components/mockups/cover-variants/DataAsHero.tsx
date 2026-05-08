import React, { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';

// Hardcoded indices for the 40 active users to keep it stable
const ACTIVE_INDICES = new Set([
  12, 45, 67, 89, 102, 134, 156, 178, 199, 215,
  234, 256, 278, 290, 312, 345, 367, 389, 401, 423,
  445, 467, 489, 15, 38, 72, 94, 115, 147, 182,
  205, 248, 271, 305, 338, 372, 395, 418, 452, 475
]);

const BRAND = {
  bgCream: '#FBF8F4',
  textCharcoal: '#3A3A3A',
  primaryForestGreen: '#166534',
  accentAmber: '#92400E',
  mutedWarmGrey: '#8A7F70',
  ruleSand: '#E5DBC8',
  fontHeadline: "'Playfair Display', Georgia, serif",
  fontUi: "'Inter', system-ui, sans-serif",
};

export function DataAsHero() {
  const dots = useMemo(() => {
    return Array.from({ length: 500 }).map((_, i) => ({
      id: i,
      isActive: ACTIVE_INDICES.has(i),
    }));
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ 
        backgroundColor: BRAND.bgCream, 
        color: BRAND.textCharcoal,
        fontFamily: BRAND.fontUi
      }}
    >
      <main className="flex-1 flex flex-col lg:flex-row w-full max-w-[1440px] mx-auto">
        {/* Left Column (55%) */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 lg:px-20 py-16 lg:py-0 relative z-10">
          
          <div className="mb-16">
            <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: BRAND.primaryForestGreen }}>
              <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth={2.2} fill="none" />
              <g transform="rotate(-22 32 32)">
                <path d="M32 10 L36 32 L32 54 L28 32 Z" fill="currentColor" />
                <circle cx="32" cy="32" r="2.2" fill={BRAND.bgCream} />
              </g>
            </svg>
          </div>

          <div className="space-y-6 max-w-2xl">
            <div 
              className="text-sm font-semibold tracking-[0.2em] uppercase"
              style={{ color: BRAND.mutedWarmGrey }}
            >
              COMPASS
            </div>
            
            <h1 
              className="text-5xl lg:text-7xl leading-[1.1] tracking-tight"
              style={{ fontFamily: BRAND.fontHeadline }}
            >
              Making private AI use <i className="italic">visible.</i>
            </h1>
            
            <h2 
              className="text-3xl lg:text-4xl leading-snug"
              style={{ fontFamily: BRAND.fontHeadline, color: BRAND.primaryForestGreen }}
            >
              So the <i className="italic">460</i> can learn from the <i className="italic">40.</i>
            </h2>
            
            <p 
              className="text-lg lg:text-xl leading-relaxed max-w-xl mt-4"
              style={{ color: BRAND.textCharcoal }}
            >
              A peer-led workflow sharing feature built on Chico.ai. Active users share what works. Non-adopters discover it — filtered by role, surfaced at the right moment.
            </p>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button 
              className="group flex items-center justify-center gap-2 px-8 py-4 text-base font-medium transition-transform hover:-translate-y-0.5"
              style={{ 
                backgroundColor: BRAND.primaryForestGreen, 
                color: '#FFFFFF',
                borderRadius: '2px'
              }}
            >
              Explore Compass
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <a 
              href="#"
              className="text-base font-medium transition-colors hover:opacity-70"
              style={{ 
                color: BRAND.textCharcoal,
                borderBottom: `1px solid ${BRAND.textCharcoal}`
              }}
            >
              See the admin view
            </a>
          </div>
        </div>

        {/* Right Column (45%) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center items-center px-8 lg:px-12 py-16 lg:py-0 bg-white/30 backdrop-blur-sm relative border-l border-black/5">
          <div className="w-full max-w-[500px]">
            {/* The 500 Dot Grid */}
            <div 
              className="grid gap-2 lg:gap-3"
              style={{ 
                gridTemplateColumns: 'repeat(20, minmax(0, 1fr))',
              }}
            >
              {dots.map((dot) => (
                <div 
                  key={dot.id}
                  className="aspect-square rounded-full transition-all duration-700 ease-in-out"
                  style={{
                    backgroundColor: dot.isActive ? BRAND.primaryForestGreen : 'transparent',
                    border: `1px solid ${dot.isActive ? BRAND.primaryForestGreen : BRAND.ruleSand}`,
                    opacity: dot.isActive ? 1 : 0.4,
                    transform: dot.isActive ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: dot.isActive ? `0 0 10px ${BRAND.primaryForestGreen}40` : 'none'
                  }}
                />
              ))}
            </div>
            
            <div 
              className="mt-8 text-center text-sm tracking-wide"
              style={{ color: BRAND.mutedWarmGrey }}
            >
              40 of 500 users drive most AI activity.
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-8 lg:px-20 py-8 flex justify-between items-center border-t relative z-10" style={{ borderColor: BRAND.ruleSand }}>
        <div 
          className="text-xs font-semibold tracking-[0.28em] uppercase"
          style={{ color: BRAND.mutedWarmGrey }}
        >
          COMPASS
        </div>
        
        <a 
          href="https://www.linkedin.com/in/gordonhealis/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium transition-opacity hover:opacity-70 uppercase tracking-widest"
          style={{ color: BRAND.mutedWarmGrey }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          Builder: Gordon Healis
        </a>
      </footer>
    </div>
  );
}
