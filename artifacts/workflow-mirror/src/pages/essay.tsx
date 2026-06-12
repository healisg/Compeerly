import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageFooter } from "@/components/page-footer";

const TOKENS = {
  primary: "#166534",
  accent: "#92400E",
  bg: "#FBF8F4",
  text: "#3A3A3A",
  muted: "#8A7F70",
  rule: "#E5DBC8",
  card: "#FFFFFF",
};

type Section = {
  key: string;
  num: string;
  title: string;
  standfirst: string;
  body: React.ReactNode;
};

type Source = {
  n: number;
  cite: string;
  url: string;
};

const SOURCES: Source[] = [
  {
    n: 1,
    cite: 'Baym, N., Dillon, E., & Jaffe, S. (2026). "Peer Influence Can Make or Break Your AI Rollout." Harvard Business Review, March 2026.',
    url: "https://hbr.org/2026/03/peer-influence-can-make-or-break-your-ai-rollout",
  },
  {
    n: 2,
    cite: 'Hermann, E., Puntoni, S., & Morewedge, C. K. (2026). "AI Adoption Is a Challenge. Here\'s a Solution." Knowledge at Wharton.',
    url: "https://knowledge.wharton.upenn.edu/article/ai-adoption-is-a-challenge-heres-a-solution/",
  },
  {
    n: 3,
    cite: 'American Psychological Association (2023). "Electronically monitoring your employees? It\'s impacting their mental health."',
    url: "https://www.apa.org/topics/healthy-workplaces/employee-electronic-monitoring",
  },
  {
    n: 4,
    cite: 'Sandvik, J., Saouma, R., Seegert, N., & Stanton, C. (2025). "Should Human Capital Development Programs be Mandatory or Voluntary? Evidence from a Field Experiment on Mentorship." Management Science.',
    url: "https://doi.org/10.1287/mnsc.2024.07524",
  },
  {
    n: 5,
    cite: "Rogers, E. M. (2003). Diffusion of Innovations, 5th edition. Free Press.",
    url: "https://web.stanford.edu/class/symbsys205/Diffusion%20of%20Innovations",
  },
  {
    n: 6,
    cite: 'BCG (2025). "AI at Work 2025: Momentum Builds, but Gaps Remain." Boston Consulting Group.',
    url: "https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain",
  },
  {
    n: 7,
    cite: 'Microsoft & LinkedIn (2024). "AI at Work Is Here. Now Comes the Hard Part." Work Trend Index Annual Report.',
    url: "https://www.microsoft.com/en-us/worklab/work-trend-index/ai-at-work-is-here-now-comes-the-hard-part",
  },
];

function Cite({ n }: { n: number }) {
  return (
    <a
      href={`#source-${n}`}
      className="inline-block align-super text-[10px] font-medium no-underline ml-0.5 hover:opacity-70"
      style={{ color: TOKENS.primary, lineHeight: 1 }}
      data-testid={`cite-${n}`}
    >
      [{n}]
    </a>
  );
}

function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`mb-5 ${className}`} style={{ color: TOKENS.text }}>
      {children}
    </p>
  );
}

function Pull({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="my-10 py-2 pl-6"
      style={{ borderLeft: `2px solid ${TOKENS.rule}` }}
    >
      <p
        className="font-serif italic text-[21px] md:text-[23px] leading-[1.4]"
        style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {children}
      </p>
    </blockquote>
  );
}

const SECTIONS: Section[] = [
  {
    key: "visibility",
    num: "01",
    title: "The problem isn't capability. It's visibility.",
    standfirst:
      "Enterprise AI tools have a distribution problem, not a training problem. The gap between heavy users and non-users has one root cause — and the dashboard can see it but not fix it.",
    body: (
      <>
        <P>
          BCG's 2026 AI at Work survey found that 88% of executives use AI regularly,
          against 51% of frontline employees.<Cite n={6} /> Microsoft and LinkedIn's Work
          Trend Index put generative AI use at 75% of global knowledge workers, with adoption
          nearly doubling in six months.<Cite n={7} /> The tools are deployed. The licences
          are paid. The gap is not access.
        </P>
        <P>
          The most direct evidence for what the gap actually is comes from a 2026 Microsoft
          Research study published in Harvard Business Review. Among employees in the top
          quartile of AI usage, 88% described peers as the most influential factor in shaping
          their AI behaviour. Among employees in the bottom quartile, only 50% did.<Cite n={1} />
        </P>
        <P>
          The same study found that 12% of low-use employees said AI had literally never come
          up in informal conversation with their colleagues — compared to just 1% of heavy
          users.<Cite n={1} /> That is not a training gap. It is a visibility gap. Non-adopters
          are not unable to use AI. They have simply never seen a person they trust use it for
          a task that resembles their own.
        </P>
        <Pull>
          The dashboard can see who isn't using AI. It cannot make those conversations happen.
        </Pull>
        <P>
          The consequence of invisible AI use is predictable. Approximately 31% of US knowledge
          workers admit to actively working around their company's AI initiatives.<Cite n={2} />
          More than half report they would use AI tools without formal approval — creating a
          substantial shadow AI economy that usage dashboards observe but cannot address. The
          information about what's working stays private. Non-adopters have no social proof
          that the technology works in their specific role, for their specific tasks, in the
          hands of people they actually trust.
        </P>
        <P>
          Compeerly is a direct response to that structural problem. It makes private AI
          use visible and shareable — converting what is currently an invisible individual
          practice into a social, observable norm. The mechanism is not training. It is
          exposure.
        </P>
      </>
    ),
  },
  {
    key: "peers",
    num: "02",
    title: "Why peers are more persuasive than managers.",
    standfirst:
      "Peer influence is not a nice-to-have on top of a manager-led programme. It is a psychologically distinct mechanism that manager-led mandates actively undermine.",
    body: (
      <>
        <P>
          Everett Rogers' foundational research on the diffusion of innovations established
          that adoption decisions are driven primarily by subjective evaluations from trusted
          peers, not by objective assessments from authority figures.<Cite n={5} /> The reason
          is straightforward: a peer who shares a workflow is saying "this worked for me, in a
          job like yours, with constraints like yours." A manager who runs a training session
          is saying "this is what the organisation requires of you." These produce
          fundamentally different responses.
        </P>
        <P>
          Wharton research frames the mechanism in terms of self-determination theory.<Cite n={2} />
          Genuine adoption requires three psychological conditions: autonomy — the sense that
          you are choosing to act; competence — the sense that you are capable; and relatedness
          — the sense that your behaviour connects you to people you respect. Manager-led
          mandates frequently undermine all three. They remove autonomy by making adoption
          compulsory, they undermine competence by imposing generic workflows that may not fit
          specific roles, and they damage relatedness by framing AI adoption as a compliance
          exercise rather than a shared professional practice.
        </P>
        <Pull>
          A peer sharing a workflow says: this worked for me. A mandate says: this is required
          of you. The psychological effect is not subtle.
        </Pull>
        <P>
          The Microsoft Research data makes an important distinction about where leadership
          does and does not contribute. 17% of heavy AI users cited leaders as influential —
          but specifically through modelling: seeing a leader demonstrate a real use of AI,
          including failures.<Cite n={1} /> Just 12% of light users described any meaningful
          leadership influence at all. The operative verb is modelling, not mandating. Leaders
          who use AI visibly and share their own experiences contribute meaningfully to
          adoption. Leaders who mandate use and track compliance do not.
        </P>
        <P>
          This distinction matters for product design. A peer-led platform creates a space
          where leaders can participate as peers — sharing their own workflows alongside
          everyone else — without the platform becoming a surveillance instrument. The
          modelling effect is preserved. The mandate effect is deliberately absent.
        </P>
      </>
    ),
  },
  {
    key: "design",
    num: "03",
    title: "The design that follows from the evidence.",
    standfirst:
      "Once the mechanism is clear, the product decisions follow directly. Opt-in, no surveillance layer, friction asymmetry. Each choice is evidence-backed — not a philosophical preference.",
    body: (
      <>
        <P>
          The deliberate exclusion of a management surveillance layer is the most consequential
          design decision in Compeerly. The American Psychological Association reports
          that among electronically monitored employees, 56% feel tense or stressed at work —
          compared to 40% of non-monitored employees.<Cite n={3} /> Monitored employees are
          more likely to do the bare minimum required. For a knowledge-sharing platform,
          the implications are direct: an employee who shares a workflow on a platform
          management can monitor will not share authentically. They will share the workflow
          that makes them look competent, not the one that is genuinely useful. Surveillance
          destroys the authenticity that makes peer sharing worth anything.
        </P>
        <P>
          On opt-in participation: the honest counter-evidence is a 2025 field experiment
          published in Management Science, which found that a mandatory mentorship programme
          successfully raised productivity while a voluntary version did not.<Cite n={4} /> The
          mechanism was self-selection — the employees with the most to gain were the most
          likely to opt out of the voluntary programme. This finding is real and cannot be
          dismissed.
        </P>
        <Pull>
          The answer is not mandate. It is friction asymmetry.
        </Pull>
        <P>
          The Management Science study was conducted with formal mentorship — 30-minute weekly
          meetings over four weeks, sustained vulnerability, active participation. The friction
          of that programme is orders of magnitude higher than browsing a searchable library of
          short workflow descriptions. The opt-in threshold for <em>reading</em> a peer's
          workflow should be effectively zero: no registration, no signal, no inbox. The
          opt-in threshold for <em>sharing</em> should be deliberate — the 2–5 minute
          commitment is itself a quality filter that screens for genuine engagement.
        </P>
        <P>
          For a PM building in this space, these constraints are not soft guardrails — they are
          the product. The pressure to add manager visibility, assignment flows, or completion
          tracking will arrive in the first commercial conversation. Shipping those features
          does not extend the product. It replaces it with something that produces the
          compliance behaviour the evidence says peer-led platforms exist to avoid. The job is
          to know which features earn the authenticity that makes the rest work — and to defend
          that boundary in the meetings where the product is actually decided.
        </P>
      </>
    ),
  },
];

export default function EssayPage() {
  const [active, setActive] = useState<string>(SECTIONS[0].key);
  const section = SECTIONS.find((s) => s.key === active) ?? SECTIONS[0];
  const idx = SECTIONS.findIndex((s) => s.key === active);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: TOKENS.bg,
        color: TOKENS.text,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflowX: "hidden",
      }}
      data-testid="page-essay"
    >
      <header
        className="px-8 md:px-16 lg:px-24 py-6 flex items-center justify-between"
        style={{ borderBottom: `1px solid ${TOKENS.rule}` }}
      >
        <Link
          href="/"
          data-testid="link-back-cover"
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
          Compeerly · The argument
        </div>
      </header>

      <main className="px-8 md:px-16 lg:px-24 py-14 md:py-18 max-w-[860px] mx-auto">
        {/* Page header */}
        <div className="mb-12">
          <div
            className="text-[11px] font-medium uppercase mb-5"
            style={{ color: TOKENS.accent, letterSpacing: "0.32em" }}
          >
            The case for peer-led AI adoption
          </div>
          <h1
            className="font-serif italic leading-[1.06] tracking-tight text-[36px] md:text-[52px] mb-5"
            style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}
            data-testid="essay-title"
          >
            Why peer-led adoption beats manager-led mandates.
          </h1>
          <p className="text-[16px] leading-[1.6] max-w-[58ch]" style={{ color: TOKENS.muted }}>
            Three sections, grounded in evidence. The structural problem, the mechanism that
            solves it, and the design choices that follow.
          </p>
          <div className="flex items-center gap-4 mt-6 text-[12px]" style={{ color: TOKENS.muted }}>
            <span>3 sections · ~12 min · British English</span>
          </div>
        </div>

        {/* Section tab nav */}
        <div
          className="flex flex-wrap gap-0 mb-0"
          style={{ borderBottom: `1px solid ${TOKENS.rule}` }}
          role="tablist"
          aria-label="Essay sections"
        >
          {SECTIONS.map((s) => {
            const isActive = s.key === active;
            return (
              <button
                key={s.key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`section-panel-${s.key}`}
                id={`section-tab-${s.key}`}
                type="button"
                onClick={() => setActive(s.key)}
                data-testid={`tab-${s.key}`}
                className="flex items-center gap-2 px-4 py-3.5 text-[13px] whitespace-nowrap transition-colors relative shrink-0"
                style={{
                  color: isActive ? TOKENS.primary : TOKENS.muted,
                  fontWeight: isActive ? 600 : 400,
                  borderBottom: isActive ? `2px solid ${TOKENS.primary}` : "2px solid transparent",
                  marginBottom: "-1px",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <span
                  className="text-[11px]"
                  style={{
                    color: isActive ? TOKENS.primary : TOKENS.muted,
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: "italic",
                  }}
                >
                  {s.num}
                </span>
                <span className="hidden sm:inline">{s.title.split(".")[0]}.</span>
                <span className="sm:hidden">Section {s.num}</span>
              </button>
            );
          })}
        </div>

        {/* Section content */}
        <div
          id={`section-panel-${section.key}`}
          role="tabpanel"
          aria-labelledby={`section-tab-${section.key}`}
          className="pt-10 pb-4"
          data-testid={`panel-${section.key}`}
        >
          <div
            className="text-[11px] font-medium uppercase mb-4"
            style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}
          >
            Section {section.num} of {SECTIONS.length}
          </div>
          <h2
            className="font-serif italic text-[28px] md:text-[38px] leading-[1.1] tracking-tight mb-5"
            style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {section.title}
          </h2>
          <p
            className="text-[16px] md:text-[17px] leading-[1.55] mb-10 max-w-[58ch]"
            style={{ color: TOKENS.muted }}
          >
            {section.standfirst}
          </p>

          <div className="h-px w-[80px] mb-10" style={{ backgroundColor: TOKENS.rule }} />

          <article
            className="text-[16px] leading-[1.78] max-w-[66ch]"
            style={{ color: TOKENS.text }}
          >
            {section.body}
          </article>
        </div>

        {/* Section navigation */}
        <div
          className="flex items-center justify-between pt-8 mt-4"
          style={{ borderTop: `1px solid ${TOKENS.rule}` }}
        >
          <button
            type="button"
            onClick={() => idx > 0 && setActive(SECTIONS[idx - 1].key)}
            disabled={idx === 0}
            className="inline-flex items-center gap-2 text-[13px] font-medium transition-opacity disabled:opacity-25 hover:opacity-70"
            style={{ color: TOKENS.muted, background: "none", cursor: idx === 0 ? "default" : "pointer" }}
            aria-label="Previous section"
          >
            ← {idx > 0 ? SECTIONS[idx - 1].title.split(".")[0] : ""}
          </button>
          <span className="text-[12px]" style={{ color: TOKENS.muted }}>
            {idx + 1} / {SECTIONS.length}
          </span>
          <button
            type="button"
            onClick={() => idx < SECTIONS.length - 1 && setActive(SECTIONS[idx + 1].key)}
            disabled={idx === SECTIONS.length - 1}
            className="inline-flex items-center gap-2 text-[13px] font-medium transition-opacity disabled:opacity-25 hover:opacity-70"
            style={{ color: TOKENS.muted, background: "none", cursor: idx === SECTIONS.length - 1 ? "default" : "pointer" }}
            aria-label="Next section"
          >
            {idx < SECTIONS.length - 1 ? SECTIONS[idx + 1].title.split(".")[0] : ""} →
          </button>
        </div>

        {/* Sources — shown only on last section, or always at bottom */}
        <div className="mt-16">
          <div className="h-px w-full mb-12" style={{ backgroundColor: TOKENS.rule }} />
          <h2
            className="font-serif italic text-[22px] md:text-[24px] mb-6"
            style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Sources.
          </h2>
          <ol className="space-y-4 text-[13px] leading-[1.65]" style={{ color: TOKENS.muted }}>
            {SOURCES.map((s) => (
              <li
                key={s.n}
                id={`source-${s.n}`}
                className="flex gap-3"
                data-testid={`source-${s.n}`}
              >
                <span
                  className="font-serif italic shrink-0"
                  style={{
                    color: TOKENS.primary,
                    fontFamily: "'Playfair Display', Georgia, serif",
                    width: "1.6em",
                  }}
                >
                  [{s.n}]
                </span>
                <span>
                  {s.cite}{" "}
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 hover:opacity-70 underline-offset-2 hover:underline"
                    style={{ color: TOKENS.primary }}
                  >
                    Link
                    <ArrowUpRight className="w-3 h-3" strokeWidth={1.75} />
                  </a>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Footer */}
        <div
          className="mt-12 pt-8 flex items-baseline justify-between flex-wrap gap-4 text-[12px]"
          style={{ color: TOKENS.muted, borderTop: `1px solid ${TOKENS.rule}` }}
        >
          <div>Compeerly · May 2026 · Evidence-based</div>
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            style={{ color: TOKENS.muted }}
            data-testid="link-back-about"
          >
            How I built this
            <ArrowUpRight className="w-3 h-3" strokeWidth={1.75} />
          </Link>
        </div>
      </main>
      <PageFooter />
    </div>
  );
}
