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
// COMPASS MARK — ported from src/components/compass-mark.tsx
// SVG viewBox is 0 0 64 64; circle cx=32 cy=32 r=29; needles rotated -22°.
// =========================================================================
function drawCompassMark(x, y, size, color, opacity = 1) {
  const s = size / 64; // scale factor from 64-unit viewBox
  const cx = x + size / 2;
  const cy = y + size / 2;
  const strokeW = 2.2 * s;

  doc.save();
  doc.opacity(opacity);

  // Ring
  doc
    .strokeColor(color)
    .lineWidth(strokeW)
    .circle(cx, cy, 29 * s)
    .stroke();

  // Rotate around centre by -22° for both needles
  doc.translate(cx, cy).rotate(-22).translate(-cx, -cy);

  // Front needle: M32 9 L40 34 L32 31 L24 34 Z
  const front = [
    [32, 9],
    [40, 34],
    [32, 31],
    [24, 34],
  ];
  doc.fillColor(color).opacity(opacity);
  doc.moveTo(x + front[0][0] * s, y + front[0][1] * s);
  for (let i = 1; i < front.length; i++) {
    doc.lineTo(x + front[i][0] * s, y + front[i][1] * s);
  }
  doc.closePath().fill();

  // Back needle: M32 55 L24 30 L32 33 L40 30 Z, opacity 0.22
  const back = [
    [32, 55],
    [24, 30],
    [32, 33],
    [40, 30],
  ];
  doc.fillColor(color).opacity(opacity * 0.22);
  doc.moveTo(x + back[0][0] * s, y + back[0][1] * s);
  for (let i = 1; i < back.length; i++) {
    doc.lineTo(x + back[i][0] * s, y + back[i][1] * s);
  }
  doc.closePath().fill();

  doc.restore();
}

// =========================================================================
// 1. HEADER STRIP
// =========================================================================
// Forest green progress band (echo of slide chrome top bar)
doc.rect(0, 0, PAGE_W, 4).fill(C.primary);

let y = 28;

// Eyebrow
doc.font("sans").fontSize(7.5).fillColor(C.muted).text("ONE-PAGER  ·  AI ADOPTION PM SUBMISSION", MARGIN_X, y, {
  characterSpacing: 2.4,
  width: CONTENT_W,
});
y += 26;

// Header lockup: Compass mark to the left of the wordmark
const markSize = 38;
drawCompassMark(MARGIN_X, y - 2, markSize, C.primary, 1);
doc.font("serif-italic").fontSize(40).fillColor(C.text).text("Compass", MARGIN_X + markSize + 12, y - 6, {
  width: CONTENT_W - markSize - 12,
  lineGap: -2,
  lineBreak: false,
});
y += 48;

// Tagline (per spec)
doc.font("serif-italic").fontSize(15).fillColor(C.primary).text(
  "Peer-led AI workflow sharing, so the 90% can learn from the 10%.",
  MARGIN_X,
  y,
  { width: CONTENT_W },
);
y += 28;

// Section divider
function rule(yPos, color = C.rule) {
  doc.strokeColor(color).lineWidth(0.6).moveTo(MARGIN_X, yPos).lineTo(PAGE_W - MARGIN_X, yPos).stroke();
}
rule(y);
y += 16;

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
const probEyebrowY = y;
eyebrow("01 · THE PROBLEM", MARGIN_X, y);
y += 14;
heading("Chico.ai measures the adoption gap. It does not close it.", MARGIN_X, y, 13);
y += 22;

// Two columns: paragraph (left, 65%) + stat (right, 35%)
const leftW = CONTENT_W * 0.62;
const statX = MARGIN_X + leftW + 18;
const statW = CONTENT_W - leftW - 18;

const probParaY = y;
const probParaEnd = body(
  "On a typical Chico.ai install, 10% of users drive most AI activity. The dashboard tells leadership who is and isn't using AI. It does not give the other 460 a reason — or a way — to start. Training and mandates are the default response, and the default response is failing.",
  MARGIN_X,
  y,
  leftW,
  { lineGap: 2.8 },
);

// Stat callout — top-aligned with the "01 · THE PROBLEM" eyebrow on the left
const statTopY = probEyebrowY - 6;
doc.font("serif").fontSize(28).fillColor(C.primary).text("88%", statX, statTopY, {
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
    statTopY + 34,
    { width: statW, lineGap: 1.5 },
  );
doc.font("sans").fontSize(6.5).fillColor(C.muted).text(
  "Microsoft Research, 2026",
  statX,
  statTopY + 72,
  { width: statW, characterSpacing: 1.2 },
);

y = probParaEnd + 16;
rule(y);
y += 16;

// =========================================================================
// 3. THE INSIGHT
// =========================================================================
eyebrow("02 · THE INSIGHT", MARGIN_X, y);
y += 14;
heading("Prescribed recipes replicate the threat. Peer discovery honours expertise.", MARGIN_X, y, 13);
y += 22;
y = body(
  "Top-down playbooks tell people their existing way of working is wrong. That triggers identity threat — and shadow AI. Peer-led discovery flips it: active users share what already works, in their own words. Non-adopters find role-relevant proof, on their own terms, with no manager visibility and no mandate. Visibility, not training, is the gap.",
  MARGIN_X,
  y,
  CONTENT_W,
  { lineGap: 2.8 },
);
y += 16;
rule(y);
y += 16;

// =========================================================================
// 4. THE PRODUCT (3 blocks)
// =========================================================================
eyebrow("03 · THE PRODUCT", MARGIN_X, y);
y += 14;
heading("Three surfaces, one motion.", MARGIN_X, y, 13);
y += 26;

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
const blockHeight = 58;
let maxBlockEnd = y;

blocks.forEach((b, i) => {
  const bx = MARGIN_X + i * (blockW + blockGap);
  // Left forest green stripe (taller, with breathing room)
  doc.rect(bx, blocksY, 2, blockHeight).fill(C.primary);
  eyebrow(b.label, bx + 14, blocksY + 6, C.primary);
  const endY = body(b.body, bx + 14, blocksY + 20, blockW - 14, { size: 8.5, lineGap: 2.4 });
  maxBlockEnd = Math.max(maxBlockEnd, endY);
});

y = Math.max(maxBlockEnd, blocksY + blockHeight) + 20;
rule(y);
y += 16;

// =========================================================================
// 5. THE PILOT + 6. THE ROI (side by side)
// =========================================================================
const colGap = 22;
const colW = (CONTENT_W - colGap) / 2;
const colTop = y;

// Left column: Pilot
eyebrow("04 · THE PILOT", MARGIN_X, colTop);
heading("Concierge first. Engineer later.", MARGIN_X, colTop + 14, 13);
let pilotY = colTop + 36;
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
  const endY = body(p.text, MARGIN_X + 70, pilotY - 1, colW - 70, { size: 8.5, lineGap: 2.2 });
  pilotY = Math.max(endY, pilotY + 22) + 10;
});
const pilotEnd = pilotY;

// Right column: ROI
const roiX = MARGIN_X + colW + colGap;
eyebrow("05 · THE ROI", roiX, colTop);
heading("£358,800 per enterprise client, annualised.", roiX, colTop + 14, 13);
let roiY = colTop + 40;

// ROI math line
doc.font("sans").fontSize(8.5).fillColor(C.text).text(
  "69 newly-active peers  ×  2 hrs saved / week  ×  £50 blended rate",
  roiX,
  roiY,
  { width: colW, lineGap: 2 },
);
roiY = doc.y + 10;
doc.font("serif-italic").fontSize(20).fillColor(C.primary).text("£6,900 / week", roiX, roiY, {
  width: colW,
  lineBreak: false,
});
roiY += 30;
doc.font("sans").fontSize(7.5).fillColor(C.muted).text(
  "Conservative 15% activation against the 460 non-active pool. Reconciles with the deck's RoiModel slide and the admin view.",
  roiX,
  roiY,
  { width: colW, lineGap: 1.8 },
);
const roiEnd = doc.y;

y = Math.max(pilotEnd, roiEnd) + 14;
rule(y);
y += 12;

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
  const endY = body(r, MARGIN_X + 10, riskY, colW - 10, { size: 8.2, lineGap: 1.6 });
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
  const endY = body(n, nextX + 10, nextY, colW - 10, { size: 8.2, lineGap: 1.6 });
  nextY = endY + 5;
});

y = Math.max(riskY, nextY) + 8;

// =========================================================================
// 8. FOOTER STRIP — with mini Compass mark lockup
// =========================================================================
const footerY = PAGE_H - MARGIN_BOTTOM - 8;
rule(footerY - 12);
doc.font("sans").fontSize(7).fillColor(C.muted).text(
  "Built for Chico.ai  ·  AI Adoption PM submission  ·  Solo build  ·  May 2026",
  MARGIN_X,
  footerY,
  { characterSpacing: 1.4, width: CONTENT_W * 0.75, lineBreak: false },
);

// Footer right-side lockup: small muted mark + COMPASS wordmark
const footerWordmark = "COMPASS";
doc.font("sans").fontSize(7).fillColor(C.muted);
const wordmarkW = doc.widthOfString(footerWordmark, { characterSpacing: 2.2 });
const footerMarkSize = 10;
const footerLockupRightEdge = PAGE_W - MARGIN_X;
const footerWordmarkX = footerLockupRightEdge - wordmarkW;
const footerMarkX = footerWordmarkX - footerMarkSize - 5;
drawCompassMark(footerMarkX, footerY - 2, footerMarkSize, C.muted, 0.85);
doc.font("sans").fontSize(7).fillColor(C.muted).text(
  footerWordmark,
  footerWordmarkX,
  footerY,
  { characterSpacing: 2.2, lineBreak: false },
);

doc.end();

doc.on("end", () => {
  const stat = fs.statSync(OUT);
  console.log(`Wrote ${OUT}  (${(stat.size / 1024).toFixed(1)} KB)`);
});
