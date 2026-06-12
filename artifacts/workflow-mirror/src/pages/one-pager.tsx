import { CompassMark } from "@/components/compass-mark";

const T = {
  primary: "#166534",
  accent: "#92400E",
  bg: "#FBF8F4",
  text: "#3A3A3A",
  muted: "#8A7F70",
  rule: "#E5DBC8",
  card: "#FFFFFF",
  serif: "'Playfair Display', Georgia, serif",
  ui: "'Inter', system-ui, sans-serif",
};

function Label({ n, text }: { n: string; text: string }) {
  return (
    <div className="flex items-baseline gap-3 mb-4">
      <span style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 13, color: T.accent }}>{n}</span>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", color: T.muted, textTransform: "uppercase" }}>{text}</span>
    </div>
  );
}

function Rule() {
  return <div style={{ height: 1, backgroundColor: T.rule, margin: "20px 0" }} />;
}

function Stat({ value, label, source }: { value: string; label: string; source?: string }) {
  return (
    <div style={{ borderLeft: `3px solid ${T.primary}`, paddingLeft: 16 }}>
      <div style={{ fontFamily: T.serif, fontSize: 44, lineHeight: 1, color: T.primary, fontWeight: 600 }}>{value}</div>
      <div style={{ fontSize: 12, lineHeight: 1.5, color: T.text, marginTop: 8 }}>{label}</div>
      {source && <div style={{ fontSize: 10, color: T.muted, marginTop: 6 }}>{source}</div>}
    </div>
  );
}

export default function OnePagerPage() {
  return (
    <div style={{ backgroundColor: T.bg, fontFamily: T.ui, color: T.text, minHeight: "100vh" }}>
      {/* Print button — hidden when printing */}
      <div
        className="no-print"
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 50,
          display: "flex",
          gap: 8,
        }}
      >
        <a
          href="/"
          style={{
            fontSize: 12,
            padding: "8px 16px",
            backgroundColor: "transparent",
            border: `1px solid ${T.rule}`,
            color: T.muted,
            borderRadius: 2,
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          ← Back
        </a>
        <button
          onClick={() => window.print()}
          style={{
            fontSize: 12,
            padding: "8px 16px",
            backgroundColor: T.primary,
            color: "#fff",
            border: "none",
            borderRadius: 2,
            cursor: "pointer",
          }}
        >
          Save as PDF ↓
        </button>
      </div>

      {/* Page */}
      <div
        id="one-pager"
        style={{
          width: 794,
          minHeight: 1123,
          margin: "0 auto",
          padding: "40px 52px 44px",
          backgroundColor: T.bg,
          boxSizing: "border-box",
        }}
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.32em", color: T.muted, textTransform: "uppercase" }}>
            One-Pager
          </div>
          <div style={{ fontSize: 10, color: T.muted }}>May 2026</div>
        </div>

        {/* ── Logo + title ───────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
          <CompassMark size={42} strokeWidth={2} style={{ color: T.primary } as React.CSSProperties} />
          <div style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 44, lineHeight: 1, color: T.text }}>
            Compeerly
          </div>
        </div>
        <div style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 16, color: T.primary, marginBottom: 4, lineHeight: 1.3 }}>
          Peer-led AI workflow sharing, so the 90% can learn from the 10%.
        </div>
        <Rule />

        {/* ── Two-column body ────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: "0 36px" }}>

          {/* ── Left column ── */}
          <div>

            {/* 01 · THE PROBLEM */}
            <Label n="01" text="The Problem" />
            <div style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 17, lineHeight: 1.3, color: T.text, marginBottom: 10 }}>
              Chico.ai measures the adoption gap. It does not close it.
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.65, color: T.text, marginBottom: 0 }}>
              On a typical Chico.ai install, 10% of users drive most AI activity. The dashboard
              tells leadership who is and isn't using AI. It does not give the other 460 a reason —
              or a way — to start. Training and mandates are the default response, and the default
              response is failing.
            </p>
            <Rule />

            {/* 02 · THE INSIGHT */}
            <Label n="02" text="The Insight" />
            <div style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 17, lineHeight: 1.3, color: T.text, marginBottom: 10 }}>
              People adopt new behaviours when they see peers doing them — not when they're trained.
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.65, color: T.text, marginBottom: 0 }}>
              Harvard Business Review (2026): peer influence is the single biggest predictor of
              whether an employee adopts AI tools at work. The knowledge already exists inside
              every Chico.ai client. It is locked inside a few people's private prompts.
              The intervention is visibility, not training.
            </p>
            <Rule />

            {/* 03 · THE BET */}
            <Label n="03" text="The Bet" />
            <div style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 17, lineHeight: 1.3, color: T.text, marginBottom: 10 }}>
              AI adoption inside the enterprise won't be top-down. It will be peer-to-peer.
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.65, color: T.text, marginBottom: 0 }}>
              Compeerly makes the shadow workflows visible. Active users share what works in under
              90 seconds. Non-adopters find those workflows filtered by their role, at the moment
              they need them — with no management visibility and no mandate.
            </p>
            <Rule />

            {/* 04 · THE METRIC */}
            <Label n="04" text="The North Star" />
            <div style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 17, lineHeight: 1.3, color: T.text, marginBottom: 10 }}>
              Activation rate among non-active users exposed to peer workflows.
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.65, color: T.text, marginBottom: 0 }}>
              Activation = 2 or more AI tool uses in a 7-day window after viewing a peer workflow.
              <span style={{ fontWeight: 600 }}> Target: 15%</span> of exposed non-active users activated within 30 days.
            </p>
            <Rule />

            {/* 05 · THE PILOT */}
            <Label n="05" text="The Pilot" />
            <div style={{ fontFamily: T.serif, fontStyle: "italic", fontSize: 17, lineHeight: 1.3, color: T.text, marginBottom: 12 }}>
              Concierge first. Engineer later.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
              {[
                "One client.",
                "Interview 10 active users.",
                "Manually curate and publish their workflows.",
                "Surface them to 50 non-active users in matched roles.",
                "30 days. Measure activation rate.",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span style={{ fontFamily: T.serif, fontWeight: 600, color: i === 4 ? T.accent : T.primary, fontSize: 12, minWidth: 18 }}>
                    0{i + 1}
                  </span>
                  <span style={{ fontSize: 12.5, color: T.text, lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: T.muted, fontStyle: "italic", marginTop: 4 }}>
              No engineering lift beyond a new tab in the existing dashboard.
            </p>

          </div>

          {/* ── Right column ── */}
          <div style={{ paddingTop: 0 }}>

            {/* Stat 1 */}
            <div style={{ marginBottom: 28, paddingTop: 24 }}>
              <Stat
                value="88%"
                label="of heavy AI users name peers as the biggest influence on their workflow — vs 5% from internal training."
                source="Microsoft & LinkedIn, 2024"
              />
            </div>

            {/* Stat 2 */}
            <div style={{ marginBottom: 28, paddingTop: 8 }}>
              <Stat
                value="40"
                label="of 500 licensed users drive most AI activity on a typical enterprise install."
                source="Chico.ai platform data"
              />
            </div>

            {/* Stat 3 */}
            <div style={{ marginBottom: 28, paddingTop: 8 }}>
              <Stat
                value="15%"
                label="target activation rate among non-active users exposed to a peer workflow within 30 days."
              />
            </div>

            {/* ROI table */}
            <div style={{ paddingTop: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.28em", color: T.muted, textTransform: "uppercase", marginBottom: 12 }}>
                ROI Model
              </div>
              {[
                { label: "Active users", val: "69" },
                { label: "Hours saved / user / wk", val: "2 hr" },
                { label: "Blended labour rate", val: "£50 / hr" },
                { label: "Value returned / week", val: "£6,900", bold: true },
              ].map((row, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: `1px solid ${i === 0 ? T.text : T.rule}`,
                    padding: "6px 0",
                    fontSize: 11.5,
                  }}
                >
                  <span style={{ color: T.muted }}>{row.label}</span>
                  <span style={{ fontFamily: T.serif, fontWeight: row.bold ? 700 : 500, color: T.text }}>{row.val}</span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: `2px solid ${T.accent}`,
                  padding: "8px 0 4px",
                  marginTop: 2,
                }}
              >
                <span style={{ fontSize: 11, color: T.accent, fontStyle: "italic", fontFamily: T.serif }}>Annualised / client</span>
                <span style={{ fontFamily: T.serif, fontSize: 16, fontWeight: 700, color: T.primary }}>£358,800</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <div
          style={{
            borderTop: `1px solid ${T.rule}`,
            marginTop: 28,
            paddingTop: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CompassMark size={14} strokeWidth={2.2} style={{ color: T.muted } as React.CSSProperties} />
            <span style={{ fontSize: 10, color: T.muted, letterSpacing: "0.2em", textTransform: "uppercase" }}>Compeerly · Chico.ai · 2026</span>
          </div>
          <span style={{ fontSize: 10, color: T.muted }}>gordon.healis@outlook.com</span>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #FBF8F4; margin: 0; }
          #one-pager {
            width: 100%;
            min-height: 0;
            margin: 0;
            padding: 28px 48px 36px;
            box-shadow: none;
          }
          @page { size: A4; margin: 0; }
        }
        @media screen {
          #one-pager {
            box-shadow: 0 4px 40px rgba(0,0,0,0.08);
            margin-top: 32px;
            margin-bottom: 48px;
          }
        }
      `}</style>
    </div>
  );
}
