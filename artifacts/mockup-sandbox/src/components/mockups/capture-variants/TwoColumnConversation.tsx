import { ArrowLeft, ArrowRight, Sparkles, Quote } from 'lucide-react';

const T = {
  bg: '#FBF8F4',
  panel: '#E5DBC8',
  text: '#3A3A3A',
  primary: '#166534',
  accent: '#92400E',
  muted: '#8A7F70',
  mutedStrong: '#6B6358',
  rule: '#E5DBC8',
  serif: "'Playfair Display', Georgia, serif",
  ui: "'Inter', system-ui, sans-serif",
};
const ICON = 1.5;

function CompassMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ color: T.primary }}>
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth={2.2} fill="none" />
      <g transform="rotate(-22 32 32)">
        <path d="M32 9 L40 34 L32 31 L24 34 Z" fill="currentColor" />
        <path d="M32 55 L24 30 L32 33 L40 30 Z" fill="currentColor" fillOpacity={0.22} />
      </g>
    </svg>
  );
}

const CHIPS = ['Weekly ritual', 'Prompt I refined', 'AI shortcut', 'A doc I generate'];

export function TwoColumnConversation() {
  return (
    <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: T.bg, color: T.text, fontFamily: T.ui }}>
      <header className="border-b" style={{ borderColor: T.rule }}>
        <div className="px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-2 text-[13px]" style={{ color: T.mutedStrong }}>
              <ArrowLeft className="w-4 h-4" strokeWidth={ICON} /> Back to Compass
            </a>
            <span aria-hidden style={{ color: T.rule }}>·</span>
            <div className="text-[11px] font-semibold" style={{ color: T.mutedStrong, letterSpacing: '0.32em' }}>
              SHARE A WORKFLOW
            </div>
          </div>
          <CompassMark size={28} />
        </div>
      </header>

      <main className="flex-1 grid grid-cols-12">
        {/* Left — the prompt */}
        <section
          className="col-span-5 px-12 py-14 flex flex-col justify-between"
          style={{ backgroundColor: T.panel, borderRight: `1px solid ${T.rule}` }}
        >
          <div>
            <div className="text-[11px] font-semibold mb-6" style={{ color: T.mutedStrong, letterSpacing: '0.32em' }}>
              THE QUESTION
            </div>
            <h1
              className="leading-[1.06] tracking-tight text-[44px]"
              style={{ fontFamily: T.serif, color: T.text }}
            >
              How do you use <em className="italic">AI</em> at Chico.ai?
            </h1>
            <p className="mt-6 text-[16px] leading-[1.65]" style={{ color: T.text }}>
              Tell us about one workflow. A prompt, a routine, a shortcut. We'll turn it into something teachable.
            </p>

            <div className="mt-7 flex items-center gap-4 text-[12.5px]" style={{ color: T.mutedStrong }}>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: T.primary }} /> 90 seconds
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: T.primary }} /> Team-only
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: T.primary }} /> Editable later
              </span>
            </div>

            <div className="mt-8">
              <div className="text-[11px] font-semibold mb-3" style={{ color: T.mutedStrong, letterSpacing: '0.28em' }}>
                STARTERS
              </div>
              <div className="flex flex-wrap gap-2">
                {CHIPS.map((c) => (
                  <button
                    key={c}
                    className="text-[12.5px] px-3 py-1.5 transition-colors hover:bg-white"
                    style={{ border: `1px solid ${T.bg}`, color: T.text, borderRadius: '999px', backgroundColor: T.bg }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div
            className="mt-10 p-5 relative"
            style={{ backgroundColor: T.bg, borderRadius: '4px' }}
          >
            <Quote className="w-4 h-4 absolute top-4 left-4" style={{ color: T.accent }} strokeWidth={ICON} />
            <p
              className="pl-7 text-[14px] leading-[1.55] italic"
              style={{ fontFamily: T.serif, color: T.text }}
            >
              "I shared my Monday board-prep prompt and three colleagues used it that week. Took me four minutes to write it down."
            </p>
            <div className="pl-7 mt-2.5 text-[12px]" style={{ color: T.mutedStrong }}>
              Sara Patel · Strategy Lead
            </div>
          </div>
        </section>

        {/* Right — the answer */}
        <section className="col-span-7 px-12 py-14 flex flex-col">
          <div className="flex items-end justify-between mb-5">
            <label htmlFor="workflow-answer">
              <div className="text-[11px] font-semibold mb-2" style={{ color: T.mutedStrong, letterSpacing: '0.32em' }}>
                YOUR ANSWER
              </div>
              <div className="text-[18px]" style={{ fontFamily: T.serif, color: T.text }}>
                Type the way you'd <em className="italic">tell a colleague</em>.
              </div>
            </label>
            <div className="text-[12px]" style={{ color: T.mutedStrong }}>
              Drafts auto-save · 0 / 1,200
            </div>
          </div>

          <div
            className="flex-1 relative"
            style={{ backgroundColor: '#FFFFFF', border: `1px solid ${T.rule}`, borderRadius: '4px' }}
          >
            <textarea
              id="workflow-answer"
              defaultValue=""
              placeholder={`Type freely. A few prompts to nudge you:\n\n  · What's the workflow, in one sentence?\n  · Which AI tool do you use, and how?\n  · What's the one thing that makes it work?`}
              className="w-full h-full bg-transparent outline-none resize-none px-7 py-6 text-[15.5px] leading-[1.7] placeholder:text-[#6B6358]"
              style={{ minHeight: 360, color: T.text, fontFamily: T.ui }}
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <a href="#" className="text-[13px]" style={{ color: T.mutedStrong, borderBottom: `1px solid ${T.rule}`, paddingBottom: 2 }}>
              Skip — paste a finished prompt instead
            </a>
            <button
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: T.primary, borderRadius: '2px' }}
            >
              <Sparkles className="w-4 h-4" strokeWidth={ICON} />
              Structure with Claude
              <ArrowRight className="w-4 h-4" strokeWidth={ICON} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
