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

type Phase = {
  key: string;
  label: string;
  time: string;
  headline: string;
  points: string[];
  tools: string[];
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
    tools: ["Manus", "Claude Sonnet 4.5"],
  },
  {
    key: "thesis",
    label: "Thesis",
    time: "~2 hrs",
    headline: "Wrote the one-line bet before anything else.",
    points: [
      "Peer-led, opt-in, surveillance-free. That's the whole product bet on a single line.",
      "Built a 'do not build' list: no assignment, no completion tracking, no skill credentials, no nudge campaigns. Negative scope is the most underrated PM artefact.",
      "One metric picked and defended: activation rate of latent users exposed to peer workflows. Everything else is noise until that number moves.",
    ],
    tools: ["A text file", "Claude (as sceptical reader)"],
  },
  {
    key: "brand",
    label: "Brand & deck",
    time: "~4 hrs",
    headline: "Brand system built before the slides — not after.",
    points: [
      "Cream + forest green + Playfair italic signals editorial restraint. The register earns trust in a pitch about trust.",
      "12 slides written to be read in 60 seconds standing up. Title → problem → bet → ROI → pilot → thank you. No filler.",
      "ROI numbers in the deck reconcile exactly to the £ figures shown in the admin view. If they diverge, the pitch fails.",
    ],
    tools: ["Replit Agent", "Playfair Display", "Inter"],
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
    tools: ["Replit Agent", "Vite + React + Tailwind", "wouter", "Lucide", "dicebear"],
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
    tools: ["Replit code review", "screenshot QA"],
  },
];

const TOOLS = [
  { name: "Replit Agent", note: "scaffold, iterate, deploy" },
  { name: "Manus AI", note: "thesis pressure-testing, copy" },
  { name: "Anthropic API", note: "powers demo workflows" },
  { name: "Manus", note: "research brief synthesis" },
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

export default function AboutPage() {
  const [activePhase, setActivePhase] = useState<string>(PHASES[0].key);
  const phase = PHASES.find((p) => p.key === activePhase) ?? PHASES[0];
  const phaseIndex = PHASES.findIndex((p) => p.key === activePhase);

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: TOKENS.bg, color: TOKENS.text, fontFamily: "'Inter', system-ui, sans-serif", overflowX: "hidden" }}
      data-testid="about-page"
    >
      <header className="sticky top-0 z-20 border-b" style={{ borderColor: TOKENS.rule, backgroundColor: "rgba(251,248,244,0.92)" }}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-medium hover:opacity-70 transition-opacity" style={{ color: TOKENS.muted }}>
            <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
            Back to cover
          </Link>
          <div className="text-[11px] font-medium uppercase" style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}>
            Workflow Mirror · About
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-32">
        <section className="mb-14 p-7 md:p-9 max-w-4xl relative" style={{ backgroundColor: TOKENS.card, border: `1px solid ${TOKENS.rule}` }} aria-labelledby="why-heading">
          <div aria-hidden className="absolute left-0 top-0 bottom-0" style={{ width: "3px", backgroundColor: TOKENS.accent }} />
          <div className="text-[11px] font-medium uppercase mb-3" style={{ color: TOKENS.accent, letterSpacing: "0.32em" }}>
            The bet
          </div>
          <h2 id="why-heading" className="font-serif italic text-[24px] md:text-[30px] leading-[1.2] tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}>
            Why peer-led, not prescribed.
          </h2>
          <div className="mt-4 space-y-3 text-[15px] leading-[1.65] max-w-2xl" style={{ color: TOKENS.text }}>
            <p>
              Most AI adoption products treat this like a compliance problem: measure who uses it, nudge the rest, hand out credentials. That worldview produces shadow AI and performative usage — not adoption.
            </p>
            <p>
              Workflow Mirror inverts it. Active users share what works. Non-adopters discover those workflows on their own terms, in role-relevant clusters, with no management visibility and no mandate. Visibility, not training, is the gap. This closes it.
            </p>
          </div>
          <div className="mt-6" style={{ borderTop: `1px solid ${TOKENS.rule}`, paddingTop: "16px" }}>
            <Link href="/essay" data-testid="link-essay-from-about" className="inline-flex items-center gap-2 text-[13px] font-medium hover:opacity-70 transition-opacity" style={{ color: TOKENS.primary }}>
              Read the full argument
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </Link>
            <span className="ml-3 text-[12px]" style={{ color: TOKENS.muted }}>
              7-minute essay · with sources
            </span>
          </div>
        </section>

        <section className="mb-20" aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="font-serif italic text-[26px] md:text-[32px] tracking-tight mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}>
            The build, phase by phase.
          </h2>

          <div className="flex flex-wrap gap-0 mb-0" style={{ borderBottom: `1px solid ${TOKENS.rule}` }} role="tablist" aria-label="Build phases">
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
                  className="flex items-center gap-2 px-4 py-3.5 text-[13px] whitespace-nowrap transition-colors relative shrink-0"
                  style={{
                    color: active ? TOKENS.primary : TOKENS.muted,
                    fontWeight: active ? 600 : 400,
                    borderBottom: active ? `2px solid ${TOKENS.primary}` : "2px solid transparent",
                    marginBottom: "-1px",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <span
                    className="text-[11px]"
                    style={{
                      color: active ? TOKENS.primary : TOKENS.muted,
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontStyle: "italic",
                    }}
                  >
                    0{i + 1}
                  </span>
                  {p.label}
                </button>
              );
            })}
          </div>

          <div
            id={`phase-panel-${phase.key}`}
            role="tabpanel"
            aria-labelledby={`phase-tab-${phase.key}`}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-0"
            style={{
              backgroundColor: TOKENS.card,
              border: `1px solid ${TOKENS.rule}`,
              borderTop: "none",
            }}
            data-testid={`panel-${phase.key}`}
          >
            <div className="lg:col-span-2 p-7 md:p-8">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif italic text-[14px]" style={{ color: TOKENS.muted, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {phase.time}
                </span>
              </div>
              <h3 className="font-serif italic text-[20px] md:text-[24px] leading-[1.25] tracking-tight mb-6" style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}>
                {phase.headline}
              </h3>
              <ul className="space-y-3">
                {phase.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[14.5px] leading-[1.6]" style={{ color: TOKENS.text }}>
                    <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.75} style={{ color: TOKENS.primary }} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1 p-7 md:p-8 flex flex-col gap-8" style={{ borderLeft: `1px solid ${TOKENS.rule}` }}>
              <div>
                <div className="text-[10px] font-medium uppercase mb-3" style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}>
                  Tools used
                </div>
                <div className="flex flex-wrap gap-2">
                  {phase.tools.map((t) => (
                    <span
                      key={t}
                      className="text-[12px] px-2.5 py-1"
                      style={{
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

              <div>
                <div className="text-[10px] font-medium uppercase mb-3" style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}>
                  Build timeline
                </div>
                <div className="space-y-2">
                  {PHASES.map((p) => {
                    const isCurrent = p.key === activePhase;
                    return (
                      <div
                        key={p.key}
                        className="flex items-center justify-between text-[13px] py-1"
                        style={{
                          color: isCurrent ? TOKENS.primary : TOKENS.muted,
                          fontWeight: isCurrent ? 600 : 400,
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{
                              backgroundColor: isCurrent ? TOKENS.primary : TOKENS.rule,
                            }}
                          />
                          {p.label}
                        </div>
                        <span className="text-[12px]">{p.time}</span>
                      </div>
                    );
                  })}
                  <div className="flex items-center justify-between text-[13px] pt-2 font-semibold" style={{ borderTop: `1px solid ${TOKENS.rule}`, color: TOKENS.text }}>
                    <span>Total</span>
                    <span>~17 hrs</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <button
                  type="button"
                  onClick={() => phaseIndex > 0 && setActivePhase(PHASES[phaseIndex - 1].key)}
                  disabled={phaseIndex === 0}
                  className="w-8 h-8 flex items-center justify-center transition-opacity disabled:opacity-30"
                  style={{
                    border: `1px solid ${TOKENS.rule}`,
                    borderRadius: "50%",
                    color: TOKENS.muted,
                    background: "none",
                    cursor: phaseIndex === 0 ? "default" : "pointer",
                  }}
                  aria-label="Previous phase"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => phaseIndex < PHASES.length - 1 && setActivePhase(PHASES[phaseIndex + 1].key)}
                  disabled={phaseIndex === PHASES.length - 1}
                  className="w-8 h-8 flex items-center justify-center transition-opacity disabled:opacity-30"
                  style={{
                    border: `1px solid ${TOKENS.rule}`,
                    borderRadius: "50%",
                    color: TOKENS.muted,
                    background: "none",
                    cursor: phaseIndex === PHASES.length - 1 ? "default" : "pointer",
                  }}
                  aria-label="Next phase"
                >
                  →
                </button>
                <span className="text-[12px]" style={{ color: TOKENS.muted }}>
                  {phaseIndex + 1} / {PHASES.length}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          <div>
            <h2 className="font-serif italic text-[24px] md:text-[30px] tracking-tight mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}>
              The whole stack.
            </h2>
            <p className="text-[14px] leading-[1.6] mb-5" style={{ color: TOKENS.muted }}>
              The same agent-driven workflow that built this prototype is the one being pitched to the customer.
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
            <h2 className="font-serif italic text-[24px] md:text-[30px] tracking-tight mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}>
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
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.muted }}
                    >
                      0{i + 1}
                    </span>
                    <div className="text-[14.5px] font-medium" style={{ color: TOKENS.text }}>
                      {n.title}
                    </div>
                  </div>
                  <p
                    className="mt-1.5 ml-6 text-[13px] leading-[1.6]"
                    style={{ color: TOKENS.muted }}
                  >
                    {n.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div
            className="p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
            style={{
              backgroundColor: TOKENS.card,
              border: `1px solid ${TOKENS.rule}`,
            }}
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
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
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

        <div
          className="pt-8 flex items-baseline justify-between flex-wrap gap-4 text-[12px]"
          style={{ color: TOKENS.muted, borderTop: `1px solid ${TOKENS.rule}` }}
        >
          <div>
            Built solo, using Replit Agent + Claude Opus 4.6 · May 2026 · for Chico.ai's
            AI Adoption PM submission.
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
