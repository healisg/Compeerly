// Generates artifacts/workflow-mirror/public/workflow-mirror-one-pager.pdf
// Run from anywhere: pnpm --filter @workspace/workflow-mirror exec node scripts/build-one-pager.mjs
//
// All numbers must reconcile with:
//   artifacts/workflow-mirror-pitch/src/pages/slides/RoiModel.tsx
//   artifacts/workflow-mirror/src/pages/admin.tsx
// If they drift, fix at the deck/admin source first, then regenerate.

import PDFDocument from "pdfkit";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public", "workflow-mirror-one-pager.pdf");
const FONTS = path.join(__dirname, "fonts");

// Brand tokens (mirror BRANDING.md exactly)
const C = {
  primary: "#166534",
  accent: "#92400E",
  bg: "#FBF8F4",
  text: "#3A3A3A",
  muted: "#8A7F70",
  rule: "#E5DBC8",
  white: "#FFFFFF",
};

// A4 portrait
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN_X = 36;
const MARGIN_TOP = 0; // we paint our own header band
const MARGIN_BOTTOM = 28;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

const doc = new PDFDocument({
  size: "A4",
  margin: 0,
  info: {
    Title: "Compass — One-pager",
    Author: "Compass",
    Subject: "Peer-led AI workflow sharing for Chico.ai",
    Keywords: "Chico.ai, AI adoption, peer learning, workflow",
  },
});

doc.pipe(fs.createWriteStream(OUT));

// Register fonts
doc.registerFont("serif-italic", path.join(FONTS, "PlayfairDisplay-Italic.ttf"));
doc.registerFont("serif", path.join(FONTS, "PlayfairDisplay-Regular.ttf"));
doc.registerFont("sans", path.join(FONTS, "Inter-Regular.ttf"));

// Cream background
doc.rect(0, 0, PAGE_W, PAGE_H).fill(C.bg);

// =========================================================================
// 1. HEADER STRIP
// =========================================================================
// Forest green progress band (echo of slide chrome top bar)
doc.rect(0, 0, PAGE_W, 4).fill(C.primary);

let y = 24;

// Eyebrow
doc.font("sans").fontSize(7.5).fillColor(C.muted).text("ONE-PAGER  ·  AI ADOPTION PM SUBMISSION", MARGIN_X, y, {
  characterSpacing: 2.4,
  width: CONTENT_W,
});
y += 18;

// Title — the product name, prominent
doc.font("serif-italic").fontSize(40).fillColor(C.text).text("Compass", MARGIN_X, y, {
  width: CONTENT_W,
  lineGap: -2,
});
y += 44;

// Tagline (per spec)
doc.font("serif-italic").fontSize(15).fillColor(C.primary).text(
  "Peer-led AI workflow sharing, so the 460 can learn from the 40.",
  MARGIN_X,
  y,
  { width: CONTENT_W },
);
y += 26;

// Section divider
function rule(yPos, color = C.rule) {
  doc.strokeColor(color).lineWidth(0.6).moveTo(MARGIN_X, yPos).lineTo(PAGE_W - MARGIN_X, yPos).stroke();
}
rule(y);
y += 14;

// =========================================================================
// SECTION HELPERS
// =========================================================================
function eyebrow(text, x, yPos, color = C.accent) {
  doc.font("sans").fontSize(7).fillColor(color).text(text, x, yPos, {
    characterSpacing: 2.2,
    lineBreak: false,
  });
}

function heading(text, x, yPos, size = 14) {
  doc.font("serif-italic").fontSize(size).fillColor(C.text).text(text, x, yPos, { lineBreak: false });
}

function body(text, x, yPos, width, opts = {}) {
  doc
    .font("sans")
    .fontSize(opts.size || 9)
    .fillColor(opts.color || C.text)
    .text(text, x, yPos, { width, lineGap: opts.lineGap ?? 2, align: opts.align || "left" });
  return doc.y;
}

// =========================================================================
// 2. THE PROBLEM (full width, with stat callout)
// =========================================================================
const sectionStart = y;
eyebrow("01 · THE PROBLEM", MARGIN_X, y);
y += 12;
heading("Chico.ai measures the adoption gap. It does not close it.", MARGIN_X, y, 13);
y += 20;

// Two columns: paragraph (left, 65%) + stat (right, 35%)
const leftW = CONTENT_W * 0.62;
const statX = MARGIN_X + leftW + 18;
const statW = CONTENT_W - leftW - 18;

const probParaY = y;
const probParaEnd = body(
  "On a typical Chico.ai install, 40 of 500 users drive most AI activity. The dashboard tells leadership who is and isn't using AI. It does not give the other 460 a reason — or a way — to start. Training and mandates are the default response, and the default response is failing.",
  MARGIN_X,
  y,
  leftW,
  { lineGap: 2.5 },
);

// Stat callout
doc.font("serif").fontSize(28).fillColor(C.primary).text("88%", statX, probParaY - 2, {
  width: statW,
  lineBreak: false,
});
doc
  .font("sans")
  .fontSize(7.5)
  .fillColor(C.muted)
  .text(
    "of heavy AI users name peers as the strongest influence on their workflow — vs 50% of light users.",
    statX,
    probParaY + 32,
    { width: statW, lineGap: 1.5 },
  );
doc.font("sans").fontSize(6.5).fillColor(C.muted).text(
  "Microsoft Research, 2026",
  statX,
  probParaY + 70,
  { width: statW, characterSpacing: 1.2 },
);

y = Math.max(probParaEnd, probParaY + 84) + 14;
rule(y);
y += 14;

// =========================================================================
// 3. THE INSIGHT
// =========================================================================
eyebrow("02 · THE INSIGHT", MARGIN_X, y);
y += 12;
heading("Prescribed recipes replicate the threat. Peer discovery honours expertise.", MARGIN_X, y, 13);
y += 20;
y = body(
  "Top-down playbooks tell people their existing way of working is wrong. That triggers identity threat — and shadow AI. Peer-led discovery flips it: active users share what already works, in their own words. Non-adopters find role-relevant proof, on their own terms, with no manager visibility and no mandate. Visibility, not training, is the gap.",
  MARGIN_X,
  y,
  CONTENT_W,
  { lineGap: 2.5 },
);
y += 14;
rule(y);
y += 14;

// =========================================================================
// 4. THE PRODUCT (3 blocks)
// =========================================================================
eyebrow("03 · THE PRODUCT", MARGIN_X, y);
y += 12;
heading("Three surfaces, one motion.", MARGIN_X, y, 13);
y += 22;

const blocks = [
  {
    label: "CAPTURE",
    body: "Active users post a workflow in under 90 seconds — task, AI used, tip, time saved. Opt-in only.",
  },
  {
    label: "FEED",
    body: "Non-adopters browse role-filtered workflows from peers. No leaderboards, no manager view.",
  },
  {
    label: "DETAIL",
    body: "Each workflow shows the prompt, the steps, who shared it, and a one-tap 'try this' handoff.",
  },
];

const blockGap = 14;
const blockW = (CONTENT_W - blockGap * 2) / 3;
const blocksY = y;
let maxBlockEnd = y;

blocks.forEach((b, i) => {
  const bx = MARGIN_X + i * (blockW + blockGap);
  // Left forest green stripe
  doc.rect(bx, blocksY, 2, 56).fill(C.primary);
  eyebrow(b.label, bx + 10, blocksY + 2, C.primary);
  const endY = body(b.body, bx + 10, blocksY + 14, blockW - 10, { size: 8.5, lineGap: 2 });
  maxBlockEnd = Math.max(maxBlockEnd, endY);
});

y = maxBlockEnd + 14;
rule(y);
y += 14;

// =========================================================================
// 5. THE PILOT + 6. THE ROI (side by side)
// =========================================================================
const colGap = 22;
const colW = (CONTENT_W - colGap) / 2;
const colTop = y;

// Left column: Pilot
eyebrow("04 · THE PILOT", MARGIN_X, colTop);
heading("Concierge first. Engineer later.", MARGIN_X, colTop + 12, 13);
let pilotY = colTop + 32;
const pilotItems = [
  { week: "Wks 1–2", text: "Capture by hand. Five sharers. Five published workflows. Zero new code." },
  { week: "Wks 3–4", text: "Surface to ~60 matched peers. Measure activation rate (≥2 AI uses in 7 days)." },
];
pilotItems.forEach((p) => {
  doc.font("sans").fontSize(7.5).fillColor(C.accent).text(p.week, MARGIN_X, pilotY, {
    characterSpacing: 1.6,
    width: 64,
    lineBreak: false,
  });
  const endY = body(p.text, MARGIN_X + 70, pilotY - 1, colW - 70, { size: 8.5, lineGap: 2 });
  pilotY = Math.max(endY, pilotY + 22) + 8;
});
const pilotEnd = pilotY;

// Right column: ROI
const roiX = MARGIN_X + colW + colGap;
eyebrow("05 · THE ROI", roiX, colTop);
heading("£358,800 per enterprise client, annualised.", roiX, colTop + 12, 13);
let roiY = colTop + 36;

// ROI math line
doc.font("sans").fontSize(8.5).fillColor(C.text).text(
  "69 newly-active peers  ×  2 hrs saved / week  ×  £50 blended rate",
  roiX,
  roiY,
  { width: colW, lineGap: 2 },
);
roiY = doc.y + 8;
doc.font("serif-italic").fontSize(20).fillColor(C.primary).text("£6,900 / week", roiX, roiY, {
  width: colW,
  lineBreak: false,
});
roiY += 26;
doc.font("sans").fontSize(7.5).fillColor(C.muted).text(
  "Conservative 15% activation against the 460 non-active pool. Reconciles with the deck's RoiModel slide and the admin view.",
  roiX,
  roiY,
  { width: colW, lineGap: 1.8 },
);
const roiEnd = doc.y;

y = Math.max(pilotEnd, roiEnd) + 14;
rule(y);
y += 14;

// =========================================================================
// 7. RISKS & WHAT I'D DO NEXT (side by side)
// =========================================================================
const riskTop = y;

// Risks
eyebrow("06 · RISKS", MARGIN_X, riskTop);
heading("What could break the bet.", MARGIN_X, riskTop + 12, 13);
const risks = [
  "Active users don't share. Mitigation: concierge-curate the first batch by hand.",
  "Workflows feel performative. Mitigation: short form, opt-in, no leaderboard.",
  "Manager surveillance creeps in. Mitigation: contributor identity stays opt-in at admin layer.",
];
let riskY = riskTop + 32;
risks.forEach((r) => {
  doc.fillColor(C.primary).rect(MARGIN_X, riskY + 4, 3, 3).fill();
  const endY = body(r, MARGIN_X + 10, riskY, colW - 10, { size: 8.2, lineGap: 1.8 });
  riskY = endY + 5;
});

// Next
const nextX = MARGIN_X + colW + colGap;
eyebrow("07 · WHAT I'D DO NEXT", nextX, riskTop);
heading("After the pilot proves it.", nextX, riskTop + 12, 13);
const nexts = [
  "Capture-in-flow: Slack and Notion integrations so workflows post themselves.",
  "Manager digest: model behaviour via examples, never mandate via dashboards.",
  "Anti-spam: rate-limit, auto-archive stale workflows, peer-flagged quality signal.",
];
let nextY = riskTop + 32;
nexts.forEach((n) => {
  doc.fillColor(C.primary).rect(nextX, nextY + 4, 3, 3).fill();
  const endY = body(n, nextX + 10, nextY, colW - 10, { size: 8.2, lineGap: 1.8 });
  nextY = endY + 5;
});

y = Math.max(riskY, nextY) + 8;

// =========================================================================
// 8. FOOTER STRIP
// =========================================================================
const footerY = PAGE_H - MARGIN_BOTTOM - 8;
rule(footerY - 10);
doc.font("sans").fontSize(7).fillColor(C.muted).text(
  "Built for Chico.ai  ·  AI Adoption PM submission  ·  Solo build  ·  May 2026",
  MARGIN_X,
  footerY,
  { characterSpacing: 1.4, width: CONTENT_W * 0.75, lineBreak: false },
);
doc.font("sans").fontSize(7).fillColor(C.muted).text(
  "COMPASS",
  MARGIN_X,
  footerY,
  { characterSpacing: 2.2, width: CONTENT_W, align: "right", lineBreak: false },
);

doc.end();

doc.on("end", () => {
  const stat = fs.statSync(OUT);
  console.log(`Wrote ${OUT}  (${(stat.size / 1024).toFixed(1)} KB)`);
});
