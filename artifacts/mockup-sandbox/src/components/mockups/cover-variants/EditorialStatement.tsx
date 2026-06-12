import React from 'react';
import { ArrowRight } from 'lucide-react';

export function EditorialStatement() {
  return (
    <div className="min-h-screen flex flex-col justify-between" style={{ backgroundColor: '#FBF8F4', color: '#3A3A3A', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <header className="p-8 md:p-16 w-full max-w-7xl mx-auto flex justify-between items-start">
        <div className="text-sm font-medium tracking-widest text-[#8A7F70]">VOL. 1</div>
        <div className="w-20 h-20 text-[#166534]">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "#166534" }}>
            <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth={2.2} fill="none" />
            <g transform="rotate(-22 32 32)">
              <path d="M32 10 L36 32 L32 54 L28 32 Z" fill="currentColor" />
              <circle cx="32" cy="32" r="2.2" fill="#FBF8F4" />
            </g>
          </svg>
        </div>
        <div className="text-sm font-medium tracking-widest text-[#8A7F70]">NO. 01</div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto p-8 md:p-16">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold tracking-[0.2em] mb-8 text-[#8A7F70]">COMPASS</div>
            <h1 className="text-6xl md:text-8xl font-light mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              <span className="italic">Making private AI use visible.</span>
            </h1>
            
            <div className="w-full h-px my-12" style={{ backgroundColor: '#E5DBC8' }}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-7">
                <h2 className="text-4xl md:text-5xl font-light leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#166534' }}>
                  <span className="italic">So the 90% can learn from the 10%.</span>
                </h2>
              </div>
              <div className="md:col-span-5 flex flex-col items-start gap-8">
                <p className="text-lg md:text-xl leading-relaxed">
                  A peer-led workflow sharing feature built on Chico.ai. Active users share what works. Non-adopters discover it — filtered by role, surfaced at the right moment.
                </p>
                <div className="flex flex-col items-start gap-6">
                  <button className="flex items-center gap-3 px-8 py-4 text-white font-medium transition-transform hover:translate-x-1 rounded-sm" style={{ backgroundColor: '#166534', borderRadius: '2px' }}>
                    Explore Compass <ArrowRight className="w-5 h-5" />
                  </button>
                  <a href="#" className="text-sm font-medium border-b border-current pb-0.5 hover:text-[#166534] hover:border-[#166534] transition-colors">
                    See the admin view
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full border-t p-8 md:px-16 md:py-8 flex justify-between items-center text-xs tracking-[0.28em] uppercase" style={{ borderColor: '#E5DBC8', color: '#8A7F70' }}>
        <div>COMPASS</div>
        <a href="https://www.linkedin.com/in/gordonhealis/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#166534] transition-colors">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span>Builder: Gordon Healis</span>
        </a>
      </footer>
    </div>
  );
}