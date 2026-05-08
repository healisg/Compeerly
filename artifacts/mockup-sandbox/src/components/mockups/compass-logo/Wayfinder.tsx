const CREAM = "#FBF8F4";
const FOREST = "#166534";
const AMBER = "#92400E";
const CHARCOAL = "#3A3A3A";
const SAND = "#E5DBC8";

function CMark({ size = 64, color = FOREST }: { size?: number; color?: string }) {
  // A "C" drawn as a compass dial: open on the right, with a small needle/diamond
  // in the gap pointing outward (north-east-ish). Dial has tick marks.
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* dial ring with a wedge cut out on the right */}
      <path
        d="M44 12.5 A 24 24 0 1 0 44 51.5"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* tick marks at N / W / S */}
      <path d="M32 4 V8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M32 56 V60" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M4 32 H8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* needle pointing into the gap (NE) */}
      <path
        d="M32 32 L52 22"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M52 22 L48 22 L50 25 Z" fill={color} />
      <circle cx="32" cy="32" r="3" fill={color} />
    </svg>
  );
}

function Lockup({ scale = 1, color = FOREST }: { scale?: number; color?: string }) {
  const px = (n: number) => n * scale;
  return (
    <div className="flex items-center" style={{ gap: px(16) }}>
      <CMark size={px(64)} color={color} />
      <span
        className="font-['Playfair_Display']"
        style={{
          fontSize: px(54),
          color,
          fontWeight: 500,
          letterSpacing: "-0.015em",
          lineHeight: 1,
          fontStyle: "italic",
        }}
      >
        ompass
      </span>
    </div>
  );
}

export function Wayfinder() {
  return (
    <div className="min-h-screen w-full font-['Inter']" style={{ background: CREAM, color: CHARCOAL }}>
      <div className="px-10 py-8 flex flex-col" style={{ gap: 28 }}>
        <header className="flex items-baseline justify-between">
          <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: AMBER }}>Option 3</div>
          <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "#8A7F70" }}>Wayfinder</div>
        </header>

        <div
          className="flex items-center justify-center rounded-md"
          style={{ background: CREAM, border: `1px solid ${SAND}`, height: 240 }}
        >
          <Lockup scale={1} />
        </div>

        <div className="grid grid-cols-3" style={{ gap: 14 }}>
          <div className="flex flex-col items-center justify-center rounded-md" style={{ background: AMBER, height: 150, padding: 12 }}>
            <Lockup scale={0.5} color={CREAM} />
            <div className="mt-2 text-[10px] uppercase tracking-[0.16em]" style={{ color: SAND }}>On amber</div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md" style={{ background: CREAM, border: `1px solid ${SAND}`, height: 150 }}>
            <div
              className="flex items-center justify-center rounded-[18px]"
              style={{ background: FOREST, width: 88, height: 88 }}
            >
              <CMark size={60} color={CREAM} />
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.16em]" style={{ color: "#8A7F70" }}>App icon</div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md" style={{ background: CREAM, border: `1px solid ${SAND}`, height: 150 }}>
            <div className="flex items-end" style={{ gap: 14 }}>
              <CMark size={32} color={FOREST} />
              <CMark size={16} color={FOREST} />
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.16em]" style={{ color: "#8A7F70" }}>32 / 16 px</div>
          </div>
        </div>

        <div className="rounded-md p-5" style={{ background: "rgba(229,219,200,0.45)" }}>
          <div className="font-['Playfair_Display'] text-[18px] mb-1" style={{ color: FOREST, lineHeight: 1.2 }}>
            Distinctive &amp; ownable
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: CHARCOAL }}>
            The &ldquo;C&rdquo; is the compass — its open mouth becomes the dial, with a needle pointing out toward something new. Most ownable as a standalone mark, but asks more of viewers on first read.
          </p>
        </div>
      </div>
    </div>
  );
}
