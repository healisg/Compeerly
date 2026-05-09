import { Plus, Users, Check, ArrowRight, SlidersHorizontal } from 'lucide-react';

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

function CompassMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" style={{ color: T.primary }}>
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth={2.2} />
      <g transform="rotate(-22 32 32)">
        <path d="M32 9 L40 34 L32 31 L24 34 Z" fill="currentColor" />
        <path d="M32 55 L24 30 L32 33 L40 30 Z" fill="currentColor" fillOpacity={0.22} />
      </g>
    </svg>
  );
}

function Mono({ initials }: { initials: string }) {
  return (
    <span
      className="inline-flex items-center justify-center text-[10px] font-semibold tracking-wider"
      style={{
        width: 32, height: 32, borderRadius: 2,
        border: `1px solid ${T.rule}`, color: T.mutedStrong,
        backgroundColor: 'rgba(229,219,200,0.35)', fontFamily: T.ui,
      }}
    >{initials}</span>
  );
}

function ToolTag({ tool }: { tool: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
      style={{ color: T.mutedStrong, border: `1px solid ${T.rule}`, borderRadius: 2, fontFamily: T.ui }}
    >
      <span className="inline-block" style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: T.accent }} />
      {tool}
    </span>
  );
}

function TimeStrip({ from, to, big = false }: { from: string; to: string; big?: boolean }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5"
      style={{ backgroundColor: 'rgba(229,219,200,0.45)', borderRadius: 2, fontFamily: T.ui, fontSize: big ? 15 : 13 }}
    >
      <span style={{ color: T.mutedStrong, textDecoration: 'line-through' }}>{from} manually</span>
      <span style={{ color: T.muted }}>→</span>
      <span style={{ color: T.primary, fontWeight: 600 }}>{to} with Compass</span>
    </div>
  );
}

const lead = {
  initials: 'PN', author: 'Priya N.', role: 'Operations Manager',
  title: 'Drafting quarterly board updates',
  from: '~3h', to: '~45m', tool: 'Claude',
  summary:
    "Used Claude to draft the Q1 board update by feeding in last quarter's report and the new numbers. Edited for 20 minutes instead of writing from scratch for three hours.",
  workedForMe: 14, peers: 38,
};

const mostCopied = [
  { initials: 'MT', author: 'Marcus T.', role: 'Account Manager', tool: 'ChatGPT', title: 'Writing client meeting follow-up emails', from: '~15m', to: '~2m', workedForMe: 18 },
  { initials: 'JK', author: 'Jordan K.', role: 'Sales Analyst', tool: 'Claude', title: 'Building weekly sales pipeline reports', from: '~3h', to: '~25m', workedForMe: 9 },
  { initials: 'SA', author: 'Sana A.', role: 'Compliance Officer', tool: 'Gemini', title: 'Summarising regulatory bulletins', from: '~2h', to: '~30m', workedForMe: 7 },
];

const inYourRole = [
  { initials: 'DR', author: 'Devon R.', role: 'Account Manager', tool: 'ChatGPT', title: 'Pre-call research briefs from CRM notes', from: '~30m', to: '~5m', workedForMe: 11 },
  { initials: 'LM', author: 'Lena M.', role: 'Account Manager', tool: 'Claude', title: 'Drafting renewal negotiation talking points', from: '~1h', to: '~12m', workedForMe: 5 },
];

export function Briefing() {
  return (
    <div className="min-h-screen pb-24" style={{ background: T.bg, color: T.text, fontFamily: T.ui }}>
      <header className="border-b" style={{ borderColor: T.rule }}>
        <div className="max-w-[1100px] mx-auto px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CompassMark />
            <span className="text-[20px]" style={{ fontFamily: T.serif, fontWeight: 600 }}>Compass</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] pl-3 border-l" style={{ color: T.mutedStrong, borderColor: T.rule }}>
              Chico.ai Internal
            </span>
          </div>
          <button
            className="inline-flex items-center gap-2 px-4 h-9 text-[13px] font-medium"
            style={{ background: T.primary, color: '#FBF8F4', borderRadius: 2 }}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />Share a workflow
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-10 pt-10">
        <div className="flex items-baseline justify-between mb-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: T.mutedStrong }}>
            This Week · Vol. 12 · 9 May
          </p>
          <p className="text-[12px]" style={{ color: T.mutedStrong }}>
            <span style={{ color: T.text, fontWeight: 600 }}>47</span> workflows ·{' '}
            <span style={{ color: T.text, fontWeight: 600 }}>23</span> contributors ·{' '}
            <span style={{ color: T.text, fontWeight: 600 }}>8</span> roles
          </p>
        </div>

        <h1 className="text-[44px] leading-[1.05] tracking-tight mb-3" style={{ fontFamily: T.serif, color: T.text, fontWeight: 500 }}>
          What your colleagues <em style={{ fontStyle: 'italic' }}>actually</em> shipped this week.
        </h1>
        <p className="text-[15px] max-w-[640px] mb-10" style={{ color: T.mutedStrong, lineHeight: 1.6 }}>
          Six new workflows from people across Chico.ai. Try one this week and let them know it helped.
        </p>

        <div className="flex items-center gap-2 mb-8">
          <button className="inline-flex items-center gap-2 px-3 h-8 text-[12px]" style={{ border: `1px solid ${T.rule}`, color: T.text, borderRadius: 2 }}>
            <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.5} />Filter
          </button>
          {['All roles', 'All tools', 'All categories'].map((l) => (
            <span key={l} className="text-[12px]" style={{ color: T.muted }}>{l}</span>
          ))}
        </div>

        {/* LEAD STORY */}
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: T.accent }}>
          Lead workflow · Most adopted
        </p>
        <article className="grid grid-cols-12 gap-8 p-7 mb-12" style={{ background: T.card, borderRadius: 4 }}>
          <div className="col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <Mono initials={lead.initials} />
              <div className="leading-tight">
                <p className="text-[13px] font-semibold" style={{ color: T.text }}>{lead.author}</p>
                <p className="text-[11px]" style={{ color: T.mutedStrong }}>{lead.role}</p>
              </div>
              <span className="ml-auto"><ToolTag tool={lead.tool} /></span>
            </div>
            <h2 className="text-[30px] leading-[1.1] mb-4" style={{ fontFamily: T.serif, fontWeight: 500 }}>
              {lead.title}
            </h2>
            <p className="text-[14px] mb-5" style={{ color: T.mutedStrong, lineHeight: 1.65 }}>{lead.summary}</p>
            <div className="flex items-center gap-4">
              <a className="inline-flex items-center gap-1.5 text-[13px] font-medium" style={{ color: T.primary }}>
                Read the workflow <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
              <span className="inline-flex items-center gap-1.5 text-[12px]" style={{ color: T.mutedStrong }}>
                <Check className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: T.primary }} />
                <span style={{ color: T.text, fontWeight: 600 }}>{lead.workedForMe}</span> said it worked
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px]" style={{ color: T.mutedStrong }}>
                <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span style={{ color: T.text, fontWeight: 600 }}>{lead.peers}</span> in operations
              </span>
            </div>
          </div>
          <div className="col-span-5 pl-8 border-l" style={{ borderColor: 'rgba(58,58,58,0.12)' }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: T.mutedStrong }}>Time saved per cycle</p>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-[56px] leading-none" style={{ fontFamily: T.serif, color: T.primary, fontWeight: 500 }}>2h 15m</span>
            </div>
            <p className="text-[12px] mb-5" style={{ color: T.mutedStrong }}>~3 hours manually → ~45 minutes with Compass</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: T.mutedStrong }}>Cadence</p>
            <p className="text-[13px]" style={{ color: T.text }}>Quarterly · Reporting</p>
          </div>
        </article>

        {/* MOST COPIED */}
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-[18px]" style={{ fontFamily: T.serif, fontWeight: 500 }}>Most copied this week</h3>
          <a className="text-[12px]" style={{ color: T.mutedStrong }}>See all 47 →</a>
        </div>
        <div className="grid grid-cols-3 gap-5 mb-12">
          {mostCopied.map((w) => (
            <article key={w.title} className="p-5 flex flex-col" style={{ border: `1px solid ${T.rule}`, borderRadius: 4 }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mono initials={w.initials} />
                  <div className="leading-tight">
                    <p className="text-[12px] font-semibold">{w.author}</p>
                    <p className="text-[10px]" style={{ color: T.mutedStrong }}>{w.role}</p>
                  </div>
                </div>
                <ToolTag tool={w.tool} />
              </div>
              <h4 className="text-[17px] leading-snug mb-3 mt-1" style={{ fontFamily: T.serif, fontWeight: 500 }}>{w.title}</h4>
              <div className="mt-auto pt-3 border-t flex items-center justify-between" style={{ borderColor: T.rule }}>
                <TimeStrip from={w.from} to={w.to} />
                <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: T.mutedStrong }}>
                  <Check className="w-3 h-3" strokeWidth={1.5} style={{ color: T.primary }} />
                  <span style={{ color: T.text, fontWeight: 600 }}>{w.workedForMe}</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* IN YOUR ROLE */}
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="text-[18px]" style={{ fontFamily: T.serif, fontWeight: 500 }}>
            By people in your role <span className="text-[12px]" style={{ fontFamily: T.ui, color: T.mutedStrong }}>· Account Manager</span>
          </h3>
          <a className="text-[12px]" style={{ color: T.mutedStrong }}>See all 9 →</a>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {inYourRole.map((w) => (
            <article key={w.title} className="p-5 flex flex-col" style={{ border: `1px solid ${T.rule}`, borderRadius: 4 }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Mono initials={w.initials} />
                  <div className="leading-tight">
                    <p className="text-[12px] font-semibold">{w.author}</p>
                    <p className="text-[10px]" style={{ color: T.mutedStrong }}>{w.role}</p>
                  </div>
                </div>
                <ToolTag tool={w.tool} />
              </div>
              <h4 className="text-[19px] leading-snug mb-3" style={{ fontFamily: T.serif, fontWeight: 500 }}>{w.title}</h4>
              <div className="mt-auto pt-3 border-t flex items-center justify-between" style={{ borderColor: T.rule }}>
                <TimeStrip from={w.from} to={w.to} />
                <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: T.mutedStrong }}>
                  <Check className="w-3 h-3" strokeWidth={1.5} style={{ color: T.primary }} />
                  <span style={{ color: T.text, fontWeight: 600 }}>{w.workedForMe}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
