import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

const TOKENS = {
  primary: "#166534",
  accent: "#92400E",
  bg: "#FBF8F4",
  text: "#3A3A3A",
  muted: "#8A7F70",
  rule: "#E5DBC8",
  card: "#FFFFFF",
};

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
    seed,
  )}&backgroundColor=fef3c7,dcfce7,dbeafe,fee2e2,ede9fe&radius=50`;
}

const KPIS = [
  {
    label: "Time reclaimed this week",
    value: "£6,900",
    delta: "+18% vs last week",
    caption: "At £50 blended rate, across 138 hours saved.",
  },
  {
    label: "Workflows shared",
    value: "28",
    delta: "12 new this week, from 5 contributors",
    caption: "Capture is voluntary. The 5 are doing it anyway.",
  },
  {
    label: "Latent users who tried",
    value: "89 of 460",
    delta: "Tried a peer workflow this week",
    caption: "The non-adopter pool the pilot is here to activate.",
  },
  {
    label: "Activation rate",
    value: "11%",
    delta: "Target 15% within 30 days",
    caption: "≥ 2 AI tool uses in 7 days after viewing a peer workflow.",
  },
];

const PEER_NETWORK = [
  {
    contributor: "Priya N.",
    role: "Operations Manager",
    title: "Drafting quarterly board updates",
    tried: 14,
    worked: 9,
    hours: "17.2 hrs",
  },
  {
    contributor: "Marcus T.",
    role: "Account Manager",
    title: "Writing client meeting follow-up emails",
    tried: 22,
    worked: 18,
    hours: "23.5 hrs",
  },
  {
    contributor: "Jordan K.",
    role: "Sales Analyst",
    title: "Building weekly sales pipeline reports",
    tried: 11,
    worked: 7,
    hours: "14.0 hrs",
  },
  {
    contributor: "Sana A.",
    role: "Compliance Officer",
    title: "Summarising regulatory changes",
    tried: 6,
    worked: 4,
    hours: "8.4 hrs",
  },
  {
    contributor: "Devon R.",
    role: "HR Business Partner",
    title: "Onboarding checklists for new hires",
    tried: 9,
    worked: 6,
    hours: "6.1 hrs",
  },
];

const CONTRIBUTORS = [
  { name: "Marcus T.", role: "Account Manager", shared: 4, hoursForOthers: "47.2 hrs" },
  { name: "Priya N.", role: "Operations Manager", shared: 3, hoursForOthers: "28.6 hrs" },
  { name: "Jordan K.", role: "Sales Analyst", shared: 3, hoursForOthers: "21.4 hrs" },
  { name: "Devon R.", role: "HR Business Partner", shared: 2, hoursForOthers: "12.8 hrs" },
  { name: "Sana A.", role: "Compliance Officer", shared: 2, hoursForOthers: "9.7 hrs" },
];

const ROLE_COVERAGE = [
  { role: "Account Managers", pct: 73, under: false },
  { role: "Operations Managers", pct: 61, under: false },
  { role: "Sales Analysts", pct: 54, under: false },
  { role: "HR Business Partners", pct: 38, under: true },
  { role: "Compliance Officers", pct: 12, under: true },
  { role: "Finance Analysts", pct: 9, under: true },
];

const CONCIERGE_ACTIONS = [
  {
    headline: "3 senior analysts have done useful AI work but haven't captured it.",
    body: "They've each told a colleague how they use AI, but never written it down. A 15-minute capture call is the highest-leverage thing this week.",
    cta: "Send a 15-min capture invite",
  },
  {
    headline: "Compliance is at 12% coverage — recruit a contributor.",
    body: "The under-served roles need a sharer in their own discipline. Sana A. is the obvious candidate; offer concierge support.",
    cta: "Reach out to Sana A.",
  },
  {
    headline: "Marcus T.'s workflow has 22 tries, 18 'worked for me'.",
    body: "This is your social-proof anchor. Feature it on the feed homepage and quote it in next week's all-hands.",
    cta: "Pin to feed homepage",
  },
];

const SPARKLINE = [
  { week: "W1", value: 12 },
  { week: "W2", value: 28 },
  { week: "W3", value: 61 },
  { week: "W4", value: 89 },
];

function Sparkline() {
  const W = 520;
  const H = 170;
  const padX = 32;
  const padY = 36;
  const padBottom = 26;

  const max = Math.max(...SPARKLINE.map((d) => d.value));
  const points = SPARKLINE.map((d, i) => {
    const x = padX + (i * (W - padX * 2)) / (SPARKLINE.length - 1);
    const y = padY + ((H - padY - padBottom) * (1 - d.value / max));
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x},${H - padBottom} L${points[0].x},${H - padBottom} Z`;
  const annotated = points[2];
  const annotAnchorX = annotated.x - 10;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto overflow-visible"
      role="img"
      aria-label="Adoption over four weeks"
    >
      <defs>
        <style>{`
          @keyframes sparkDrawLine {
            from { stroke-dashoffset: 1; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes sparkFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          .spark-area {
            opacity: 0;
            animation: sparkFadeIn 0.7s ease 1.55s forwards;
          }
          .spark-line {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            animation: sparkDrawLine 1.3s cubic-bezier(0.4, 0, 0.2, 1) 0.25s forwards;
          }
          .spark-dot-0 { opacity:0; animation: sparkFadeIn 0.35s ease 0.30s forwards; }
          .spark-dot-1 { opacity:0; animation: sparkFadeIn 0.35s ease 0.72s forwards; }
          .spark-dot-2 { opacity:0; animation: sparkFadeIn 0.35s ease 1.12s forwards; }
          .spark-dot-3 { opacity:0; animation: sparkFadeIn 0.35s ease 1.55s forwards; }
          .spark-annotation {
            opacity: 0;
            animation: sparkFadeIn 0.5s ease 1.85s forwards;
          }
        `}</style>
      </defs>

      {/* Area fill */}
      <path
        d={areaPath}
        fill={TOKENS.primary}
        fillOpacity="0.07"
        className="spark-area"
      />

      {/* Animated line */}
      <path
        d={linePath}
        pathLength="1"
        stroke={TOKENS.primary}
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="spark-line"
      />

      {/* Dots — sequential */}
      {points.map((p, i) => (
        <circle
          key={p.week}
          cx={p.x}
          cy={p.y}
          r="3.5"
          fill={TOKENS.primary}
          className={`spark-dot-${i}`}
        />
      ))}

      {/* X-axis labels */}
      {points.map((p) => (
        <text
          key={`lbl-${p.week}`}
          x={p.x}
          y={H - 6}
          textAnchor="middle"
          fontSize="10"
          fill={TOKENS.muted}
          fontFamily="'Inter', system-ui, sans-serif"
        >
          {p.week}
        </text>
      ))}

      {/* Annotation — anchored LEFT of dashed line */}
      <g className="spark-annotation">
        <line
          x1={annotated.x}
          y1={annotated.y - 9}
          x2={annotated.x}
          y2={padY - 2}
          stroke={TOKENS.accent}
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <text
          x={annotAnchorX}
          y={padY + 3}
          textAnchor="end"
          fontSize="9"
          fontWeight="600"
          fill={TOKENS.accent}
          fontFamily="'Inter', system-ui, sans-serif"
        >
          Wk 3 · Marcus T.
        </text>
        <text
          x={annotAnchorX}
          y={padY + 14}
          textAnchor="end"
          fontSize="9"
          fill={TOKENS.accent}
          fontFamily="'Inter', system-ui, sans-serif"
        >
          shared the client-email workflow
        </text>
      </g>
    </svg>
  );
}

function KpiTile({ label, value, delta, caption }: (typeof KPIS)[number]) {
  return (
    <div
      className="p-6 md:p-7"
      style={{
        backgroundColor: TOKENS.card,
        border: `1px solid ${TOKENS.rule}`,
      }}
    >
      <div
        className="text-[10px] font-medium uppercase mb-4"
        style={{ color: TOKENS.muted, letterSpacing: "0.28em" }}
      >
        {label}
      </div>
      <div
        className="font-serif italic leading-none"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "44px",
          color: TOKENS.text,
        }}
      >
        {value}
      </div>
      <div className="mt-3 text-[12.5px] font-medium" style={{ color: TOKENS.primary }}>
        {delta}
      </div>
      <div className="mt-2 text-[12.5px] leading-snug" style={{ color: TOKENS.muted }}>
        {caption}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [actioned, setActioned] = useState<Record<number, boolean>>({});

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: TOKENS.bg,
        color: TOKENS.text,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
      data-testid="admin-page"
    >
      {/* Header */}
      <header
        className="sticky top-0 z-10"
        style={{
          backgroundColor: `${TOKENS.bg}E6`,
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${TOKENS.rule}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: TOKENS.muted }}
            data-testid="link-back-cover"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to cover
          </Link>
          <div
            className="text-[11px] font-medium uppercase"
            style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}
          >
            Workflow Mirror · Admin
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-32">
        {/* Hero / ROI headline */}
        <section className="max-w-3xl mb-20">
          <div
            className="text-[11px] font-medium uppercase mb-6"
            style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}
          >
            Month 1 of pilot
          </div>
          <h1
            className="font-serif italic leading-[1.05] tracking-tight text-[44px] md:text-[64px]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: TOKENS.text,
            }}
          >
            £6,900 reclaimed this week across 28 peer-shared workflows.
            <br />
            <span style={{ color: TOKENS.primary }}>At full adoption: £358,800/year.</span>
          </h1>
          <div className="h-px w-[120px] mt-10" style={{ backgroundColor: TOKENS.rule }} />
          <p
            className="mt-8 text-[16px] md:text-[18px] leading-[1.6] max-w-[640px]"
            style={{ color: TOKENS.text }}
          >
            69 active peers × 2 hours/week × £50, per enterprise client. The pilot is
            testing the curve, not the ceiling.
          </p>
        </section>

        {/* KPI tiles */}
        <section className="mb-24" aria-labelledby="kpi-heading">
          <h2
            id="kpi-heading"
            className="text-[11px] font-medium uppercase mb-5"
            style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}
          >
            Measured this month
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KPIS.map((k) => (
              <KpiTile key={k.label} {...k} />
            ))}
          </div>
        </section>

        {/* Peer network panel */}
        <section className="mb-24" aria-labelledby="peer-heading">
          <div className="flex items-baseline justify-between mb-6">
            <h2
              id="peer-heading"
              className="font-serif italic text-[26px] md:text-[32px] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
            >
              The peer network
            </h2>
            <div className="text-[12.5px]" style={{ color: TOKENS.muted }}>
              What's spreading, and where
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${TOKENS.rule}` }}>
            {PEER_NETWORK.map((row) => (
              <div
                key={row.contributor + row.title}
                className="grid grid-cols-12 gap-4 items-center py-5"
                style={{ borderBottom: `1px solid ${TOKENS.rule}` }}
              >
                <div className="col-span-12 md:col-span-5 flex items-center gap-3">
                  <img
                    src={avatarUrl(row.contributor)}
                    alt=""
                    width={40}
                    height={40}
                    className="rounded-full"
                    style={{ filter: "saturate(0.85)" }}
                  />
                  <div>
                    <div className="text-[14.5px] font-medium" style={{ color: TOKENS.text }}>
                      {row.contributor}
                    </div>
                    <div className="text-[12px]" style={{ color: TOKENS.muted }}>
                      {row.role}
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <div className="text-[14.5px]" style={{ color: TOKENS.text }}>
                    {row.title}
                  </div>
                </div>
                <div className="col-span-6 md:col-span-2 text-[13px]" style={{ color: TOKENS.muted }}>
                  Tried by{" "}
                  <span style={{ color: TOKENS.text, fontWeight: 500 }}>{row.tried}</span> ·{" "}
                  <span style={{ color: TOKENS.primary, fontWeight: 500 }}>{row.worked} worked</span>
                </div>
                <div
                  className="col-span-6 md:col-span-1 text-right font-serif italic text-[18px]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
                >
                  {row.hours}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Two-column: Contributors + Coverage */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Contributors */}
          <div>
            <div className="flex items-baseline justify-between mb-6">
              <h2
                className="font-serif italic text-[26px] md:text-[32px] tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
              >
                Top contributors — the 40
              </h2>
            </div>
            <p className="text-[13.5px] mb-6 max-w-md" style={{ color: TOKENS.muted }}>
              These are the people teaching the organisation. Recognise them. Hours below are{" "}
              <span style={{ color: TOKENS.text }}>saved for others</span>, not for self.
            </p>
            <div style={{ borderTop: `1px solid ${TOKENS.rule}` }}>
              {CONTRIBUTORS.map((c) => (
                <div
                  key={c.name}
                  className="grid grid-cols-12 gap-3 items-center py-4"
                  style={{ borderBottom: `1px solid ${TOKENS.rule}` }}
                >
                  <div className="col-span-7 flex items-center gap-3">
                    <img
                      src={avatarUrl(c.name)}
                      alt=""
                      width={32}
                      height={32}
                      className="rounded-full"
                      style={{ filter: "saturate(0.85)" }}
                    />
                    <div>
                      <div className="text-[14px] font-medium" style={{ color: TOKENS.text }}>
                        {c.name}
                      </div>
                      <div className="text-[12px]" style={{ color: TOKENS.muted }}>
                        {c.role}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-[12.5px]" style={{ color: TOKENS.muted }}>
                    {c.shared} shared
                  </div>
                  <div
                    className="col-span-3 text-right font-serif italic text-[17px]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
                  >
                    {c.hoursForOthers}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage by role */}
          <div>
            <div className="flex items-baseline justify-between mb-6">
              <h2
                className="font-serif italic text-[26px] md:text-[32px] tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
              >
                Where the gap is hiding
              </h2>
            </div>
            <p className="text-[13.5px] mb-6 max-w-md" style={{ color: TOKENS.muted }}>
              Coverage by role — % of the role who've tried a peer workflow this month. Roles in{" "}
              <span style={{ color: TOKENS.accent, fontWeight: 500 }}>amber</span> are where the
              next contributor needs to come from.
            </p>
            <div className="space-y-4">
              {ROLE_COVERAGE.map((r) => (
                <div key={r.role}>
                  <div className="flex items-baseline justify-between text-[13px] mb-1.5">
                    <span style={{ color: TOKENS.text }}>{r.role}</span>
                    <span
                      style={{
                        color: r.under ? TOKENS.accent : TOKENS.text,
                        fontWeight: 500,
                      }}
                    >
                      {r.pct}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full"
                    style={{ backgroundColor: TOKENS.rule }}
                  >
                    <div
                      className="h-full"
                      style={{
                        width: `${r.pct}%`,
                        backgroundColor: r.under ? TOKENS.accent : TOKENS.primary,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Concierge actions */}
        <section className="mb-24" aria-labelledby="concierge-heading">
          <div className="flex items-baseline justify-between mb-6">
            <h2
              id="concierge-heading"
              className="font-serif italic text-[26px] md:text-[32px] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
            >
              Concierge, not control
            </h2>
            <div className="text-[12.5px]" style={{ color: TOKENS.muted }}>
              The admin's job in month 1 is to recruit contributors
            </div>
          </div>
          <p className="text-[13.5px] mb-8 max-w-2xl" style={{ color: TOKENS.muted }}>
            Workflow Mirror does not assign workflows or nudge consumers. It surfaces the few
            high-leverage moves that grow the network — the kind of moves a thoughtful PM would
            make by hand in a pilot.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CONCIERGE_ACTIONS.map((a, i) => {
              const done = !!actioned[i];
              return (
                <div
                  key={i}
                  className="p-6 flex flex-col"
                  style={{
                    backgroundColor: TOKENS.card,
                    border: `1px solid ${TOKENS.rule}`,
                  }}
                >
                  <div
                    className="text-[15px] leading-snug mb-3"
                    style={{ color: TOKENS.text, fontWeight: 500 }}
                  >
                    {a.headline}
                  </div>
                  <div className="text-[13px] leading-relaxed mb-6 flex-1" style={{ color: TOKENS.muted }}>
                    {a.body}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActioned((s) => ({ ...s, [i]: true }))}
                    className="inline-flex items-center gap-2 text-[13px] font-medium self-start hover:opacity-70 transition-opacity"
                    style={{
                      color: done ? TOKENS.muted : TOKENS.primary,
                      borderBottom: `1px solid ${done ? TOKENS.rule : TOKENS.primary}`,
                      paddingBottom: "2px",
                    }}
                    data-testid={`concierge-action-${i}`}
                  >
                    {done ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Sent
                      </>
                    ) : (
                      <>
                        {a.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Adoption sparkline */}
        <section aria-labelledby="adoption-heading">
          <div className="flex items-baseline justify-between mb-6">
            <h2
              id="adoption-heading"
              className="font-serif italic text-[26px] md:text-[32px] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
            >
              How adoption is spreading
            </h2>
            <div className="text-[12.5px]" style={{ color: TOKENS.muted }}>
              Latent users who tried a peer workflow, by week
            </div>
          </div>
          <div
            className="p-6 md:p-8"
            style={{
              backgroundColor: TOKENS.card,
              border: `1px solid ${TOKENS.rule}`,
            }}
          >
            <Sparkline />
            <p className="mt-6 text-[13.5px] max-w-2xl" style={{ color: TOKENS.muted }}>
              Growth is event-driven. Each step up corresponds to a contributor sharing — not a
              broadcast or a mandate. Adoption compounds when the right person shares the right
              workflow at the right moment.
            </p>
          </div>
        </section>

        {/* Footer */}
        <div
          className="mt-24 pt-8 text-[11.5px]"
          style={{
            color: TOKENS.muted,
            borderTop: `1px solid ${TOKENS.rule}`,
          }}
        >
          All numbers reconcile with the pitch deck (RoiModel slide). Pilot data is illustrative
          for this submission.
        </div>
      </main>
    </div>
  );
}
