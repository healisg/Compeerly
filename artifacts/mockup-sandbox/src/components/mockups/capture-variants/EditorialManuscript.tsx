import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

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

function CompassMark({ size = 32 }: { size?: number }) {
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

const CHIPS = [
  'My weekly ritual',
  'A prompt I refined',
  'How I use Claude',
  'An AI shortcut I love',
];

export function EditorialManuscript() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: T.bg, color: T.text, fontFamily: T.ui }}>
      <header className="border-b" style={{ borderColor: T.rule }}>
        <div className="max-w-[1180px] mx-auto px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="#" className="flex items-center gap-2 text-[13px]" style={{ color: T.mutedStrong }}>
              <ArrowLeft className="w-4 h-4" strokeWidth={ICON} />
              Back to Compass
            </a>
            <span aria-hidden style={{ color: T.rule }}>·</span>
            <div className="text-[11px] font-semibold" style={{ color: T.mutedStrong, letterSpacing: '0.32em' }}>
              CONTRIBUTE · VOL. 1
            </div>
          </div>
          <CompassMark size={28} />
        </div>
      </header>

      <main className="max-w-[1180px] mx-auto px-10 py-14 grid grid-cols-12 gap-12">
        <section className="col-span-8 space-y-8">
          <div>
            <div className="text-[12px] font-semibold mb-5" style={{ color: T.mutedStrong, letterSpacing: '0.32em' }}>
              SHARE A WORKFLOW
            </div>
            <h1
              className="leading-[1.04] tracking-tight text-[56px]"
              style={{ fontFamily: T.serif, color: T.text }}
            >
              How do you use <em className="italic">AI</em> at Chico.ai?
            </h1>
            <p className="mt-6 text-[17px] leading-[1.65] max-w-[620px]" style={{ color: T.text }}>
              Ninety seconds. Paste a prompt, jot a few steps, or just talk it through.
              Compass will structure it into something a colleague can actually reuse.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <button
                key={c}
                className="text-[13px] px-3.5 py-2 transition-colors hover:bg-[#EDE5D4]"
                style={{ border: `1px solid ${T.rule}`, color: T.text, borderRadius: '999px', backgroundColor: T.bg }}
              >
                {c}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="workflow-draft" className="block text-[11px] font-semibold mb-3" style={{ color: T.mutedStrong, letterSpacing: '0.28em' }}>
              YOUR WORKFLOW
            </label>
            <div
              className="relative"
              style={{ backgroundColor: T.card, borderRadius: '4px' }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: T.primary }} />
              <textarea
                id="workflow-draft"
                defaultValue=""
                placeholder="Every Monday I export the Salesforce pipeline, paste it into Claude, and ask it to flag deals that have stalled more than 14 days&hellip;"
                className="w-full bg-transparent outline-none resize-none px-7 py-7 text-[16px] leading-[1.65] placeholder:text-[#6B6358]/70"
                style={{ minHeight: 220, color: T.text, fontFamily: T.ui }}
              />
              <div className="flex items-center justify-between px-7 pb-5 pt-1 text-[12px]" style={{ color: T.mutedStrong }}>
                <span>Markdown supported · drafts auto-save</span>
                <span>0 / 1,200</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              className="inline-flex items-center gap-2.5 px-7 py-4 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: T.primary, borderRadius: '2px', letterSpacing: '0.01em' }}
            >
              <Sparkles className="w-4 h-4" strokeWidth={ICON} />
              Structure with Claude
              <ArrowRight className="w-4 h-4" strokeWidth={ICON} />
            </button>
            <a href="#" className="text-[13px] font-medium hover:opacity-70" style={{ color: T.mutedStrong, borderBottom: `1px solid ${T.rule}`, paddingBottom: 2 }}>
              Skip — just paste a prompt
            </a>
          </div>
        </section>

        <aside className="col-span-4 space-y-7">
          <div
            className="p-6"
            style={{ backgroundColor: T.card, borderRadius: '4px' }}
          >
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
                'Claude structures your draft into title, steps, and a pro tip.',
                'You review, edit, and add any file inputs.',
                'It appears in the feed, filtered by role.',
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium"
                    style={{ backgroundColor: T.rule, color: T.primary, fontFamily: T.serif }}
                  >
                    {i + 1}
                  </span>
                  <span className="leading-[1.55] pt-0.5">{step}</span>
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
