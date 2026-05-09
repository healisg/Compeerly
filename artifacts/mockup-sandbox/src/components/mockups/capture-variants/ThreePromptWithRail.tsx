import { ArrowLeft, ArrowRight, Sparkles, Clock } from 'lucide-react';

const T = {
  bg: '#FBF8F4',
  text: '#3A3A3A',
  primary: '#166534',
  accent: '#92400E',
  muted: '#8A7F70',
  mutedStrong: '#6B6358',
  rule: '#E5DBC8',
  card: '#E5DBC8',
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

const TOOLS = ['Claude', 'ChatGPT', 'Cursor', 'Gemini', 'Perplexity', 'Other'];

interface PromptCardProps {
  index: number;
  label: string;
  hint: string;
  placeholder: string;
  long?: boolean;
  filled?: boolean;
  value?: string;
  id: string;
}

function PromptCard({ index, label, hint, placeholder, long, filled, value, id }: PromptCardProps) {
  return (
    <div
      className="grid grid-cols-12 gap-5 items-start py-6"
      style={{ borderTop: index === 1 ? `1px solid ${T.rule}` : undefined, borderBottom: `1px solid ${T.rule}` }}
    >
      <div className="col-span-1 flex justify-end pt-1">
        <span
          className="text-[26px] leading-none"
          style={{ fontFamily: T.serif, color: filled ? T.primary : T.muted }}
        >
          <em className="italic">{String(index).padStart(2, '0')}</em>
        </span>
      </div>
      <div className="col-span-4 pt-1">
        <label htmlFor={id} className="block text-[15px] font-medium" style={{ color: T.text, fontFamily: T.serif }}>
          {label}
        </label>
        <div className="text-[12px] mt-1.5 leading-[1.5]" style={{ color: T.mutedStrong }}>
          {hint}
        </div>
      </div>
      <div className="col-span-7">
        {long ? (
          <textarea
            id={id}
            defaultValue={value ?? ''}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none resize-none text-[14.5px] leading-[1.6] pb-2 placeholder:text-[#6B6358]/70"
            style={{
              minHeight: 64,
              color: T.text,
              borderBottom: `1px solid ${filled ? T.primary : T.rule}`,
              fontFamily: T.ui,
            }}
          />
        ) : (
          <input
            id={id}
            defaultValue={value ?? ''}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-[15px] pb-2 placeholder:text-[#6B6358]/70"
            style={{
              color: T.text,
              borderBottom: `1px solid ${filled ? T.primary : T.rule}`,
              fontFamily: T.ui,
            }}
          />
        )}
      </div>
    </div>
  );
}

export function ThreePromptWithRail() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: T.bg, color: T.text, fontFamily: T.ui }}>
      <header className="border-b" style={{ borderColor: T.rule }}>
        <div className="max-w-[1180px] mx-auto px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="#" className="flex items-center gap-2 text-[13px]" style={{ color: T.mutedStrong }}>
              <ArrowLeft className="w-4 h-4" strokeWidth={ICON} /> Back to Compass
            </a>
            <span aria-hidden style={{ color: T.rule }}>·</span>
            <div className="text-[11px] font-semibold" style={{ color: T.mutedStrong, letterSpacing: '0.32em' }}>
              CONTRIBUTE · VOL. 1
            </div>
          </div>
          <CompassMark size={28} />
        </div>
      </header>

      <main className="max-w-[1180px] mx-auto px-10 pt-12 pb-16 grid grid-cols-12 gap-12">
        {/* Left — three prompts */}
        <section className="col-span-8">
          <div className="text-[12px] font-semibold mb-4" style={{ color: T.mutedStrong, letterSpacing: '0.32em' }}>
            THREE QUESTIONS · 90 SECONDS
          </div>
          <h1
            className="leading-[1.06] tracking-tight text-[44px]"
            style={{ fontFamily: T.serif, color: T.text }}
          >
            Tell us about one workflow that <em className="italic">actually</em> saves you time.
          </h1>
          <p className="mt-4 text-[15.5px] leading-[1.6]" style={{ color: T.text }}>
            Three short answers. Claude turns them into a clean entry your colleagues can copy. You review before it's published.
          </p>

          <div className="mt-8">
            <PromptCard
              index={1}
              id="q-workflow"
              label="What's the workflow?"
              hint="One sentence. Plain English."
              placeholder="e.g. Drafting weekly pipeline updates for the leadership thread"
              filled
              value="Drafting weekly pipeline updates for the leadership thread"
            />

            <div className="grid grid-cols-12 gap-5 items-start py-6" style={{ borderBottom: `1px solid ${T.rule}` }}>
              <div className="col-span-1 flex justify-end pt-1">
                <span className="text-[26px] leading-none" style={{ fontFamily: T.serif, color: T.primary }}>
                  <em className="italic">02</em>
                </span>
              </div>
              <div className="col-span-4 pt-1">
                <div className="text-[15px] font-medium" style={{ color: T.text, fontFamily: T.serif }}>
                  Which AI tool?
                </div>
                <div className="text-[12px] mt-1.5 leading-[1.5]" style={{ color: T.mutedStrong }}>
                  Pick one — you can add more on the next step.
                </div>
              </div>
              <div className="col-span-7">
                <div className="flex flex-wrap gap-2">
                  {TOOLS.map((t) => (
                    <button
                      key={t}
                      className="text-[12.5px] px-3 py-1.5 transition-colors"
                      style={{
                        border: `1px solid ${t === 'Claude' ? T.primary : T.rule}`,
                        color: t === 'Claude' ? '#FFFFFF' : T.text,
                        backgroundColor: t === 'Claude' ? T.primary : 'transparent',
                        borderRadius: '999px',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <PromptCard
              index={3}
              id="q-trick"
              label="What's the trick?"
              hint="The one thing a colleague needs to know to make it work."
              placeholder="e.g. I always paste the pipeline as CSV first, not pasted from the table view — Claude reads structure better."
              long
            />
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[12px]" style={{ color: T.mutedStrong }}>
              <Clock className="w-3.5 h-3.5" strokeWidth={ICON} />
              Average so far: 1 min 12 sec
            </div>
            <div className="flex items-center gap-5">
              <a href="#" className="text-[12.5px]" style={{ color: T.mutedStrong, borderBottom: `1px solid ${T.rule}`, paddingBottom: 2 }}>
                Or paste a finished prompt
              </a>
              <button
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-[14.5px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: T.primary, borderRadius: '2px' }}
              >
                <Sparkles className="w-4 h-4" strokeWidth={ICON} />
                Structure with Claude
                <ArrowRight className="w-4 h-4" strokeWidth={ICON} />
              </button>
            </div>
          </div>
        </section>

        {/* Right — rail (peer card + what happens next) */}
        <aside className="col-span-4 space-y-7 pt-[58px]">
          <div className="p-6" style={{ backgroundColor: T.card, borderRadius: '4px' }}>
            <div className="text-[11px] font-semibold mb-4" style={{ color: T.mutedStrong, letterSpacing: '0.28em' }}>
              JOIN YOUR PEERS
            </div>
            <div className="font-serif text-[44px] leading-none" style={{ fontFamily: T.serif, color: T.primary }}>
              <em className="italic">38</em>
            </div>
            <p className="mt-3 text-[13px] leading-[1.55]" style={{ color: T.text }}>
              colleagues at Chico.ai have shared a workflow this quarter. Sara, Marcus and 6 others shared this week.
            </p>
          </div>

          <div>
            <div className="text-[11px] font-semibold mb-4" style={{ color: T.mutedStrong, letterSpacing: '0.28em' }}>
              WHAT HAPPENS NEXT
            </div>
            <ol className="space-y-3 text-[13px]" style={{ color: T.text }}>
              {[
                'Claude structures your three answers into title, steps, and a pro tip.',
                'You review, edit, and add any file inputs.',
                'It appears in the team feed, filtered by role.',
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full text-[11px] font-medium flex items-center justify-center"
                    style={{ backgroundColor: T.bg, color: T.primary, border: `1px solid ${T.primary}` }}
                  >
                    {i + 1}
                  </span>
                  <span className="leading-[1.55]">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="pt-5" style={{ borderTop: `1px solid ${T.rule}` }}>
            <p className="text-[12px] leading-[1.6]" style={{ color: T.mutedStrong }}>
              Visible only to your Chico.ai team. You can edit or remove anytime.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
