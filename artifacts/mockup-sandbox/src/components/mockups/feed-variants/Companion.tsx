import { Plus, Check, Users, ArrowRight, Sparkles } from 'lucide-react';

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

function Mono({ initials, size = 28 }: { initials: string; size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center text-[10px] font-semibold tracking-wider"
      style={{
        width: size, height: size, borderRadius: 2,
        border: `1px solid ${T.rule}`, color: T.mutedStrong,
        backgroundColor: 'rgba(229,219,200,0.35)',
      }}
    >{initials}</span>
  );
}

function ToolTag({ tool }: { tool: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
      style={{ color: T.mutedStrong, border: `1px solid ${T.rule}`, borderRadius: 2 }}
    >
      <span className="inline-block" style={{ width: 5, height: 5, borderRadius: 999, backgroundColor: T.accent }} />
      {tool}
    </span>
  );
}

const forYou = [
  { initials: 'MT', author: 'Marcus T.', role: 'Account Manager', tool: 'ChatGPT', title: 'Writing client meeting follow-up emails', summary: 'Pastes raw call notes; gets a structured follow-up email that matches house style in 2 minutes.', from: '~15m', to: '~2m', worked: 18, peers: 9 },
  { initials: 'DR', author: 'Devon R.', role: 'Account Manager', tool: 'Claude', title: 'Pre-call research briefs from CRM notes', summary: 'Pulls account history into a one-page brief before every call so you walk in already up to speed.', from: '~30m', to: '~5m', worked: 11, peers: 7 },
];

const acrossTeam = [
  { initials: 'PN', author: 'Priya N.', role: 'Operations Manager', tool: 'Claude', title: 'Drafting quarterly board updates', from: '~3h', to: '~45m', worked: 14 },
  { initials: 'JK', author: 'Jordan K.', role: 'Sales Analyst', tool: 'Claude', title: 'Building weekly sales pipeline reports', from: '~3h', to: '~25m', worked: 9 },
  { initials: 'SA', author: 'Sana A.', role: 'Compliance Officer', tool: 'Gemini', title: 'Summarising regulatory bulletins', from: '~2h', to: '~30m', worked: 7 },
  { initials: 'LM', author: 'Lena M.', role: 'BD Manager', tool: 'Claude', title: 'Drafting RFP responses from prior wins', from: '~4h', to: '~45m', worked: 5 },
];

export function Companion() {
  return (
    <div className="min-h-screen pb-24" style={{ background: T.bg, color: T.text, fontFamily: T.ui }}>
      <header className="border-b" style={{ borderColor: T.rule }}>
        <div className="max-w-[1180px] mx-auto px-10 h-16 flex items-center justify-between">
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

      <main className="max-w-[1180px] mx-auto px-10 pt-10 grid grid-cols-12 gap-10">
        <div className="col-span-8">
          <div className="flex items-center gap-2 mb-2">
            <Mono initials="SH" size={22} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: T.mutedStrong }}>
              Sarah H. · Account Manager · Friday, 9 May
            </p>
          </div>
          <h1 className="text-[40px] leading-[1.1] tracking-tight mb-3" style={{ fontFamily: T.serif, fontWeight: 500 }}>
            <em style={{ fontStyle: 'italic' }}>Welcome back.</em> Here's what's worth your time.
          </h1>
          <p className="text-[15px] max-w-[560px] mb-8" style={{ color: T.mutedStrong, lineHeight: 1.6 }}>
            Two new workflows from other Account Managers this week, plus four more your team is talking about.
          </p>

          {/* Ask Compass */}
          <div className="p-6 mb-10" style={{ background: T.card, borderRadius: 4 }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} style={{ color: T.primary }} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: T.mutedStrong }}>
                Ask Compass
              </p>
            </div>
            <p className="text-[20px] mb-4" style={{ fontFamily: T.serif, fontWeight: 500 }}>
              What are you trying to do faster this week?
            </p>
            <div className="flex items-center gap-3">
              <input
                placeholder="e.g. write a renewal proposal for an enterprise client…"
                className="flex-1 bg-transparent outline-none text-[14px] pb-2"
                style={{ borderBottom: `1px solid ${T.primary}`, color: T.text, fontFamily: T.ui }}
              />
              <button
                className="inline-flex items-center gap-2 px-4 h-9 text-[13px] font-medium"
                style={{ background: T.primary, color: '#FBF8F4', borderRadius: 2 }}
              >Find a workflow</button>
            </div>
            <p className="text-[11px] mt-3" style={{ color: T.mutedStrong }}>
              Compass will surface workflows your colleagues have already shared for similar tasks.
            </p>
          </div>

          {/* For Account Managers */}
          <h3 className="text-[18px] mb-4" style={{ fontFamily: T.serif, fontWeight: 500 }}>
            For Account Managers <span className="text-[12px]" style={{ fontFamily: T.ui, color: T.mutedStrong }}>· 9 workflows</span>
          </h3>
          <div className="grid grid-cols-2 gap-5 mb-10">
            {forYou.map((w) => (
              <article key={w.title} className="p-5 flex flex-col" style={{ background: '#FFFEFB', border: `1px solid ${T.rule}`, borderRadius: 4 }}>
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
                <h4 className="text-[19px] leading-snug mb-2.5" style={{ fontFamily: T.serif, fontWeight: 500 }}>{w.title}</h4>
                <div
                  className="inline-flex self-start items-center gap-2 px-2.5 py-1 mb-3 text-[12px]"
                  style={{ backgroundColor: 'rgba(229,219,200,0.45)', borderRadius: 2 }}
                >
                  <span style={{ color: T.mutedStrong, textDecoration: 'line-through' }}>{w.from} manually</span>
                  <span style={{ color: T.muted }}>→</span>
                  <span style={{ color: T.primary, fontWeight: 600 }}>{w.to} with Compass</span>
                </div>
                <p className="text-[13px] mb-4" style={{ color: T.text, lineHeight: 1.55 }}>{w.summary}</p>
                <div className="mt-auto pt-3 border-t flex items-center justify-between" style={{ borderColor: T.rule }}>
                  <span className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: T.mutedStrong }}>
                    <Users className="w-3 h-3" strokeWidth={1.5} />
                    <span style={{ color: T.text, fontWeight: 600 }}>{w.peers}</span> account managers
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: T.mutedStrong }}>
                    <Check className="w-3 h-3" strokeWidth={1.5} style={{ color: T.primary }} />
                    <span style={{ color: T.text, fontWeight: 600 }}>{w.worked}</span> worked for me
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Across the team — list view */}
          <h3 className="text-[18px] mb-4" style={{ fontFamily: T.serif, fontWeight: 500 }}>
            Across the team <span className="text-[12px]" style={{ fontFamily: T.ui, color: T.mutedStrong }}>· 38 more</span>
          </h3>
          <div className="border-t" style={{ borderColor: T.rule }}>
            {acrossTeam.map((w) => (
              <div key={w.title} className="grid grid-cols-12 gap-4 items-center py-4 border-b" style={{ borderColor: T.rule }}>
                <div className="col-span-1"><Mono initials={w.initials} /></div>
                <div className="col-span-5">
                  <p className="text-[15px]" style={{ fontFamily: T.serif, fontWeight: 500 }}>{w.title}</p>
                  <p className="text-[11px]" style={{ color: T.mutedStrong }}>By {w.author} — {w.role}</p>
                </div>
                <div className="col-span-2"><ToolTag tool={w.tool} /></div>
                <div className="col-span-3 text-[12px]">
                  <span style={{ color: T.mutedStrong, textDecoration: 'line-through' }}>{w.from}</span>
                  <span style={{ color: T.muted }}> → </span>
                  <span style={{ color: T.primary, fontWeight: 600 }}>{w.to}</span>
                </div>
                <div className="col-span-1 text-right">
                  <ArrowRight className="w-3.5 h-3.5 inline" strokeWidth={1.5} style={{ color: T.muted }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right rail */}
        <aside className="col-span-4">
          <div className="sticky top-6 space-y-6">
            <div className="p-5" style={{ background: T.card, borderRadius: 4 }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: T.mutedStrong }}>
                Your activity
              </p>
              <p className="text-[36px] leading-none mb-1" style={{ fontFamily: T.serif, color: T.primary, fontWeight: 500 }}>
                0<span className="text-[20px]" style={{ color: T.mutedStrong }}> / 47</span>
              </p>
              <p className="text-[13px] mb-4" style={{ color: T.text, lineHeight: 1.55 }}>
                You haven't tried a workflow yet. Most colleagues report saving 30+ minutes on the first one they copy.
              </p>
              <button className="text-[12px] font-medium inline-flex items-center gap-1.5" style={{ color: T.primary }}>
                Pick one to try this week <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
              </button>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: T.mutedStrong }}>
                This week at Chico.ai
              </p>
              <div className="space-y-2.5 text-[13px]">
                <p style={{ color: T.text }}><span style={{ color: T.primary, fontWeight: 600 }}>+6</span> new workflows shared</p>
                <p style={{ color: T.text }}><span style={{ color: T.primary, fontWeight: 600 }}>23</span> "worked for me" votes</p>
                <p style={{ color: T.text }}><span style={{ color: T.primary, fontWeight: 600 }}>~38h</span> of time saved across teams</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: T.mutedStrong }}>
                Recent contributors
              </p>
              <div className="flex items-center gap-2">
                {['PN', 'MT', 'JK', 'SA', 'DR'].map((i) => <Mono key={i} initials={i} />)}
                <span className="text-[11px] ml-1" style={{ color: T.mutedStrong }}>+18 more</span>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
