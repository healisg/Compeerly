import { ArrowLeft, ArrowRight, Sparkles, Clock } from 'lucide-react';

const T = {
  bg: '#FBF8F4',
  text: '#3A3A3A',
  primary: '#166534',
  accent: '#92400E',
  muted: '#8A7F70',
  mutedStrong: '#6B6358',
  rule: '#E5DBC8',
  card: '#FFFFFF',
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
}

function PromptCard({ index, label, hint, placeholder, long, filled, value }: PromptCardProps) {
  return (
    <div
      className="grid grid-cols-12 gap-6 items-start py-7"
      style={{ borderTop: index === 1 ? `1px solid ${T.rule}` : undefined, borderBottom: `1px solid ${T.rule}` }}
    >
      <div className="col-span-1 flex justify-end pt-1">
        <span
          className="text-[28px] leading-none"
          style={{ fontFamily: T.serif, color: filled ? T.primary : T.muted }}
        >
          <em className="italic">{String(index).padStart(2, '0')}</em>
        </span>
      </div>
      <div className="col-span-4 pt-1">
        <div className="text-[16px] font-medium" style={{ color: T.text, fontFamily: T.serif }}>
          {label}
        </div>
        <div className="text-[12.5px] mt-1.5 leading-[1.5]" style={{ color: T.mutedStrong }}>
          {hint}
        </div>
      </div>
      <div className="col-span-7">
        {long ? (
          <textarea
            defaultValue={value ?? ''}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none resize-none text-[15px] leading-[1.6] pb-2"
            style={{
              minHeight: 70,
              color: T.text,
              borderBottom: `1px solid ${filled ? T.primary : T.rule}`,
              fontFamily: T.ui,
            }}
          />
        ) : (
          <input
            defaultValue={value ?? ''}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-[15.5px] pb-2"
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

export function ThreePromptQuickCapture() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: T.bg, color: T.text, fontFamily: T.ui }}>
      <header className="border-b" style={{ borderColor: T.rule }}>
        <div className="max-w-[960px] mx-auto px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-[13px]" style={{ color: T.mutedStrong }}>
            <ArrowLeft className="w-4 h-4" strokeWidth={ICON} /> Back to Compass
          </a>
          <div className="text-[11px] font-semibold" style={{ color: T.mutedStrong, letterSpacing: '0.32em' }}>
            SHARE A WORKFLOW
          </div>
          <CompassMark size={28} />
        </div>
      </header>

      <main className="max-w-[960px] mx-auto px-8 pt-12 pb-16">
        <div className="text-[12px] font-semibold mb-5" style={{ color: T.mutedStrong, letterSpacing: '0.32em' }}>
          THREE QUESTIONS · 90 SECONDS
        </div>
        <h1
          className="leading-[1.06] tracking-tight text-[48px] max-w-[720px]"
          style={{ fontFamily: T.serif, color: T.text }}
        >
          Tell us about one workflow that <em className="italic">actually</em> saves you time.
        </h1>
        <p className="mt-5 text-[16px] leading-[1.65] max-w-[640px]" style={{ color: T.text }}>
          Three short answers. Claude turns them into a clean entry your colleagues can copy. You review before it's published.
        </p>

        <div className="mt-10">
          <PromptCard
            index={1}
            label="What's the workflow?"
            hint="One sentence. Plain English."
            placeholder="e.g. Drafting weekly pipeline updates for the leadership thread"
            filled
            value="Drafting weekly pipeline updates for the leadership thread"
          />

          <div className="grid grid-cols-12 gap-6 items-start py-7" style={{ borderBottom: `1px solid ${T.rule}` }}>
            <div className="col-span-1 flex justify-end pt-1">
              <span className="text-[28px] leading-none" style={{ fontFamily: T.serif, color: T.primary }}>
                <em className="italic">02</em>
              </span>
            </div>
            <div className="col-span-4 pt-1">
              <div className="text-[16px] font-medium" style={{ color: T.text, fontFamily: T.serif }}>
                Which AI tool?
              </div>
              <div className="text-[12.5px] mt-1.5 leading-[1.5]" style={{ color: T.mutedStrong }}>
                Pick one — you can add more on the next step.
              </div>
            </div>
            <div className="col-span-7">
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((t) => (
                  <button
                    key={t}
                    className="text-[13px] px-3.5 py-2 transition-colors"
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
            label="What's the trick?"
            hint="The one thing a colleague needs to know to make it work."
            placeholder="e.g. I always paste the pipeline as CSV first, not pasted from the table view — Claude reads structure better."
            long
          />
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[12.5px]" style={{ color: T.mutedStrong }}>
            <Clock className="w-3.5 h-3.5" strokeWidth={ICON} />
            Average so far: 1 min 12 sec · 38 colleagues have shared
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[13px]" style={{ color: T.mutedStrong, borderBottom: `1px solid ${T.rule}`, paddingBottom: 2 }}>
              Or paste a finished prompt
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
        </div>
      </main>
    </div>
  );
}
