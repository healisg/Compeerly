import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";

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
  name: string;
  time: string;
  narrative: string;
  decisions: string[];
  tools: string[];
};

const PHASES: Phase[] = [
  {
    key: "brief",
    name: "Brief & research",
    time: "~3 hrs",
    narrative:
      "Read the brief twice, then went and used the existing candidate's submission (chicoai.lovable.app) end-to-end. The point was not to copy it — it was to find the seams. The existing build is competent and earnest, but it leans into a usage-dashboard worldview: who's using AI, who isn't, who deserves credit. The research brief I commissioned in parallel — peer influence, surveillance penalties, the Management Science mentorship study — gave me the language for what I already suspected: visibility, not training, is the gap.",
    decisions: [
      "Treat the competing submission as the comparison set, not the ceiling.",
      "Commission a 10-citation research brief in parallel, before any UI work.",
      "Pick a thesis worth losing the role over rather than a safe synthesis.",
    ],
    tools: ["Manus", "Claude Sonnet 4.5", "browser, slowly"],
  },
  {
    key: "thesis",
    name: "Thesis & differentiation",
    time: "~2 hrs",
    narrative:
      "Wrote the one-line bet on a single page before anything else: peer-led, opt-in, surveillance-free. Then a list of features I would deliberately NOT build — assignment, nudge-the-consumer, skill credentials, completion tracking. Negative scope is the most underrated PM artefact. Most of the design discipline downstream came from this list, not from a moodboard.",
    decisions: [
      "Pick one metric: activation rate of latent users exposed to peer workflows.",
      "Refuse the surveillance layer outright. The opt-in design is the product.",
      "Frame the admin role as concierge, not foreman.",
    ],
    tools: ["A text file", "Claude (as sceptical reader)"],
  },
  {
    key: "brand",
    name: "Brand & deck",
    time: "~4 hrs",
    narrative:
      "Built the brand system before the slides — palette, type pairing, voice rules, do/don't. The cream + forest green + Playfair italic combination is doing a job: it signals editorial seriousness, which is the right register for a pitch about restraint. The 12-slide deck (Title → ROI Model → Pilot → Thank You) was written to be read in 60 seconds standing up, not 30 minutes seated.",
    decisions: [
      "British English everywhere. GBP only. Spell out peer-to-peer with the hyphen.",
      "No images, no illustrations on slides. Typography and colour do all the work.",
      "RoiModel slide must reconcile to the £ shown in the app's admin view.",
    ],
    tools: ["Replit Agent (slides artifact)", "Playfair Display", "Inter"],
  },
  {
    key: "app",
    name: "App build",
    time: "~6 hrs",
    narrative:
      "Five pages: cover, feed, capture, detail, admin. Built in that order because each one teaches the next. The capture flow is deliberately frictionless (one prompt bar, role-pinned suggestions); the detail page foregrounds the author's name and avatar before the workflow itself, because credit is the currency. The admin view came last so I could check the numbers reconcile with the deck. Mock data is co-located in the page that uses it — not in a shared library — because in a prototype that's an honest signal of what is and isn't real.",
    decisions: [
      "Use wouter, not react-router. Lighter, suits the page count.",
      "Co-locate mock data with the page consuming it.",
      "Hand-roll the SVG sparkline rather than pull a charting library.",
    ],
    tools: ["Replit Agent", "Vite + React + Tailwind", "wouter", "Lucide", "dicebear avatars"],
  },
  {
    key: "polish",
    name: "Polish",
    time: "~2 hrs (and counting)",
    narrative:
      "Cross-checked numbers across deck and admin, fixed copy that drifted into surveillance-adjacent phrasing, and ran a code review pass on every page. The polish pass is also where I added this page — a meta-pitch that earns its keep by showing the working, not just the result.",
    decisions: [
      "Run an architect review after each major page.",
      "Refuse to invent a 3-hour build claim. Tell the real timeline.",
      "Ship the about page; do not ship animation for animation's sake.",
    ],
    tools: ["Replit Agent code review", "manual screenshot QA"],
  },
];

const TOOLS = [
  { name: "Replit Agent", note: "scaffold, iterate, deploy" },
  { name: "Claude Sonnet 4.5", note: "thesis pressure-testing, copy edits" },
  { name: "Anthropic API", note: "wired to power demo workflows" },
  { name: "Manus", note: "research brief synthesis" },
  { name: "Playfair Display + Inter", note: "type system" },
  { name: "Tailwind + Vite", note: "build chain" },
  { name: "Lucide icons", note: "1.5px stroke, used sparingly" },
  { name: "dicebear avatars", note: "peer faces in feed and admin" },
];

const NEXT = [
  {
    title: "Real telemetry on \u2018worked for me\u2019",
    body:
      "Today the count is a state increment. Wire it to the API server, deduplicate per user, and use it as the input to a 'most useful this week' rail.",
  },
  {
    title: "Capture-in-flow from Slack and Notion",
    body:
      "Most workflow capture should happen at the moment of use, not in a separate app. A Slack slash-command and a Notion page action would push 80% of the friction out of the share step.",
  },
  {
    title: "Anti-spam + low-quality moderation",
    body:
      "Lightweight community signals (worked-for-me, role-relevance) plus a quiet flagging affordance. No editorial gatekeepers; the goal is for low-quality workflows to sink, not be deleted.",
  },
  {
    title: "Manager digest \u2014 modelling, not mandating",
    body:
      "An opt-in weekly digest for line managers showing which workflows their team has tried (in aggregate, never per-person). A surface for leaders to model from, never to enforce from.",
  },
];

export default function AboutPage() {
  const [openPhase, setOpenPhase] = useState<string>(PHASES[0].key);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: TOKENS.bg,
        color: TOKENS.text,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
      data-testid="about-page"
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
        <div className="max-w-5xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
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
            Workflow Mirror · About
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-32">
        {/* Eyebrow + title */}
        <section className="max-w-3xl mb-16">
          <div
            className="text-[11px] font-medium uppercase mb-6"
            style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}
          >
            Behind the prototype
          </div>
          <h1
            className="font-serif italic leading-[1.04] tracking-tight text-[44px] md:text-[72px]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: TOKENS.text,
            }}
          >
            How I built this.
          </h1>
          <div className="h-px w-[120px] mt-10" style={{ backgroundColor: TOKENS.rule }} />
          <p
            className="mt-8 text-[16px] md:text-[18px] leading-[1.6]"
            style={{ color: TOKENS.text }}
          >
            This isn't a deck. It's a working prototype, built with the same kind of tools the
            product is about — peer-shared AI workflows, captured in the open. The page below is
            a meta-pitch: what the brief was, what I bet on, and how the build actually went.
          </p>
        </section>

        {/* Why peer-led callout */}
        <section
          className="mb-20 p-8 md:p-10 max-w-4xl relative"
          style={{
            backgroundColor: TOKENS.card,
            border: `1px solid ${TOKENS.rule}`,
          }}
          aria-labelledby="why-heading"
        >
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0"
            style={{ width: "3px", backgroundColor: TOKENS.accent }}
          />
          <div
            className="text-[11px] font-medium uppercase mb-4"
            style={{ color: TOKENS.accent, letterSpacing: "0.32em" }}
          >
            The bet
          </div>
          <h2
            id="why-heading"
            className="font-serif italic text-[26px] md:text-[34px] leading-[1.18] tracking-tight max-w-3xl"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
          >
            Why peer-led, not prescribed.
          </h2>
          <div className="mt-6 space-y-4 text-[15.5px] leading-[1.65] max-w-2xl" style={{ color: TOKENS.text }}>
            <p>
              The competing submission treats AI adoption like a compliance problem: measure who
              uses it, nudge the rest, hand out credentials. That worldview is what produces
              shadow AI and performative usage in the first place.
            </p>
            <p>
              Workflow Mirror inverts it. Active users share what works, on their own terms.
              Non-adopters discover those workflows themselves, in role-relevant clusters, with
              no manager visibility and no mandate. Microsoft Research's 2026 study put the
              difference plainly: 88% of heavy AI users name peers as the strongest influence,
              versus 50% of light users. Visibility, not training, is the gap. This product
              closes it.
            </p>
          </div>
          <div className="mt-7" style={{ borderTop: `1px solid ${TOKENS.rule}`, paddingTop: "20px" }}>
            <Link
              href="/essay"
              data-testid="link-essay-from-about"
              className="inline-flex items-center gap-2 text-[13.5px] font-medium hover:opacity-70 transition-opacity"
              style={{ color: TOKENS.primary }}
            >
              Read the full argument
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </Link>
            <span
              className="ml-3 text-[12px]"
              style={{ color: TOKENS.muted }}
            >
              7-minute essay · with sources
            </span>
          </div>
        </section>

        {/* Build timeline */}
        <section className="mb-20" aria-labelledby="timeline-heading">
          <div className="flex items-baseline justify-between mb-8 flex-wrap gap-3">
            <h2
              id="timeline-heading"
              className="font-serif italic text-[26px] md:text-[34px] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
            >
              The build, honestly.
            </h2>
            <div className="text-[12.5px]" style={{ color: TOKENS.muted }}>
              Approx. 17 hours over 2 days. Click a phase to expand.
            </div>
          </div>

          <div style={{ borderTop: `1px solid ${TOKENS.rule}` }}>
            {PHASES.map((phase, i) => {
              const open = openPhase === phase.key;
              return (
                <div
                  key={phase.key}
                  style={{ borderBottom: `1px solid ${TOKENS.rule}` }}
                  data-testid={`phase-${phase.key}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenPhase(open ? "" : phase.key)}
                    className="w-full grid grid-cols-12 gap-4 items-baseline py-6 text-left hover:opacity-80 transition-opacity"
                    aria-expanded={open}
                    aria-controls={`phase-body-${phase.key}`}
                  >
                    <div
                      className="col-span-2 md:col-span-1 font-serif italic text-[18px]"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.muted }}
                    >
                      0{i + 1}
                    </div>
                    <div className="col-span-7 md:col-span-7">
                      <div
                        className="font-serif italic text-[20px] md:text-[24px] tracking-tight"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          color: open ? TOKENS.primary : TOKENS.text,
                        }}
                      >
                        {phase.name}
                      </div>
                    </div>
                    <div
                      className="col-span-3 md:col-span-3 text-right text-[13px] font-medium"
                      style={{ color: TOKENS.muted }}
                    >
                      {phase.time}
                    </div>
                    <div className="hidden md:block col-span-1 text-right text-[14px]" style={{ color: TOKENS.muted }}>
                      {open ? "−" : "+"}
                    </div>
                  </button>

                  {open && (
                    <div
                      id={`phase-body-${phase.key}`}
                      className="grid grid-cols-12 gap-4 pb-8"
                    >
                      <div className="hidden md:block col-span-1" />
                      <div className="col-span-12 md:col-span-7">
                        <p className="text-[15px] leading-[1.7]" style={{ color: TOKENS.text }}>
                          {phase.narrative}
                        </p>
                        <div
                          className="mt-6 text-[10px] font-medium uppercase mb-3"
                          style={{ color: TOKENS.muted, letterSpacing: "0.28em" }}
                        >
                          Key decisions
                        </div>
                        <ul className="space-y-2">
                          {phase.decisions.map((d) => (
                            <li
                              key={d}
                              className="flex gap-3 text-[14px] leading-[1.55]"
                              style={{ color: TOKENS.text }}
                            >
                              <span style={{ color: TOKENS.primary }}>—</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-12 md:col-span-4">
                        <div
                          className="text-[10px] font-medium uppercase mb-3"
                          style={{ color: TOKENS.muted, letterSpacing: "0.28em" }}
                        >
                          Tools used
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {phase.tools.map((t) => (
                            <span
                              key={t}
                              className="text-[12px] px-2.5 py-1"
                              style={{
                                color: TOKENS.text,
                                backgroundColor: TOKENS.card,
                                border: `1px solid ${TOKENS.rule}`,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Tools used (full strip) + What's next */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          <div>
            <h2
              className="font-serif italic text-[26px] md:text-[32px] tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
            >
              The whole stack.
            </h2>
            <p className="text-[14px] leading-[1.6] mb-6 max-w-md" style={{ color: TOKENS.muted }}>
              Listed honestly. The interesting line is not the framework choice — it's that the
              same agent-driven workflow that built this prototype is the one being pitched to
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
              className="font-serif italic text-[26px] md:text-[32px] tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
            >
              What I'd do next.
            </h2>
            <p className="text-[14px] leading-[1.6] mb-6 max-w-md" style={{ color: TOKENS.muted }}>
              The four moves that follow naturally from the thesis. Each one keeps the
              peer-led, opt-in posture intact — none of them re-introduce a surveillance
              layer.
            </p>
            <div className="space-y-5">
              {NEXT.map((n, i) => (
                <div key={n.title}>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-serif italic text-[16px]"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        color: TOKENS.muted,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <div className="text-[15px] font-medium" style={{ color: TOKENS.text }}>
                      {n.title}
                    </div>
                  </div>
                  <p
                    className="mt-1.5 ml-6 text-[13.5px] leading-[1.6]"
                    style={{ color: TOKENS.muted }}
                  >
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
                className="font-serif italic text-[22px] md:text-[28px] leading-[1.2] tracking-tight"
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

        {/* Footer credit */}
        <div
          className="pt-8 flex items-baseline justify-between flex-wrap gap-4 text-[12px]"
          style={{ color: TOKENS.muted, borderTop: `1px solid ${TOKENS.rule}` }}
        >
          <div>
            Built solo, using Replit Agent + Claude Sonnet 4.5 · May 2026 · for Chico.ai's
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
