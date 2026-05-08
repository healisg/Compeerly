import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

export function ProductPeek() {
  const brandTokens = {
    bgCream: '#FBF8F4',
    textCharcoal: '#3A3A3A',
    primaryForestGreen: '#166534',
    accentAmber: '#92400E',
    mutedWarmGrey: '#8A7F70',
    ruleSand: '#E5DBC8',
    fontHeadline: "'Playfair Display', Georgia, serif",
    fontUi: "'Inter', system-ui, sans-serif",
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-between overflow-hidden relative"
      style={{ backgroundColor: brandTokens.bgCream, color: brandTokens.textCharcoal, fontFamily: brandTokens.fontUi }}
    >
      <main className="flex-1 flex w-full max-w-7xl mx-auto items-center">
        {/* LEFT COLUMN */}
        <div className="w-[48%] pl-16 pr-8 z-10 py-12 flex flex-col justify-center">
          <div className="mb-12">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: brandTokens.primaryForestGreen, width: '48px', height: '48px' }}>
              <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth={2.2} fill="none" />
              <g transform="rotate(-22 32 32)">
                <path d="M32 10 L36 32 L32 54 L28 32 Z" fill="currentColor" />
                <circle cx="32" cy="32" r="2.2" fill={brandTokens.bgCream} />
              </g>
            </svg>
          </div>

          <div className="space-y-6 max-w-xl">
            <div 
              className="text-sm tracking-widest font-semibold" 
              style={{ color: brandTokens.mutedWarmGrey }}
            >
              COMPASS
            </div>

            <div className="space-y-2">
              <h1 
                className="text-5xl md:text-6xl font-normal tracking-tight italic" 
                style={{ fontFamily: brandTokens.fontHeadline }}
              >
                Making private AI use visible.
              </h1>
              <h2 
                className="text-4xl md:text-5xl font-normal tracking-tight italic" 
                style={{ fontFamily: brandTokens.fontHeadline, color: brandTokens.primaryForestGreen }}
              >
                So the 460 can learn from the 40.
              </h2>
            </div>

            <p className="text-lg md:text-xl leading-relaxed max-w-md pt-4 pb-8" style={{ color: brandTokens.textCharcoal }}>
              A peer-led workflow sharing feature built on Chico.ai. Active users share what works. Non-adopters discover it — filtered by role, surfaced at the right moment.
            </p>

            <div className="flex items-center gap-8">
              <button 
                className="flex items-center gap-2 px-6 py-4 text-white text-base font-medium transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: brandTokens.primaryForestGreen, borderRadius: '2px' }}
              >
                Explore Compass
                <ArrowRight size={20} />
              </button>
              
              <a 
                href="#" 
                className="text-base font-medium transition-colors hover:opacity-80"
                style={{ color: brandTokens.textCharcoal, borderBottom: `1px solid ${brandTokens.textCharcoal}`, paddingBottom: '2px' }}
              >
                See the admin view
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-[52%] relative h-full flex items-center justify-center">
          <div className="relative w-full max-w-lg">
            
            {/* Ghosted Card Behind */}
            <div 
              className="absolute inset-0 bg-white shadow-xl pointer-events-none transform -rotate-6 scale-95 opacity-50 translate-x-4 translate-y-4"
              style={{ borderRadius: '2px', border: `1px solid ${brandTokens.ruleSand}` }}
            />
            
            {/* Primary Mockup Card */}
            <div 
              className="relative bg-white shadow-2xl transform -rotate-3 transition-transform hover:-rotate-1 hover:scale-105 duration-500 ease-out"
              style={{ 
                borderRadius: '2px', 
                border: `1px solid ${brandTokens.ruleSand}`,
                backgroundColor: brandTokens.bgCream 
              }}
            >
              <div className="p-8">
                {/* Card Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-12 h-12 flex items-center justify-center text-white font-medium text-lg"
                    style={{ backgroundColor: brandTokens.accentAmber, borderRadius: '50%' }}
                  >
                    PN
                  </div>
                  <div>
                    <div className="font-semibold text-lg" style={{ color: brandTokens.textCharcoal }}>Priya N.</div>
                    <div className="text-sm" style={{ color: brandTokens.mutedWarmGrey }}>Senior PM · Product</div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="space-y-4 mb-8">
                  <h3 
                    className="text-2xl font-normal italic leading-snug"
                    style={{ fontFamily: brandTokens.fontHeadline, color: brandTokens.textCharcoal }}
                  >
                    Turning customer interviews into a one-page synthesis
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span 
                      className="px-3 py-1.5 text-sm font-medium"
                      style={{ 
                        backgroundColor: 'rgba(138, 127, 112, 0.1)', 
                        color: brandTokens.mutedWarmGrey,
                        borderRadius: '2px'
                      }}
                    >
                      Claude
                    </span>
                    <span 
                      className="px-3 py-1.5 text-sm font-medium flex items-center gap-1.5"
                      style={{ 
                        backgroundColor: 'rgba(22, 101, 52, 0.1)', 
                        color: brandTokens.primaryForestGreen,
                        borderRadius: '2px'
                      }}
                    >
                      <Clock size={14} />
                      45 min with Compass
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div 
                  className="pt-6 border-t"
                  style={{ borderColor: brandTokens.ruleSand }}
                >
                  <button 
                    className="w-full py-3 px-4 text-center font-medium transition-colors"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: brandTokens.primaryForestGreen,
                      border: `1px solid ${brandTokens.primaryForestGreen}`,
                      borderRadius: '2px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = brandTokens.primaryForestGreen;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = brandTokens.primaryForestGreen;
                    }}
                  >
                    Try this workflow
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full px-16 py-8 flex justify-between items-center text-xs tracking-[0.28em] uppercase font-semibold relative z-20">
        <div style={{ color: brandTokens.mutedWarmGrey }}>COMPASS</div>
        <a 
          href="https://www.linkedin.com/in/gordonhealis/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{ color: brandTokens.mutedWarmGrey }}
        >
          <span>Builder: Gordon Healis</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </footer>
    </div>
  );
}
