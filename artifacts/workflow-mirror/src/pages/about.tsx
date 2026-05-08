import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Download, ChevronRight } from "lucide-react";

const TOKENS = {
  primary: "#166534",
  accent: "#92400E",
  bg: "#FBF8F4",
  text: "#3A3A3A",
  muted: "#8A7F70",
  rule: "#E5DBC8",
  card: "#FFFFFF",
};

const SERIF = "'Playfair Display', Georgia, serif";

type Phase = {
  key: string;
  label: string;
  time: string;
  headline: string;
  points: string[];
  tools: string[];
  skills: string[];
};

const PHASES: Phase[] = [
  {
    key: "research",
    label: "Research",
    time: "~3 hrs",
    headline: "Mapped the adoption gap before touching a design tool.",
    points: [
      "Commissioned a dedicated research brief — peer influence studies, surveillance penalties, the Management Science mentorship trial — before writing a single line of code.",
      "Key finding: 88% of heavy AI users name peers as their strongest influence. Only 50% of light users do. That is a visibility gap, not a training gap.",
      "31% of knowledge workers actively work around their company's AI initiatives. Surveillance-first products feed that number. Peer-led ones reduce it.",
    ],
    tools: ["Manus AI", "Claude Sonnet 4.5", "Wispr Flow"],
    skills: ["web-search", "ai-integrations-anthropic", "deep-research"],
  },
  {
    key: "thesis",
    label: "Thesis",
    time: "~2 hrs",
    headline: "Wrote the one-line bet before anything else.",
    points: [
      "Peer-led, opt-in, surveillance-free. That's the whole product bet on a single line.",
      "JTBD four-forces analysis run before any feature decisions. Push: 31% shadow AI. Pull: role-relevant peer discovery. Anxiety: surveillance exposure. Habit: informal Slack sharing already exists. The 'do not build' list — no tracking, no credentials, no nudge campaigns — is the direct anxiety-reduction response.",
      "One metric picked and defended: activation rate of latent users exposed to peer workflows. Everything else is noise until that number moves.",
    ],
    tools: ["A text file", "Claude (as sceptical reader)", "Wispr Flow"],
    skills: ["delegation", "code-review"],
  },
  {
    key: "brand",
    label: "Brand & deck",
    time: "~4 hrs",
    headline: "Brand system built before the slides — not after.",
    points: [
      "Replit Canvas was the design arena: three distinct concepts — bold typographic, minimal utility, editorial warm — were generated and placed side by side. Each was eliminated on a single criterion until one remained. Cream, forest green, Playfair italic won because it was the only direction where the aesthetic and the product promise said the same thing.",
      "Cream, forest green, Playfair italic — editorial restraint as a trust signal. The visual language models the same opt-in, low-pressure quality the product promises.",
      "JTBD four-forces — push, pull, anxiety, habit — set the product constraints before any component was written. The framework shaped build decisions, not a presentation.",
      "Built on Replit's multi-agent system: a planning agent owned the arc; parallel design subagents stress-tested UI variants using the design and mockup-sandbox skills; an optimisation agent tightened component structure and bundle size — all running in parallel.",
      "A code-review agent ran after every major page — catching surveillance-adjacent phrasing, flagging structural drift, and holding coherence across five pages without a single manual pass.",
    ],
    tools: ["Replit Agent", "Replit Canvas", "Playfair Display", "Inter", "Wispr Flow"],
    skills: ["slides", "design", "mockup-sandbox", "branding-generator", "design-thinker"],
  },
  {
    key: "build",
    label: "Build",
    time: "~6 hrs",
    headline: "Five pages, built in order. Each one taught the next.",
    points: [
      "Cover → feed → capture → detail → admin. The sequence matters: the admin view had to come last to confirm the numbers hold.",
      "Capture: one prompt bar, role-pinned suggestions, sub-2-minute share. Friction is the enemy of authentic contribution.",
      "Detail page: author name and avatar come before the workflow text. Credit is the currency — the design signals that.",
      "Mock data co-located with the page that uses it. In a prototype, that's an honest signal of what's real and what isn't.",
    ],
    tools: ["Replit Agent", "Vite + React + Tailwind", "wouter", "Lucide", "dicebear", "Wispr Flow"],
    skills: ["react-vite", "artifacts", "workflows", "pnpm-workspace"],
  },
  {
    key: "polish",
    label: "Polish",
    time: "~2 hrs",
    headline: "Cross-checked every number. Shipped the working, not just the result.",
    points: [
      "All figures reconciled across deck, admin view, one-pager PDF, and essay. One number in one place; everywhere else is a reference.",
      "Architect code review run after every major page. Caught copy that drifted into surveillance-adjacent phrasing — cut it.",
      "This page added last. Showing the process is part of the pitch. If the prototype is about transparency, the about page has to be too.",
    ],
    tools: ["Replit code review", "screenshot QA", "Wispr Flow"],
    skills: ["code-review", "validation", "diagnostics"],
  },
];

const TOOLS = [
  { name: "Replit Agent", note: "scaffold, iterate, deploy" },
  { name: "Wispr Flow", note: "voice-to-text across every phase" },
  { name: "Manus AI", note: "research brief synthesis, copy" },
  { name: "Anthropic API", note: "powers demo workflows" },
  { name: "Playfair Display + Inter", note: "type system" },
  { name: "Tailwind + Vite", note: "build chain" },
  { name: "Lucide icons", note: "1.5px stroke, used sparingly" },
  { name: "dicebear avatars", note: "peer faces in feed and admin" },
];

const NEXT = [
  {
    title: "Real telemetry on 'worked for me'",
    body: "Wire the count to the API server, deduplicate per user, and surface a 'most useful this week' rail from it.",
  },
  {
    title: "Capture-in-flow from Slack and Notion",
    body: "A slash-command and a Notion page action would push 80% of the friction out of the share step.",
  },
  {
    title: "Anti-spam + lightweight moderation",
    body: "Community signals and a quiet flagging affordance. No gatekeepers — low-quality workflows should sink, not be deleted.",
  },
  {
    title: "Manager digest — modelling, not mandating",
    body: "An opt-in weekly digest showing which workflows a team has tried in aggregate. A surface for leaders to model from, never to enforce from.",
  },
];

// ─── PhaseDonut ────────────────────────────────────────────────────────────

function PhaseDonut({
  activePhase,
  setActivePhase,
}: {
  activePhase: string;
  setActivePhase: (key: string) => void;
}) {
  const CX = 60, CY = 60, R_OUTER = 48, R_INNER = 30, GAP = 3;

  function hrs(time: string): number {
    const m = time.match(/\d+/);
    return m ? +m[0] : 0;
  }

  function pt(r: number, deg: number) {
    const rad = ((deg - 90) * Math.PI) / 180;
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
  }

  function arcPath(startDeg: number, endDeg: number): string {
    const s = startDeg + GAP / 2;
    const e = endDeg - GAP / 2;
    const large = e - s > 180 ? 1 : 0;
    const o1 = pt(R_OUTER, s), o2 = pt(R_OUTER, e);
    const i1 = pt(R_INNER, s), i2 = pt(R_INNER, e);
    const f = (n: number) => n.toFixed(2);
    return `M ${f(o1.x)} ${f(o1.y)} A ${R_OUTER} ${R_OUTER} 0 ${large} 1 ${f(o2.x)} ${f(o2.y)} L ${f(i2.x)} ${f(i2.y)} A ${R_INNER} ${R_INNER} 0 ${large} 0 ${f(i1.x)} ${f(i1.y)} Z`;
  }

  const total = PHASES.reduce((s, p) => s + hrs(p.time), 0);
  let cursor = 0;
  const segments = PHASES.map((p) => {
    const h = hrs(p.time);
    const start = (cursor / total) * 360;
    const end = ((cursor + h) / total) * 360;
    cursor += h;
    return { key: p.key, start, end };
  });

  const activeHrs = hrs(PHASES.find((p) => p.key === activePhase)?.time ?? "0");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0 14px" }}>
      <svg viewBox="0 0 120 120" width="106" height="106" style={{ display: "block" }} aria-label="Phase time distribution">
        {segments.map((seg) => {
          const isActive = seg.key === activePhase;
          return (
            <path
              key={seg.key}
              d={arcPath(seg.start, seg.end)}
              fill={isActive ? TOKENS.primary : TOKENS.rule}
              style={{ cursor: "pointer", transition: "fill 0.18s ease", outline: "none" }}
              onClick={() => setActivePhase(seg.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActivePhase(seg.key);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
              aria-label={`Select ${seg.key} phase`}
            />
          );
        })}
        <text
          x="60" y="56"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="15"
          fontWeight="600"
          fontFamily="'Playfair Display', Georgia, serif"
          fontStyle="italic"
          fill={TOKENS.text}
        >
          ~{activeHrs}h
        </text>
        <text
          x="60" y="70"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8"
          fontFamily="'Inter', system-ui, sans-serif"
          fill={TOKENS.muted}
        >
          of {total}h
        </text>
      </svg>
      <div
        style={{
          fontSize: "10px",
          color: TOKENS.muted,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginTop: "4px",
        }}
      >
        {total} hrs total
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [activePhase, setActivePhase] = useState<string>(PHASES[0].key);
  const phase = PHASES.find((p) => p.key === activePhase) ?? PHASES[0];
  const phaseIndex = PHASES.findIndex((p) => p.key === activePhase);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: TOKENS.bg,
        color: TOKENS.text,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflowX: "hidden",
      }}
      data-testid="about-page"
    >
      <header
        className="sticky top-0 z-20 border-b"
        style={{ borderColor: TOKENS.rule, backgroundColor: "rgba(251,248,244,0.92)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium hover:opacity-70 transition-opacity"
            style={{ color: TOKENS.muted }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            Back to cover
          </Link>
          <div
            className="text-[11px] font-medium uppercase"
            style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}
          >
            Workflow Mirror · About
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-32">

        {/* The bet callout */}
        <section
          className="mb-14 p-7 md:p-9 max-w-4xl relative"
          style={{ backgroundColor: TOKENS.card, border: `1px solid ${TOKENS.rule}` }}
          aria-labelledby="why-heading"
        >
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0"
            style={{ width: "3px", backgroundColor: TOKENS.accent }}
          />
          <div
            className="text-[11px] font-medium uppercase mb-3"
            style={{ color: TOKENS.accent, letterSpacing: "0.32em" }}
          >
            The bet
          </div>
          <h2
            id="why-heading"
            className="font-serif italic text-[24px] md:text-[30px] leading-[1.2] tracking-tight"
            style={{ fontFamily: SERIF, color: TOKENS.text }}
          >
            Why peer-led, not prescribed.
          </h2>
          <div className="mt-4 space-y-3 text-[15px] leading-[1.65] max-w-2xl" style={{ color: TOKENS.text }}>
            <p>
              Most AI adoption products treat this like a compliance problem: measure who uses it,
              nudge the rest, hand out credentials. That worldview produces shadow AI and
              performative usage — not adoption.
            </p>
            <p>
              Workflow Mirror inverts it. Active users share what works. Non-adopters discover
              those workflows on their own terms, in role-relevant clusters, with no management
              visibility and no mandate. Visibility, not training, is the gap. This closes it.
            </p>
          </div>
          <div className="mt-6" style={{ borderTop: `1px solid ${TOKENS.rule}`, paddingTop: "16px" }}>
            <Link
              href="/essay"
              data-testid="link-essay-from-about"
              className="inline-flex items-center gap-2 text-[13px] font-medium hover:opacity-70 transition-opacity"
              style={{ color: TOKENS.primary }}
            >
              Read the full argument
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </Link>
            <span className="ml-3 text-[12px]" style={{ color: TOKENS.muted }}>
              7-minute essay · with sources
            </span>
          </div>
        </section>

        {/* Phase stepper — vertical left rail */}
        <section className="mb-20" aria-labelledby="timeline-heading">
          <h2
            id="timeline-heading"
            className="font-serif italic text-[26px] md:text-[32px] tracking-tight mb-6"
            style={{ fontFamily: SERIF, color: TOKENS.text }}
          >
            The build, phase by phase.
          </h2>

          <div
            style={{
              border: `1px solid ${TOKENS.rule}`,
              backgroundColor: TOKENS.card,
              display: "flex",
              flexDirection: "row",
              minHeight: "320px",
            }}
            data-testid="phase-stepper"
          >
            {/* LEFT RAIL — clickable phase list */}
            <div
              role="tablist"
              aria-label="Build phases"
              style={{
                width: "220px",
                flexShrink: 0,
                borderRight: `1px solid ${TOKENS.rule}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {PHASES.map((p, i) => {
                const active = p.key === activePhase;
                return (
                  <button
                    key={p.key}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`phase-panel-${p.key}`}
                    id={`phase-tab-${p.key}`}
                    type="button"
                    onClick={() => setActivePhase(p.key)}
                    data-testid={`tab-${p.key}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "14px 16px 14px 18px",
                      borderLeft: active ? `3px solid ${TOKENS.primary}` : "3px solid transparent",
                      borderBottom: i < PHASES.length - 1 ? `1px solid ${TOKENS.rule}` : "none",
                      backgroundColor: active ? TOKENS.bg : "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "7px" }}>
                      <span
                        style={{
                          fontFamily: SERIF,
                          fontStyle: "italic",
                          fontSize: "11px",
                          color: active ? TOKENS.primary : TOKENS.muted,
                          flexShrink: 0,
                        }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          color: active ? TOKENS.text : TOKENS.muted,
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {p.label}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        color: TOKENS.muted,
                        flexShrink: 0,
                        marginLeft: "6px",
                      }}
                    >
                      {p.time}
                    </span>
                  </button>
                );
              })}

              {/* Total row + donut — pinned to bottom */}
              <div style={{ marginTop: "auto" }}>
                <div
                  style={{
                    padding: "11px 18px",
                    borderTop: `1px solid ${TOKENS.rule}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "12px", fontWeight: 600, color: TOKENS.text }}>
                    Total
                  </span>
                  <span style={{ fontSize: "12px", color: TOKENS.muted }}>~17 hrs</span>
                </div>
                <div style={{ borderTop: `1px solid ${TOKENS.rule}` }}>
                  <PhaseDonut activePhase={activePhase} setActivePhase={setActivePhase} />
                </div>
              </div>
            </div>

            {/* RIGHT PANEL — active phase content */}
            <div
              id={`phase-panel-${phase.key}`}
              role="tabpanel"
              aria-labelledby={`phase-tab-${phase.key}`}
              data-testid={`panel-${phase.key}`}
              style={{
                flex: 1,
                padding: "32px 36px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  color: TOKENS.muted,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                {phase.time} · phase {phaseIndex + 1} of {PHASES.length}
              </div>

              <h3
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: "22px",
                  lineHeight: "1.25",
                  color: TOKENS.text,
                  marginBottom: "20px",
                  letterSpacing: "-0.01em",
                }}
              >
                {phase.headline}
              </h3>

              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flex: 1,
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                }}
              >
                {phase.points.map((pt) => (
                  <li
                    key={pt}
                    style={{
                      display: "flex",
                      gap: "10px",
                      fontSize: "14px",
                      lineHeight: "1.65",
                      color: TOKENS.text,
                    }}
                  >
                    <ChevronRight
                      style={{
                        width: "16px",
                        height: "16px",
                        flexShrink: 0,
                        marginTop: "2px",
                        color: TOKENS.primary,
                      }}
                      strokeWidth={1.75}
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              {/* Tools + Skills chips */}
              <div
                style={{
                  marginTop: "28px",
                  paddingTop: "20px",
                  borderTop: `1px solid ${TOKENS.rule}`,
                  display: "flex",
                  gap: "32px",
                  flexWrap: "wrap",
                }}
              >
                {/* Tools used */}
                <div style={{ flex: "1 1 160px" }}>
                  <div
                    style={{
                      fontSize: "10px",
                      color: TOKENS.muted,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    Tools used
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {phase.tools.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontSize: "12px",
                          padding: "4px 10px",
                          color: TOKENS.text,
                          backgroundColor: TOKENS.bg,
                          border: `1px solid ${TOKENS.rule}`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills used */}
                <div style={{ flex: "1 1 160px" }}>
                  <div
                    style={{
                      fontSize: "10px",
                      color: TOKENS.muted,
                      letterSpacing: "0.32em",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    Skills used
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {phase.skills.map((s) => (
                      <span
                        key={s}
                        style={{
                          fontSize: "12px",
                          padding: "4px 10px",
                          color: TOKENS.primary,
                          backgroundColor: "transparent",
                          border: `1px solid ${TOKENS.primary}`,
                          opacity: 0.75,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The whole stack + What I'd do next */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          <div>
            <h2
              className="font-serif italic text-[24px] md:text-[30px] tracking-tight mb-5"
              style={{ fontFamily: SERIF, color: TOKENS.text }}
            >
              The whole stack.
            </h2>
            <p className="text-[14px] leading-[1.6] mb-5" style={{ color: TOKENS.muted }}>
              The same agent-driven workflow that built this prototype is the one being pitched to
              the customer.
            </p>
            <div style={{ borderTop: `1px solid ${TOKENS.rule}` }}>
              {TOOLS.map((t) => (
                <div
                  key={t.name}
                  className="flex items-baseline justify-between gap-6 py-3"
                  style={{ borderBottom: `1px solid ${TOKENS.rule}` }}
                >
                  <div className="text-[14px] font-medium" style={{ color: TOKENS.text }}>
                    {t.name}
                  </div>
                  <div className="text-[13px] text-right" style={{ color: TOKENS.muted }}>
                    {t.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2
              className="font-serif italic text-[24px] md:text-[30px] tracking-tight mb-5"
              style={{ fontFamily: SERIF, color: TOKENS.text }}
            >
              What I'd do next.
            </h2>
            <p className="text-[14px] leading-[1.6] mb-5" style={{ color: TOKENS.muted }}>
              Four natural next moves. None of them re-introduce a surveillance layer.
            </p>
            <div className="space-y-5">
              {NEXT.map((n, i) => (
                <div key={n.title}>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-serif italic text-[15px] shrink-0"
                      style={{ fontFamily: SERIF, color: TOKENS.muted }}
                    >
                      0{i + 1}
                    </span>
                    <div className="text-[14.5px] font-medium" style={{ color: TOKENS.text }}>
                      {n.title}
                    </div>
                  </div>
                  <p className="mt-1.5 ml-6 text-[13px] leading-[1.6]" style={{ color: TOKENS.muted }}>
                    {n.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* One-pager CTA */}
        <section className="mb-20">
          <div
            className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
            style={{ backgroundColor: TOKENS.card, border: `1px solid ${TOKENS.rule}` }}
          >
            <div className="max-w-xl">
              <div
                className="text-[11px] font-medium uppercase mb-3"
                style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}
              >
                Take it with you
              </div>
              <div
                className="font-serif italic text-[22px] md:text-[26px] leading-[1.2] tracking-tight"
                style={{ fontFamily: SERIF, color: TOKENS.text }}
              >
                The one-pager — bet, metric, ROI, pilot, on a single page.
              </div>
            </div>
            <a
              href={`${import.meta.env.BASE_URL}workflow-mirror-one-pager.pdf`}
              download
              data-testid="link-one-pager"
              className="inline-flex items-center gap-3 px-6 py-3.5 text-[14px] font-medium text-white hover:opacity-90 transition-opacity self-start md:self-auto"
              style={{
                backgroundColor: TOKENS.primary,
                borderRadius: "2px",
                letterSpacing: "0.01em",
              }}
            >
              <Download className="w-4 h-4" strokeWidth={1.75} />
              Download one-pager (PDF)
            </a>
          </div>
        </section>

        {/* Footer */}
        <div
          className="pt-8 flex items-baseline justify-between flex-wrap gap-4 text-[12px]"
          style={{ color: TOKENS.muted, borderTop: `1px solid ${TOKENS.rule}` }}
        >
          <div>
            Built solo, using Replit Agent + Claude Opus 4.6 · May 2026 · for Chico.ai's AI
            Adoption PM submission.
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            style={{ color: TOKENS.muted }}
          >
            See the admin view
            <ArrowUpRight className="w-3 h-3" strokeWidth={1.75} />
          </Link>
        </div>
      </main>
    </div>
  );
}
