import { useState } from "react";
import { ChevronDown, Users, ArrowRight, X } from "lucide-react";

const T = {
  bg: "#FBF8F4",
  text: "#3A3A3A",
  primary: "#166534",
  accent: "#92400E",
  muted: "#8A7F70",
  mutedStrong: "#6B6358",
  rule: "#E5DBC8",
  card: "#E5DBC8",
  serif: "'Playfair Display', Georgia, serif",
  ui: "'Inter', system-ui, sans-serif",
};

const EXCEL_GREEN = "#107C41";
const COLUMNS = ["A", "B", "C", "D", "E", "F", "G"];
const HEADERS = ["Client", "Renewal date", "ARR (£)", "Owner", "Status", "Last contact", "Notes"];
const ROWS: (string | number)[][] = [
  ["Northshore Logistics", "12 May", 24800, "S. Howard", "At risk", "02 May", "Awaiting reply"],
  ["Atlas & Finch", "14 May", 18200, "S. Howard", "On track", "06 May", "Sent renewal email"],
  ["Brightwood Capital", "17 May", 41500, "S. Howard", "On track", "06 May", "Sent renewal email"],
  ["Coral Bay Studios", "21 May", 9300, "S. Howard", "On track", "06 May", "Sent renewal email"],
  ["Devon Mills Group", "24 May", 31200, "S. Howard", "On track", "06 May", "Sent renewal email"],
  ["Ember & Co", "28 May", 14400, "S. Howard", "On track", "—", ""],
  ["Fairhaven Partners", "31 May", 22000, "S. Howard", "On track", "—", ""],
  ["Greylock Mutual", "4 Jun", 38900, "S. Howard", "On track", "—", ""],
];

function NudgeBarB({ dismissed, onDismiss }: { dismissed: boolean; onDismiss: () => void }) {
  const [mode, setMode] = useState<"peer" | "record">("peer");

  if (dismissed) return null;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
      <div
        className="overflow-hidden"
        style={{
          background: T.bg,
          border: `1px solid ${T.rule}`,
          borderRadius: 4,
          boxShadow: "0 18px 48px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)",
          fontFamily: T.ui,
          color: T.text,
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: 3, background: T.primary }} />

        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              {/* Context line — what was detected */}
              <div
                className="flex items-center gap-2 mb-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: T.accent }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: T.accent }}
                />
                Pattern detected · renewal notes · 4× this morning
              </div>

              {mode === "peer" ? (
                <>
                  {/* Social proof headline */}
                  <p
                    className="text-[14px] mb-3 leading-snug"
                    style={{ fontFamily: T.serif, color: T.text }}
                  >
                    <strong style={{ fontWeight: 600 }}>2 Account Managers</strong> have already saved this as a Compass workflow.{" "}
                    <em style={{ fontStyle: "italic", color: T.muted }}>Saves ~45 min per renewal cycle.</em>
                  </p>

                  {/* Peer avatars */}
                  <div className="flex items-center gap-2.5 mb-3.5">
                    {["PK", "ML"].map((mono, i) => (
                      <span
                        key={mono}
                        className="inline-flex items-center justify-center text-[10px] font-semibold"
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 2,
                          border: `1px solid ${T.rule}`,
                          background: "rgba(229,219,200,0.5)",
                          color: T.mutedStrong,
                          fontFamily: T.ui,
                        }}
                      >
                        {mono}
                      </span>
                    ))}
                    <div className="flex items-center gap-1.5 text-[11px]" style={{ color: T.mutedStrong }}>
                      <Users className="w-3 h-3" strokeWidth={1.5} />
                      Priya K. and M. Lennox — both Account Managers
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 h-9 px-4 text-[13px] font-medium"
                      style={{ background: T.primary, color: "#FBF8F4", borderRadius: 2, border: `1px solid ${T.primary}` }}
                    >
                      See their workflow <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("record")}
                      className="text-[12.5px] hover:opacity-70 transition-opacity"
                      style={{ color: T.mutedStrong, borderBottom: `1px solid ${T.rule}`, paddingBottom: 1 }}
                    >
                      Record mine instead
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Record mode — pre-filled, no role field */}
                  <p className="text-[13px] mb-2.5" style={{ color: T.mutedStrong }}>
                    Confirm what you were doing and we'll structure it:
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      className="flex-1 h-9 text-sm px-3 outline-none"
                      style={{ background: "#fff", border: `1px solid ${T.rule}`, borderRadius: 2, color: T.text }}
                      defaultValue="Sending renewal emails to clients due in May"
                    />
                    <button
                      type="button"
                      className="h-9 px-4 text-[13px] font-medium"
                      style={{ background: T.primary, color: "#FBF8F4", borderRadius: 2, border: `1px solid ${T.primary}` }}
                    >
                      ✨ Structure with AI
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("peer")}
                      className="text-[12.5px] hover:opacity-70 transition-opacity"
                      style={{ color: T.mutedStrong, borderBottom: `1px solid ${T.rule}`, paddingBottom: 1 }}
                    >
                      ← Back
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={onDismiss}
              className="shrink-0 transition-colors mt-0.5"
              style={{ color: T.muted }}
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NudgeOverlayB() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div
      className="min-h-screen flex items-stretch justify-center p-8"
      style={{ background: "#D8DCE0", fontFamily: T.ui, color: T.text }}
    >
      <div className="w-full max-w-[1100px] flex flex-col">
        {/* Caption */}
        <div className="mb-6 text-center">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-2"
            style={{ color: T.mutedStrong }}
          >
            Variant B — Pre-filled + Peer signal · No role field · Single CTA
          </p>
          <p
            className="text-[15px]"
            style={{ fontFamily: T.serif, color: T.text, fontStyle: "italic" }}
          >
            Identity known from SSO. Pattern pre-filled. Peer social proof replaces the role dropdown.
          </p>
        </div>

        {/* Faked Excel window */}
        <div
          className="relative flex-1 flex flex-col shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
          style={{ background: "#fff", borderRadius: 6, overflow: "hidden", border: "1px solid #C8CCD1" }}
        >
          {/* Window chrome */}
          <div
            className="flex items-center px-4 h-9 border-b"
            style={{ background: "#F2F3F5", borderColor: "#D0D4D9" }}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#FEBC2E" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
            </div>
            <div className="flex-1 text-center text-[12px]" style={{ color: "#5A6066" }}>
              Q2-renewals-tracker.xlsx — Excel
            </div>
            <div className="w-12" />
          </div>

          {/* Excel ribbon */}
          <div className="flex items-center" style={{ background: EXCEL_GREEN, color: "#fff", height: 28 }}>
            <div className="flex items-center gap-1 pl-3">
              <div className="w-5 h-5 flex items-center justify-center text-[11px] font-semibold" style={{ background: "#fff", color: EXCEL_GREEN, borderRadius: 2 }}>X</div>
              <span className="text-[11px] font-semibold tracking-wide pl-2">AutoSave</span>
            </div>
            <nav className="flex items-center gap-5 pl-5 text-[11.5px]">
              {["File", "Home", "Insert", "Page Layout", "Formulas", "Data", "Review", "View", "Help"].map((t, i) => (
                <span key={t} style={{ opacity: i === 1 ? 1 : 0.85, borderBottom: i === 1 ? "2px solid #fff" : "2px solid transparent", paddingBottom: 4 }}>{t}</span>
              ))}
            </nav>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-3 px-4 h-10 border-b text-[11.5px]" style={{ background: "#F8F9FA", borderColor: "#E1E4E8", color: "#42474C" }}>
            <span>Calibri</span><span>11</span>
            <span style={{ color: "#9AA0A6" }}>|</span>
            <span style={{ fontWeight: 700 }}>B</span><span style={{ fontStyle: "italic" }}>I</span><span style={{ textDecoration: "underline" }}>U</span>
            <span style={{ color: "#9AA0A6" }}>|</span>
            <span>Wrap text</span>
            <span style={{ color: "#9AA0A6" }}>|</span>
            <span>£ %</span>
          </div>

          {/* Formula bar */}
          <div className="flex items-center gap-3 px-3 h-8 border-b text-[12px]" style={{ borderColor: "#E1E4E8" }}>
            <span className="px-2 py-0.5" style={{ background: "#F2F3F5", borderRadius: 2, color: "#42474C" }}>G3</span>
            <ChevronDown className="w-3 h-3" strokeWidth={1.5} style={{ color: "#9AA0A6" }} />
            <span style={{ color: "#9AA0A6", fontStyle: "italic" }}>fx</span>
            <span style={{ color: "#42474C" }}>Sent renewal email</span>
          </div>

          {/* Spreadsheet */}
          <div className="relative flex-1 overflow-hidden" style={{ background: "#fff" }}>
            <table className="w-full text-[12px]" style={{ borderCollapse: "collapse", fontVariantNumeric: "tabular-nums", color: "#3A3F44" }}>
              <thead>
                <tr style={{ background: "#F2F3F5", color: "#5A6066" }}>
                  <th className="w-10 h-7 text-center font-normal" style={{ borderRight: "1px solid #E1E4E8", borderBottom: "1px solid #E1E4E8" }} />
                  {COLUMNS.map((c) => (
                    <th key={c} className="h-7 px-3 text-left font-normal" style={{ borderRight: "1px solid #E1E4E8", borderBottom: "1px solid #E1E4E8" }}>{c}</th>
                  ))}
                </tr>
                <tr>
                  <td className="h-7 text-center" style={{ background: "#F2F3F5", color: "#5A6066", borderRight: "1px solid #E1E4E8", borderBottom: "1px solid #E1E4E8" }}>1</td>
                  {HEADERS.map((h) => (
                    <td key={h} className="h-7 px-3 font-semibold" style={{ borderRight: "1px solid #E1E4E8", borderBottom: "1px solid #E1E4E8", color: "#3A3F44" }}>{h}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, ri) => {
                  const noteCellHighlight = row[6] && String(row[6]).toLowerCase().includes("renewal");
                  return (
                    <tr key={ri}>
                      <td className="h-7 text-center" style={{ background: "#F2F3F5", color: "#5A6066", borderRight: "1px solid #E1E4E8", borderBottom: "1px solid #E1E4E8" }}>{ri + 2}</td>
                      {row.map((cell, ci) => (
                        <td key={ci} className="h-7 px-3" style={{
                          borderRight: "1px solid #E1E4E8", borderBottom: "1px solid #E1E4E8",
                          background: ci === 6 && noteCellHighlight ? "rgba(254,236,173,0.55)" : "transparent",
                          textAlign: ci === 2 ? "right" : "left",
                          color: ci === 4 && cell === "At risk" ? "#B42318" : "#3A3F44",
                          fontWeight: ci === 4 && cell === "At risk" ? 600 : 400,
                        }}>
                          {ci === 2 && typeof cell === "number" ? (cell as number).toLocaleString("en-GB") : cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {Array.from({ length: 8 }).map((_, ri) => (
                  <tr key={`empty-${ri}`}>
                    <td className="h-7 text-center" style={{ background: "#F2F3F5", color: "#5A6066", borderRight: "1px solid #E1E4E8", borderBottom: "1px solid #E1E4E8" }}>{ri + 10}</td>
                    {COLUMNS.map((c) => (<td key={c} className="h-7" style={{ borderRight: "1px solid #E1E4E8", borderBottom: "1px solid #E1E4E8" }} />))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Annotation tooltip */}
            <div className="absolute" style={{ top: 70, right: 32, maxWidth: 220 }}>
              <div className="px-3 py-2 text-[11px] leading-snug shadow-md" style={{ background: "#fff", border: `1px solid ${T.accent}`, borderRadius: 2, color: T.text }}>
                <p className="font-semibold uppercase tracking-wider text-[9.5px] mb-1" style={{ color: T.accent }}>Pattern detected</p>
                <p style={{ color: T.mutedStrong }}>Same note typed in 4 cells · Tuesday, 11:23 → 12:08</p>
              </div>
            </div>
          </div>

          {/* Sheet tabs */}
          <div className="flex items-center gap-3 px-3 h-7 border-t text-[11px]" style={{ background: "#F8F9FA", borderColor: "#E1E4E8", color: "#5A6066" }}>
            <span style={{ borderBottom: `2px solid ${EXCEL_GREEN}`, paddingBottom: 4, color: "#3A3F44", fontWeight: 600 }}>Q2 renewals</span>
            <span>Pipeline</span><span>Notes</span>
          </div>

          <NudgeBarB dismissed={dismissed} onDismiss={() => setDismissed(true)} />
        </div>

        <p className="text-center text-[11px] mt-5" style={{ color: T.mutedStrong, fontFamily: T.ui }}>
          <strong style={{ color: T.text }}>Variant B:</strong> SSO identity means no role dropdown. Detected pattern is pre-named.
          Peer social proof is the primary CTA — "See their workflow" — with "Record mine instead" as a low-commitment secondary.
        </p>
      </div>
    </div>
  );
}
