const CREAM = "#FBF8F4";
const FOREST = "#166534";
const AMBER = "#92400E";
const CHARCOAL = "#3A3A3A";
const SAND = "#E5DBC8";

function NeedleMark({ size = 56, color = FOREST }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="29" stroke={color} strokeWidth="2.2" />
      <g transform="rotate(-22 32 32)">
        <path d="M32 9 L40 34 L32 31 L24 34 Z" fill={color} />
        <path d="M32 55 L24 30 L32 33 L40 30 Z" fill={color} fillOpacity="0.22" />
      </g>
      <circle cx="32" cy="32" r="2.4" fill={CREAM} />
    </svg>
  );
}

function Lockup({ scale = 1, color = FOREST }: { scale?: number; color?: string }) {
  const px = (n: number) => n * scale;
  return (
    <div className="flex items-center" style={{ gap: px(14) }}>
      <NeedleMark size={px(56)} color={color} />
      <span
        className="font-['Inter']"
        style={{
          fontSize: px(46),
          color,
          fontWeight: 600,
          letterSpacing: "-0.035em",
          lineHeight: 1,
        }}
      >
        Compass
      </span>
    </div>
  );
}

export function Bearing() {
  return (
    <div className="min-h-screen w-full font-['Inter']" style={{ background: CREAM, color: CHARCOAL }}>
      <div className="px-10 py-8 flex flex-col" style={{ gap: 28 }}>
        <header className="flex items-baseline justify-between">
          <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: AMBER }}>Option 2</div>
          <div className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "#8A7F70" }}>Bearing</div>
        </header>

        <div
          className="flex items-center justify-center rounded-md"
          style={{ background: CREAM, border: `1px solid ${SAND}`, height: 240 }}
        >
          <Lockup scale={1} />
        </div>

        <div className="grid grid-cols-3" style={{ gap: 14 }}>
          <div className="flex flex-col items-center justify-center rounded-md" style={{ background: CHARCOAL, height: 150, padding: 12 }}>
            <Lockup scale={0.5} color={CREAM} />
            <div className="mt-2 text-[10px] uppercase tracking-[0.16em]" style={{ color: SAND }}>On charcoal</div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md" style={{ background: CREAM, border: `1px solid ${SAND}`, height: 150 }}>
            <div
              className="flex items-center justify-center rounded-[18px]"
              style={{ background: FOREST, width: 88, height: 88 }}
            >
              <NeedleMark size={58} color={CREAM} />
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.16em]" style={{ color: "#8A7F70" }}>App icon</div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-md" style={{ background: CREAM, border: `1px solid ${SAND}`, height: 150 }}>
            <div className="flex items-end" style={{ gap: 14 }}>
              <NeedleMark size={32} color={FOREST} />
              <NeedleMark size={16} color={FOREST} />
            </div>
            <div className="mt-3 text-[10px] uppercase tracking-[0.16em]" style={{ color: "#8A7F70" }}>32 / 16 px</div>
          </div>
        </div>

        <div className="rounded-md p-5" style={{ background: "rgba(229,219,200,0.45)" }}>
          <div className="font-['Inter'] text-[15px] mb-1" style={{ color: FOREST, fontWeight: 600 }}>
            Modern &amp; product-native
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: CHARCOAL }}>
            A single off-axis needle inside a clean ring — reads as &ldquo;finding your bearing&rdquo;. Inter wordmark keeps it close to the product UI. Best where the logo lives next to buttons and dense interface chrome.
          </p>
        </div>
      </div>
    </div>
  );
}
