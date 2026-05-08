const CREAM = "#FBF8F4";
const FOREST = "#166534";
const AMBER = "#92400E";
const CHARCOAL = "#3A3A3A";
const SAND = "#E5DBC8";

function CompassRose({ size = 56, color = FOREST, strokeWidth = 1.4 }: { size?: number; color?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="32" cy="32" r="3.2" fill={color} />
      <path d="M32 6 L36 30 L32 32 L28 30 Z" fill={color} />
      <path d="M32 58 L28 34 L32 32 L36 34 Z" fill={color} fillOpacity="0.35" />
      <path d="M58 32 L34 28 L32 32 L34 36 Z" fill={color} fillOpacity="0.55" />
      <path d="M6 32 L30 36 L32 32 L30 28 Z" fill={color} fillOpacity="0.55" />
      <path d="M32 4 V10 M32 54 V60 M4 32 H10 M54 32 H60" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

function Lockup({ scale = 1, color = FOREST }: { scale?: number; color?: string }) {
  const px = (n: number) => n * scale;
  return (
    <div className="flex items-center" style={{ gap: px(18) }}>
      <CompassRose size={px(64)} color={color} />
      <span
        className="font-['Playfair_Display'] tracking-tight"
        style={{ fontSize: px(56), color, fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1 }}
      >
        Compass
      </span>
    </div>
  );
}

export function TrueNorth() {
  return (
    <div className="min-h-screen w-full font-['Inter']" style={{ background: CREAM, color: CHARCOAL }}>
      <div className="px-10 py-8 flex flex-col" style={{ gap: 28 }}>
        <header className="flex items-baseline justify-between">
          <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: AMBER }}>Option 1</div>
          <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "#8A7F70" }}>True North</div>
        </header>

        <div
          className="flex items-center justify-center rounded-md"
          style={{ background: CREAM, border: `1px solid ${SAND}`, height: 240 }}
        >
          <Lockup scale={1} />
        </div>

        <div className="grid grid-cols-3" style={{ gap: 14 }}>
          <div className="flex flex-col items-center justify-center rounded-md" style={{ background: FOREST, height: 150, padding: 12 }}>
            <Lockup scale={0.55} color={CREAM} />
            <div className="mt-2 text-[10px] uppercase tracking-[0.16em]" style={{ color: SAND }}>On forest</div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md" style={{ background: CREAM, border: `1px solid ${SAND}`, height: 150 }}>
            <div
              className="flex items-center justify-center rounded-[14px]"
              style={{ background: FOREST, width: 88, height: 88 }}
            >
              <CompassRose size={56} color={CREAM} />
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.16em]" style={{ color: "#8A7F70" }}>App icon</div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md" style={{ background: CREAM, border: `1px solid ${SAND}`, height: 150 }}>
            <div className="flex items-end" style={{ gap: 14 }}>
              <CompassRose size={32} color={FOREST} />
              <CompassRose size={16} color={FOREST} />
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.16em]" style={{ color: "#8A7F70" }}>32 / 16 px</div>
          </div>
        </div>

        <div className="rounded-md p-5" style={{ background: "rgba(229,219,200,0.45)" }}>
          <div className="font-['Playfair_Display'] text-[18px] mb-1" style={{ color: FOREST, lineHeight: 1.2 }}>
            Editorial &amp; literary
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: CHARCOAL }}>
            A full compass rose paired with Playfair Display. Reads as considered, expert, peer-led — closer to a column masthead than a SaaS chip. Best when the wordmark sits in the header and breathes.
          </p>
        </div>
      </div>
    </div>
  );
}
