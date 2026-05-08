import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const TOKENS = {
  primary: "#166534",
  accent: "#92400E",
  bg: "#FBF8F4",
  text: "#3A3A3A",
  muted: "#8A7F70",
  rule: "#E5DBC8",
  card: "#FFFFFF",
};

type Source = {
  n: number;
  cite: string;
  url: string;
};

const SOURCES: Source[] = [
  {
    n: 1,
    cite:
      "Baym, N., Dillon, E., & Jaffe, S. (2026). \"Peer Influence Can Make or Break Your AI Rollout.\" Harvard Business Review, March 2026.",
    url: "https://hbr.org/2026/03/peer-influence-can-make-or-break-your-ai-rollout",
  },
  {
    n: 2,
    cite:
      "Hermann, E., Puntoni, S., & Morewedge, C. K. (2026). \"AI Adoption Is a Challenge. Here's a Solution.\" Knowledge at Wharton.",
    url: "https://knowledge.wharton.upenn.edu/article/ai-adoption-is-a-challenge-heres-a-solution/",
  },
  {
    n: 3,
    cite:
      "American Psychological Association (2023). \"Electronically monitoring your employees? It's impacting their mental health.\"",
    url: "https://www.apa.org/topics/healthy-workplaces/employee-electronic-monitoring",
  },
  {
    n: 4,
    cite:
      "Sandvik, J., Saouma, R., Seegert, N., & Stanton, C. (2025). \"Should Human Capital Development Programs be Mandatory or Voluntary? Evidence from a Field Experiment on Mentorship.\" Management Science.",
    url: "https://doi.org/10.1287/mnsc.2024.07524",
  },
  {
    n: 5,
    cite: "Rogers, E. M. (2003). Diffusion of Innovations, 5th edition. Free Press.",
    url: "https://web.stanford.edu/class/symbsys205/Diffusion%20of%20Innovations",
  },
  {
    n: 6,
    cite:
      "Wang, J., Shih, P. C., & Carroll, J. M. (2015). \"Revisiting Linus's law: Benefits and challenges of open source software peer review.\" International Journal of Human-Computer Studies, 77, 52–65.",
    url: "https://doi.org/10.1016/j.ijhcs.2015.01.005",
  },
  {
    n: 7,
    cite:
      "BCG (2025). \"AI at Work 2025: Momentum Builds, but Gaps Remain.\" Boston Consulting Group — leadership-vs-frontline AI usage gap.",
    url: "https://www.bcg.com/publications/2025/ai-at-work-momentum-builds-but-gaps-remain",
  },
  {
    n: 8,
    cite:
      "Microsoft & LinkedIn (2024). \"AI at Work Is Here. Now Comes the Hard Part.\" Work Trend Index Annual Report — Copilot/AI penetration among knowledge workers.",
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

export default function EssayPage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: TOKENS.bg,
        color: TOKENS.text,
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
      data-testid="page-essay"
    >
      {/* Top chrome — matches admin/about */}
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
          Workflow Mirror · Essay
        </div>
      </header>

      <main className="px-8 md:px-16 lg:px-24 py-16 md:py-20 max-w-[820px] mx-auto">
        {/* Eyebrow */}
        <div
          className="text-[11px] font-medium uppercase mb-6"
          style={{ color: TOKENS.accent, letterSpacing: "0.32em" }}
        >
          The argument
        </div>

        {/* Title */}
        <h1
          className="font-serif italic leading-[1.05] tracking-tight text-[40px] md:text-[56px] mb-6"
          style={{
            color: TOKENS.text,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}
          data-testid="essay-title"
        >
          Recipes are still top-down. Here's why the 460 won't follow them.
        </h1>

        {/* Standfirst */}
        <p
          className="text-[18px] md:text-[19px] leading-[1.55] mb-2"
          style={{ color: TOKENS.muted, maxWidth: "62ch" }}
        >
          A direct response to the &ldquo;recipes, not training&rdquo; thesis — and the
          case for peer-led discovery as the only mechanism that survives contact with
          enterprise reality.
        </p>

        {/* Meta */}
        <div
          className="text-[12px] mt-6 mb-12"
          style={{ color: TOKENS.muted, letterSpacing: "0.06em" }}
        >
          7 minutes · May 2026 · British English
        </div>

        <div className="h-px w-[120px] mb-12" style={{ backgroundColor: TOKENS.rule }} />

        {/* Body */}
        <article
          className="text-[16.5px] leading-[1.78]"
          style={{ color: TOKENS.text, maxWidth: "68ch" }}
        >
          {/* Section 1 — Shared diagnosis */}
          <h2
            className="font-serif italic text-[26px] md:text-[30px] leading-[1.2] mt-2 mb-5"
            style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What the recipes camp gets right.
          </h2>

          <p className="mb-5">
            Start with the agreement. Generic AI training does not move the needle.
            The competing submission's diagnosis is correct: rolling out a Copilot
            licence and a 45-minute video does not change behaviour, because the
            gap is not at the company level — it is at the task level. People do
            not need to be told that AI exists. They need to know what to do with
            it on a Tuesday afternoon, with a half-finished spreadsheet and a
            client call in twenty minutes.
          </p>
          <p className="mb-5">
            That diagnosis is also right that identity threat is the live wire.
            Senior people resist generic training because the implicit message —
            &ldquo;your existing way of working is wrong, here is the correct
            one&rdquo; — collides with their professional self-image
            <Cite n={2} />. Compliance follows; learning does not. So far, so
            agreed.
          </p>
          <p className="mb-5">
            The disagreement is about the proposed cure. The recipes camp wants
            to give those same senior people a curated playbook of pre-approved
            workflows: here is how a financial analyst should write a board
            update, here is how a recruiter should shortlist a CV. Their
            argument is that recipes are concrete enough to use and specific
            enough to bypass identity threat. They are not. They re-introduce
            the threat in a thinner disguise.
          </p>

          {/* Section 2 — Where prescription breaks down */}
          <h2
            className="font-serif italic text-[26px] md:text-[30px] leading-[1.2] mt-12 mb-5"
            style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Where prescription breaks down.
          </h2>

          <p className="mb-5">
            The same identity-threat argument that explains why generic training
            fails also explains why prescribed recipes will plateau. A senior
            analyst told &ldquo;here is the recipe you should follow&rdquo; feels
            the same as a senior analyst told &ldquo;here is the training you must
            complete.&rdquo; The voice is different — more specific, more
            tactical — but the speaker is the same. It is the organisation,
            telling an expert how to do their job.
          </p>
          <p className="mb-5">
            Self-determination research is unambiguous on this point. Adoption
            requires three conditions: autonomy (I am choosing this), competence
            (I can do this), and relatedness (this connects me to people I
            respect)<Cite n={2} />. Recipes deliver one of the three. They
            confer a kind of competence — &ldquo;here are the steps&rdquo; —
            but they remove autonomy by pre-deciding the right approach, and
            they damage relatedness by routing knowledge through the centre
            rather than across the team. The result is the same as training:
            adoption rates that look acceptable on the dashboard, and a long
            tail of polite, performative usage underneath.
          </p>

          {/* Pull quote */}
          <blockquote
            className="my-10 py-2 pl-6"
            style={{ borderLeft: `2px solid ${TOKENS.rule}` }}
          >
            <p
              className="font-serif italic text-[22px] md:text-[24px] leading-[1.4]"
              style={{
                color: TOKENS.text,
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Recipes do not solve the identity-threat problem. They re-instantiate
              it with a better menu.
            </p>
          </blockquote>

          <p className="mb-5">
            There is also a quality problem with central curation that the
            recipes camp underplays. Workflow knowledge is tacit: it depends on
            the constraints of the role, the data available, the team's house
            style, and a hundred other small things that the curator does not
            know. A pre-approved recipe written for &ldquo;the recruiter&rdquo;
            is not written for any actual recruiter. It generalises away the
            very things that make a workflow work.
          </p>

          {/* Section 3 — The peer-led mechanism */}
          <h2
            className="font-serif italic text-[26px] md:text-[30px] leading-[1.2] mt-12 mb-5"
            style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What peer-led actually does differently.
          </h2>

          <p className="mb-5">
            When Priya N., a senior analyst on the team, posts the prompt she
            uses to draft her weekly board update — including the bit where she
            asks the model to argue against itself before she writes the final
            paragraph — three things change at once. Her expertise is honoured
            rather than replaced; the workflow comes with the implicit context
            of someone with constraints like mine; and the act of sharing
            converts a private practice into a visible social norm.
          </p>
          <p className="mb-5">
            That last shift is the one most adoption strategies miss. Adoption
            is a status question before it is a competence question. Diffusion
            research has shown for sixty years that people adopt new
            behaviours when they see trusted peers doing them, not when they
            are told to<Cite n={5} />. A peer who shares a workflow is
            implicitly saying: &ldquo;this worked for me, in a job like yours,
            with constraints like yours.&rdquo; That is a fundamentally
            different message from &ldquo;the organisation has approved this
            recipe.&rdquo; The first invites; the second instructs.
          </p>
          <p className="mb-5">
            The peer-led model also dissolves the surveillance problem the
            recipes camp does not even acknowledge it has. Approved recipes
            need adoption tracking to know whether they are working — which
            re-introduces exactly the monitoring layer that drives shadow AI
            in the first place. Peer sharing requires no such tracking.
            Whether the workflow spread is visible in the workflow's own
            engagement, not in an admin's dashboard.
          </p>

          {/* Section 4 — The data */}
          <h2
            className="font-serif italic text-[26px] md:text-[30px] leading-[1.2] mt-12 mb-5"
            style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What the data actually supports.
          </h2>

          <p className="mb-5">
            Set the macro picture first. BCG's 2025 AI at Work survey
            reported that 88% of executives use AI regularly, against 51%
            of frontline employees<Cite n={7} />. Microsoft and LinkedIn's
            Work Trend Index put generative AI use at 75% of global
            knowledge workers, with usage nearly doubling in six
            months<Cite n={8} />. AI at work is no longer a leadership
            curiosity; it is a daily-use technology with a stubborn
            distribution problem. The dashboard sees the gap. It cannot
            close it.
          </p>
          <p className="mb-5">
            The strongest single piece of evidence on <em>why</em> the gap
            persists is from a 2026 Microsoft Research study published in
            the Harvard Business Review. Among heavy AI users, 88% named
            peers as the most influential factor in shaping their AI
            behaviour. Among light users, only 50% did<Cite n={1} />. The
            same study reported that 12% of light users said AI had
            literally never come up in informal conversation with their
            colleagues, against 1% of heavy users. That is not a training
            gap. It is a visibility gap.
          </p>
          <p className="mb-5">
            The same body of research is also realistic about leadership.
            Leaders matter, but in a specific way: 17% of heavy users cited
            leaders modelling AI use as influential — leaders showing their
            own real workflows, including the failures — versus 12% of light
            users<Cite n={1} />. The operative verb is modelling, not
            mandating. A peer-led product allows leaders to participate as
            peers; a recipes catalogue casts them as authors of the canon.
            The first is supported by the data; the second is not.
          </p>
          <p className="mb-5">
            On the surveillance question, the evidence is unambiguous and
            unfashionable. Among electronically monitored employees, 56%
            report feeling tense or stressed at work, against 40% of
            non-monitored employees<Cite n={3} />. Roughly 31% of US
            knowledge workers admit to actively working around their
            company's AI initiatives<Cite n={2} />. Any product that needs
            to track recipe adoption to prove its value is feeding that
            number, not reducing it.
          </p>
          <p className="mb-5">
            The honest counter-evidence is the &ldquo;voluntary trap.&rdquo;
            A 2025 field experiment in Management Science found that a
            mandatory mentorship programme raised productivity where a
            voluntary version of the same programme did not — the people
            who would have benefitted most were the ones least likely to
            opt in<Cite n={4} />. That finding is real, and any peer-led
            product has to take it seriously. The mitigation is not
            mandate; it is friction asymmetry. The opt-in cost of
            <em> reading</em> a peer's workflow should be effectively zero
            — no registration, no signal, no inbox. The opt-in cost of
            <em> sharing</em> should be deliberate, because the deliberation
            is itself the quality filter. That is exactly the
            consumption/contribution split the product is built around.
          </p>
          <p className="mb-5">
            On the &ldquo;low-quality workflow&rdquo; risk, peer networks are
            more self-correcting than they look. Linus's law applies:
            workflows that are flawed are tried, found unhelpful, and
            quietly abandoned, while workflows that work spread<Cite n={6} />.
            Structured templates and role-based filtering close most of the
            remaining gap. None of these mitigations require an editorial
            layer; they require sensible defaults.
          </p>

          {/* Section 5 — What this means for the role */}
          <h2
            className="font-serif italic text-[26px] md:text-[30px] leading-[1.2] mt-12 mb-5"
            style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            What this means for the AI Adoption PM role.
          </h2>

          <p className="mb-5">
            Shipping a peer-led product is not the easier path. A recipes
            catalogue is, in some ways, the safer pitch — it has a clean
            content pipeline, a satisfying admin surface, and a story that
            executives find legible. Peer-led requires harder work in
            places that do not show up on a roadmap: concierge capture for
            the first two weeks, contributor recognition that does not
            tip over into surveillance, role-coverage analytics that
            measure breadth without policing individuals, an anti-spam
            posture that protects the signal, and the discipline to
            <em> not</em> add the admin-assignment features that would
            betray the model the moment they ship.
          </p>
          <p className="mb-5">
            That last discipline is the part the role actually tests. The
            pressure to add a &ldquo;flag this employee&rdquo; button, an
            &ldquo;assign this workflow&rdquo; flow, or a &ldquo;manager
            view&rdquo; will arrive in the first sales conversation. An
            AI Adoption PM who ships those features has not built a
            peer-led product; they have built a recipes catalogue with
            extra steps. The job is to know which features earn the
            authenticity that makes the rest of the product work, and to
            defend that boundary in the meetings where the product is
            actually decided.
          </p>
          <p className="mb-7">
            The recipes thesis is not wrong about the problem. It is wrong
            about the only mechanism that survives contact with how
            enterprise people actually behave when they are asked to
            change how they work. That mechanism is peer-led, opt-in,
            and surveillance-free — or it is not the mechanism at all.
          </p>

          <div className="h-px w-full my-14" style={{ backgroundColor: TOKENS.rule }} />

          {/* Sources */}
          <h2
            className="font-serif italic text-[24px] md:text-[26px] mb-6"
            style={{ color: TOKENS.text, fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Sources.
          </h2>
          <ol className="space-y-4 text-[13.5px] leading-[1.65]" style={{ color: TOKENS.muted }}>
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

          {/* Footer */}
          <div
            className="mt-16 pt-8 flex items-baseline justify-between flex-wrap gap-4 text-[12px]"
            style={{ color: TOKENS.muted, borderTop: `1px solid ${TOKENS.rule}` }}
          >
            <div>
              Workflow Mirror · An essay in support of the build · May 2026
            </div>
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
        </article>
      </main>
    </div>
  );
}
