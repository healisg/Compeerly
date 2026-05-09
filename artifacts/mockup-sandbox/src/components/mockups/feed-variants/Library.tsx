import { Plus, Check, Users } from 'lucide-react';

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
        width: 28, height: 28, borderRadius: 2,
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

const cards = [
  { id: 1, initials: 'PN', author: 'Priya N.', role: 'Operations Manager', tool: 'Claude', cat: 'Reporting', freq: 'Quarterly', title: 'Drafting quarterly board updates', from: '~3h', to: '~45m', summary: 'Feeds the previous board pack and the new numbers into Claude. Edits for 20 minutes instead of writing from scratch.', worked: 14, peers: 6 },
  { id: 2, initials: 'MT', author: 'Marcus T.', role: 'Account Manager', tool: 'ChatGPT', cat: 'Communication', freq: 'Daily', title: 'Writing client meeting follow-up emails', from: '~15m', to: '~2m', summary: 'Pastes raw call notes; gets a structured follow-up email that matches house style in 2 minutes.', worked: 18, peers: 9 },
  { id: 3, initials: 'JK', author: 'Jordan K.', role: 'Sales Analyst', tool: 'Claude', cat: 'Reporting', freq: 'Weekly', title: 'Building weekly sales pipeline reports', from: '~3h', to: '~25m', summary: 'Claude analyses exported pipeline data and writes the narrative commentary, including trends a human eye would miss.', worked: 9, peers: 4 },
  { id: 4, initials: 'SA', author: 'Sana A.', role: 'Compliance Officer', tool: 'Gemini', cat: 'Analysis', freq: 'Weekly', title: 'Summarising regulatory bulletins', from: '~2h', to: '~30m', summary: 'Reads through new FCA bulletins and produces a plain-English summary with action items for the team.', worked: 7, peers: 3 },
  { id: 5, initials: 'DR', author: 'Devon R.', role: 'HR Business Partner', tool: 'ChatGPT', cat: 'Admin', freq: 'Per hire', title: 'Onboarding checklists for new hires', from: '~1h', to: '~10m', summary: 'Generates a role-specific checklist based on department and seniority instead of rebuilding one each time.', worked: 11, peers: 2 },
  { id: 6, initials: 'LM', author: 'Lena M.', role: 'BD Manager', tool: 'Claude', cat: 'Communication', freq: 'Per RFP', title: 'Drafting RFP responses from prior wins', from: '~4h', to: '~45m', summary: 'References our winning submissions and adapts the content to the new client while keeping our proven structure.', worked: 5, peers: 2 },
];

const filterRail = [
  { label: 'Roles', items: ['All roles', 'Account Manager', 'Operations Manager', 'Sales Analyst', 'Compliance', 'HR'] },
  { label: 'AI Tools', items: ['All tools', 'Claude', 'ChatGPT', 'Gemini', 'Cursor'] },
  { label: 'Categories', items: ['All categories', 'Reporting', 'Communication', 'Analysis', 'Admin'] },
];

export function Library() {
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

      <main className="max-w-[1180px] mx-auto px-10 pt-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: T.mutedStrong }}>
          The Library · 47 workflows
        </p>
        <h1 className="text-[40px] leading-[1.1] tracking-tight mb-3" style={{ fontFamily: T.serif, fontWeight: 500 }}>
          Real workflows from <em style={{ fontStyle: 'italic' }}>your</em> colleagues.
        </h1>
        <p className="text-[15px] max-w-[640px] mb-8" style={{ color: T.mutedStrong, lineHeight: 1.6 }}>
          Browse what teams across Chico.ai are using AI for. Filter by role, tool or category — try one this week and let them know it helped.
        </p>

        {/* Stat strip */}
        <div className="flex items-stretch gap-0 mb-10 border-y" style={{ borderColor: T.rule }}>
          {[
            { n: '47', l: 'Workflows shared' },
            { n: '23', l: 'Contributors' },
            { n: '8', l: 'Roles represented' },
            { n: '163', l: '"Worked for me" votes' },
          ].map((s, i) => (
            <div key={s.l} className={`flex-1 py-4 ${i > 0 ? 'border-l' : ''}`} style={{ borderColor: T.rule }}>
              <p className="text-[28px] leading-none mb-1" style={{ fontFamily: T.serif, color: T.primary, fontWeight: 500 }}>{s.n}</p>
              <p className="text-[11px] uppercase tracking-wider" style={{ color: T.mutedStrong }}>{s.l}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sticky text-link rail */}
          <aside className="col-span-3">
            <div className="sticky top-6 space-y-7">
              {filterRail.map((g) => (
                <div key={g.label}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-2.5" style={{ color: T.mutedStrong }}>{g.label}</p>
                  <ul className="space-y-1.5">
                    {g.items.map((it, idx) => (
                      <li key={it}>
                        <button
                          className="text-[13px] text-left w-full"
                          style={{
                            color: idx === 0 ? T.primary : T.text,
                            fontWeight: idx === 0 ? 600 : 400,
                          }}
                        >{it}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* Card grid */}
          <section className="col-span-9">
            <div className="grid grid-cols-2 gap-5">
              {cards.map((w) => (
                <article key={w.id} className="p-5 flex flex-col" style={{ background: '#FFFEFB', border: `1px solid ${T.rule}`, borderRadius: 4 }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <Mono initials={w.initials} />
                      <p className="text-[11.5px]" style={{ color: T.mutedStrong }}>
                        By <span style={{ color: T.text, fontWeight: 600 }}>{w.author}</span> — {w.role}
                      </p>
                    </div>
                    <ToolTag tool={w.tool} />
                  </div>
                  <h3 className="text-[20px] leading-snug mb-2.5" style={{ fontFamily: T.serif, fontWeight: 500 }}>{w.title}</h3>
                  <div
                    className="inline-flex self-start items-center gap-2 px-2.5 py-1 mb-3 text-[12px]"
                    style={{ backgroundColor: 'rgba(229,219,200,0.45)', borderRadius: 2 }}
                  >
                    <span style={{ color: T.mutedStrong, textDecoration: 'line-through' }}>{w.from} manually</span>
                    <span style={{ color: T.muted }}>→</span>
                    <span style={{ color: T.primary, fontWeight: 600 }}>{w.to} with Compass</span>
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: T.mutedStrong }}>
                    {w.cat} · {w.freq}
                  </p>
                  <p className="text-[13px] mb-4" style={{ color: T.text, lineHeight: 1.55 }}>{w.summary}</p>
                  <div className="mt-auto pt-3 border-t flex items-center justify-between" style={{ borderColor: T.rule }}>
                    <span className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: T.mutedStrong }}>
                      <Users className="w-3 h-3" strokeWidth={1.5} />
                      <span style={{ color: T.text, fontWeight: 600 }}>{w.peers}</span> in {w.role.split(' ')[0].toLowerCase()}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: T.mutedStrong }}>
                      <Check className="w-3 h-3" strokeWidth={1.5} style={{ color: T.primary }} />
                      <span style={{ color: T.text, fontWeight: 600 }}>{w.worked}</span> worked for me
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
