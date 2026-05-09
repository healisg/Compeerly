import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Check, ChevronDown, Copy, RotateCcw } from "lucide-react";
import { DISMISSED_KEY as NUDGE_DISMISSED_KEY } from "../components/nudge-strip";

const TOKENS = {
  primary: "#166534",
  accent: "#92400E",
  bg: "#FBF8F4",
  text: "#3A3A3A",
  muted: "#8A7F70",
  rule: "#E5DBC8",
  card: "#FFFFFF",
};

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
    seed,
  )}&backgroundColor=fef3c7,dcfce7,dbeafe,fee2e2,ede9fe&radius=50`;
}

const KPIS = [
  {
    label: "Time reclaimed this week",
    value: "£6,900",
    delta: "+18% vs last week",
    caption: "At £50 blended rate, across 138 hours saved.",
  },
  {
    label: "Workflows shared",
    value: "28",
    delta: "12 new this week, from 5 contributors",
    caption: "Capture is voluntary. The 5 are doing it anyway.",
  },
  {
    label: "Latent users who tried",
    value: "89 of 460",
    delta: "Tried a peer workflow this week",
    caption: "The non-adopter pool the pilot is here to activate.",
  },
  {
    label: "Activation rate",
    value: "11%",
    delta: "Target 15% within 30 days",
    caption: "≥ 2 AI tool uses in 7 days after viewing a peer workflow.",
  },
];

type PropStep = { name: string; action: string; week: string };

type PeerRow = {
  contributor: string;
  role: string;
  title: string;
  tried: number;
  worked: number;
  hours: string;
  weeklyDelta: number;
  propagation: PropStep[];
};

const PEER_NETWORK: PeerRow[] = [
  {
    contributor: "Priya N.",
    role: "Operations Manager",
    title: "Drafting quarterly board updates",
    tried: 14,
    worked: 9,
    hours: "17.2 hrs",
    weeklyDelta: 3,
    propagation: [
      { name: "Priya N.", action: "shared", week: "Wk 2" },
      { name: "Devon R.", action: "tried", week: "Wk 2" },
      { name: "Devon R.", action: "shared to 2 others", week: "Wk 3" },
    ],
  },
  {
    contributor: "Marcus T.",
    role: "Account Manager",
    title: "Writing client meeting follow-up emails",
    tried: 22,
    worked: 18,
    hours: "23.5 hrs",
    weeklyDelta: 4,
    propagation: [
      { name: "Marcus T.", action: "shared", week: "Wk 1" },
      { name: "Jordan K.", action: "tried · then shared to 3 others", week: "Wk 2" },
      { name: "Devon R.", action: "tried", week: "Wk 3" },
    ],
  },
  {
    contributor: "Jordan K.",
    role: "Sales Analyst",
    title: "Building weekly sales pipeline reports",
    tried: 11,
    worked: 7,
    hours: "14.0 hrs",
    weeklyDelta: 2,
    propagation: [
      { name: "Jordan K.", action: "shared", week: "Wk 2" },
      { name: "Priya N.", action: "tried", week: "Wk 3" },
      { name: "Priya N.", action: "shared to 1 other", week: "Wk 3" },
    ],
  },
  {
    contributor: "Sana A.",
    role: "Compliance Officer",
    title: "Summarising regulatory changes",
    tried: 6,
    worked: 4,
    hours: "8.4 hrs",
    weeklyDelta: 0,
    propagation: [
      { name: "Sana A.", action: "shared", week: "Wk 3" },
      { name: "Devon R.", action: "tried", week: "Wk 3" },
    ],
  },
  {
    contributor: "Devon R.",
    role: "HR Business Partner",
    title: "Onboarding checklists for new hires",
    tried: 9,
    worked: 6,
    hours: "6.1 hrs",
    weeklyDelta: 1,
    propagation: [
      { name: "Devon R.", action: "shared", week: "Wk 3" },
      { name: "Sana A.", action: "tried", week: "Wk 3" },
      { name: "3 others", action: "tried via team share", week: "Wk 4" },
    ],
  },
];

const CONTRIBUTORS = [
  { name: "Marcus T.", role: "Account Manager", shared: 4, hoursForOthers: "47.2 hrs" },
  { name: "Priya N.", role: "Operations Manager", shared: 3, hoursForOthers: "28.6 hrs" },
  { name: "Jordan K.", role: "Sales Analyst", shared: 3, hoursForOthers: "21.4 hrs" },
  { name: "Devon R.", role: "HR Business Partner", shared: 2, hoursForOthers: "12.8 hrs" },
  { name: "Sana A.", role: "Compliance Officer", shared: 2, hoursForOthers: "9.7 hrs" },
];

const ROLE_COVERAGE = [
  { role: "Account Managers", pct: 73, under: false },
  { role: "Operations Managers", pct: 61, under: false },
  { role: "Sales Analysts", pct: 54, under: false },
  { role: "HR Business Partners", pct: 38, under: true },
  { role: "Compliance Officers", pct: 12, under: true },
  { role: "Finance Analysts", pct: 9, under: true },
];

const CONCIERGE_ACTIONS = [
  {
    headline: "3 senior analysts have done useful AI work but haven't captured it.",
    body: "They've each told a colleague how they use AI, but never written it down. A 15-minute capture call is the highest-leverage thing this week.",
    cta: "Send a 15-min capture invite",
  },
  {
    headline: "Compliance is at 12% coverage — recruit a contributor.",
    body: "The under-served roles need a sharer in their own discipline. Sana A. is the obvious candidate; offer concierge support.",
    cta: "Reach out to Sana A.",
  },
  {
    headline: "Marcus T.'s workflow has 22 tries, 18 'worked for me'.",
    body: "This is your social-proof anchor. Feature it on the feed homepage and quote it in next week's all-hands.",
    cta: "Pin to feed homepage",
  },
];

const SPARKLINE = [
  { week: "W1", value: 12 },
  { week: "W2", value: 28 },
  { week: "W3", value: 61 },
  { week: "W4", value: 89 },
];

// ─── Suggest role derivation ───────────────────────────────────────────────

const ROLE_SINGULAR_TO_PLURAL: Record<string, string> = {
  "Operations Manager": "Operations Managers",
  "Account Manager": "Account Managers",
  "Sales Analyst": "Sales Analysts",
  "Compliance Officer": "Compliance Officers",
  "HR Business Partner": "HR Business Partners",
};

// Returns the most under-covered role that this workflow should be suggested to.
// Conditions: tried < 20 (not yet saturated), success rate > 55%, and the
// target must be an under-covered role that isn't the contributor's own.
function computeSuggestRole(row: PeerRow): string | null {
  if (row.tried >= 20) return null;
  if (row.worked / row.tried < 0.55) return null;

  const ownRolePlural = ROLE_SINGULAR_TO_PLURAL[row.role] ?? "";

  const candidate = ROLE_COVERAGE
    .filter((r) => r.under && r.role !== ownRolePlural)
    .sort((a, b) => a.pct - b.pct)[0];

  return candidate?.role ?? null;
}

// ─── Force-directed graph ──────────────────────────────────────────────────

const GRAPH_NODES_BASE = [
  { name: "Marcus T.", r: 22 },
  { name: "Priya N.", r: 17 },
  { name: "Jordan K.", r: 15 },
  { name: "Devon R.", r: 13 },
  { name: "Sana A.", r: 11 },
];

const GRAPH_EDGES = [
  { from: "Marcus T.", to: "Jordan K.", weight: 3 },
  { from: "Marcus T.", to: "Devon R.", weight: 2 },
  { from: "Priya N.", to: "Devon R.", weight: 2 },
  { from: "Jordan K.", to: "Priya N.", weight: 1 },
  { from: "Sana A.", to: "Devon R.", weight: 1 },
];

type SimNode = { name: string; r: number; x: number; y: number; vx: number; vy: number };

// Spring-force simulation: Coulomb repulsion + Hooke spring edges + centre gravity.
function runForceSimulation(
  W: number,
  H: number,
): Array<{ name: string; r: number; x: number; y: number }> {
  const cx = W / 2;
  const cy = H / 2;
  const n = GRAPH_NODES_BASE.length;

  // Initialise on a circle so the simulation starts from a spread-out state.
  const nodes: SimNode[] = GRAPH_NODES_BASE.map((base, i) => ({
    name: base.name,
    r: base.r,
    x: cx + Math.cos((2 * Math.PI * i) / n) * 155,
    y: cy + Math.sin((2 * Math.PI * i) / n) * 80,
    vx: 0,
    vy: 0,
  }));

  const repulsion = 3200;
  const springK = 0.06;
  const idealLength = 185;
  const damping = 0.82;
  const gravity = 0.006;
  const iterations = 280;

  for (let iter = 0; iter < iterations; iter++) {
    // Coulomb repulsion between every pair
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x || 0.01;
        const dy = nodes[j].y - nodes[i].y || 0.01;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);
        const f = repulsion / distSq;
        const fx = (f * dx) / dist;
        const fy = (f * dy) / dist;
        nodes[i].vx -= fx;
        nodes[i].vy -= fy;
        nodes[j].vx += fx;
        nodes[j].vy += fy;
      }
    }

    // Hooke spring attraction along edges (weight scales ideal length)
    for (const edge of GRAPH_EDGES) {
      const a = nodes.find((nd) => nd.name === edge.from)!;
      const b = nodes.find((nd) => nd.name === edge.to)!;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const edgeIdeal = idealLength * (1 - (edge.weight - 1) * 0.12);
      const f = springK * (dist - edgeIdeal);
      const fx = (f * dx) / dist;
      const fy = (f * dy) / dist;
      a.vx += fx;
      a.vy += fy;
      b.vx -= fx;
      b.vy -= fy;
    }

    // Weak gravity toward centre
    for (const nd of nodes) {
      nd.vx += (cx - nd.x) * gravity;
      nd.vy += (cy - nd.y) * gravity;
    }

    // Integrate & clamp
    for (const nd of nodes) {
      nd.vx *= damping;
      nd.vy *= damping;
      nd.x += nd.vx;
      nd.y += nd.vy;
      nd.x = Math.max(nd.r + 22, Math.min(W - nd.r - 22, nd.x));
      nd.y = Math.max(nd.r + 22, Math.min(H - nd.r - 22, nd.y));
    }
  }

  return nodes.map(({ name, r, x, y }) => ({ name, r, x, y }));
}

function nodeInitials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

// ─── NetworkGraph component ────────────────────────────────────────────────

function NetworkGraph({
  hoveredNode,
  onNodeHover,
}: {
  hoveredNode: string | null;
  onNodeHover: (name: string | null) => void;
}) {
  const W = 560;
  const H = 228;

  // Force simulation runs once synchronously during initialisation.
  const [positions] = useState(() => runForceSimulation(W, H));

  // Two-phase animation: `mounted` triggers entry transitions (with stagger),
  // `animated` flips true after all entry transitions complete so hover
  // transitions skip the stagger delay and feel instant.
  const [mounted, setMounted] = useState(false);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const rafId = requestAnimationFrame(() => setMounted(true));
    const timerId = setTimeout(() => setAnimated(true), 1300);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, []);

  const connectedTo = (name: string): Set<string> => {
    const s = new Set<string>();
    GRAPH_EDGES.forEach((e) => {
      if (e.from === name) s.add(e.to);
      if (e.to === name) s.add(e.from);
    });
    return s;
  };

  const connected = hoveredNode ? connectedTo(hoveredNode) : null;

  const nodeOpacity = (name: string) => {
    if (!hoveredNode) return 1;
    if (name === hoveredNode || connected?.has(name)) return 1;
    return 0.2;
  };

  const edgeOpacity = (e: (typeof GRAPH_EDGES)[0]) => {
    if (!hoveredNode) return 0.3;
    if (e.from === hoveredNode || e.to === hoveredNode) return 0.75;
    return 0.05;
  };

  const edgeWidth = (w: number) => (w >= 3 ? 2.5 : w >= 2 ? 1.75 : 1);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      style={{ display: "block", maxHeight: "210px" }}
      aria-label="Peer influence network"
    >
      {/* ── Edges: draw-in on mount (staggered), opacity on hover ── */}
      {GRAPH_EDGES.map((edge, i) => {
        const f = positions.find((n) => n.name === edge.from)!;
        const t = positions.find((n) => n.name === edge.to)!;
        const mx = (f.x + t.x) / 2 + (f.y - t.y) * 0.1;
        const my = (f.y + t.y) / 2 + (t.x - f.x) * 0.1;
        // Stagger fires during initial mount (mounted=true, animated=false).
        // Once animated=true all delays become 0s so hover feels instant.
        const staggerDelay = `${0.5 + i * 0.1}s`;
        const delay = mounted && !animated ? staggerDelay : "0s";
        const dashDuration = animated ? "0s" : "0.55s";
        const opacityDuration = animated ? "0.18s" : "0.3s";
        return (
          <path
            key={i}
            d={`M ${f.x} ${f.y} Q ${mx} ${my} ${t.x} ${t.y}`}
            pathLength="1"
            stroke={TOKENS.primary}
            strokeWidth={edgeWidth(edge.weight)}
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: 1,
              strokeDashoffset: mounted ? 0 : 1,
              opacity: mounted ? edgeOpacity(edge) : 0,
              transition: `stroke-dashoffset ${dashDuration} cubic-bezier(0.4,0,0.2,1) ${delay}, opacity ${opacityDuration} ease ${delay}`,
            }}
          />
        );
      })}

      {/* ── Nodes: fade-in on mount (staggered), opacity on hover ── */}
      {positions.map((node, i) => {
        const isHovered = hoveredNode === node.name;
        const staggerDelay = `${0.06 + i * 0.07}s`;
        const nodeDelay = mounted && !animated ? staggerDelay : "0s";
        const nodeDuration = animated ? "0.18s" : "0.38s";
        return (
          <g
            key={node.name}
            style={{
              cursor: "pointer",
              opacity: mounted ? nodeOpacity(node.name) : 0,
              transition: `opacity ${nodeDuration} ease ${nodeDelay}`,
            }}
            onMouseEnter={() => onNodeHover(node.name)}
            onMouseLeave={() => onNodeHover(null)}
          >
            {/* Pulse ring on hover */}
            {isHovered && (
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r + 6}
                fill="none"
                stroke={TOKENS.primary}
                strokeWidth="1"
                strokeOpacity="0.25"
              />
            )}
            {/* Node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill={isHovered ? TOKENS.primary : TOKENS.card}
              stroke={TOKENS.primary}
              strokeWidth="1.5"
              style={{ transition: "fill 0.18s ease" }}
            />
            {/* Initials */}
            <text
              x={node.x}
              y={node.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={node.r * 0.62}
              fontWeight="600"
              fill={isHovered ? "#fff" : TOKENS.primary}
              fontFamily="'Inter', system-ui, sans-serif"
              style={{ pointerEvents: "none", userSelect: "none", transition: "fill 0.18s ease" }}
            >
              {nodeInitials(node.name)}
            </text>
            {/* Name label */}
            <text
              x={node.x}
              y={node.y + node.r + 13}
              textAnchor="middle"
              fontSize="9"
              fill={isHovered ? TOKENS.text : TOKENS.muted}
              fontFamily="'Inter', system-ui, sans-serif"
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              {node.name.split(" ")[0]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Sparkline ─────────────────────────────────────────────────────────────

function Sparkline() {
  const W = 520;
  const H = 170;
  const padX = 32;
  const padY = 36;
  const padBottom = 26;

  const max = Math.max(...SPARKLINE.map((d) => d.value));
  const points = SPARKLINE.map((d, i) => {
    const x = padX + (i * (W - padX * 2)) / (SPARKLINE.length - 1);
    const y = padY + (H - padY - padBottom) * (1 - d.value / max);
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x},${H - padBottom} L${points[0].x},${H - padBottom} Z`;
  const annotated = points[2];
  const annotAnchorX = annotated.x - 10;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto overflow-visible"
      role="img"
      aria-label="Adoption over four weeks"
    >
      <defs>
        <style>{`
          @keyframes sparkDrawLine {
            from { stroke-dashoffset: 1; }
            to   { stroke-dashoffset: 0; }
          }
          @keyframes sparkFadeIn {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          .spark-area {
            opacity: 0;
            animation: sparkFadeIn 0.7s ease 1.55s forwards;
          }
          .spark-line {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            animation: sparkDrawLine 1.3s cubic-bezier(0.4, 0, 0.2, 1) 0.25s forwards;
          }
          .spark-dot-0 { opacity:0; animation: sparkFadeIn 0.35s ease 0.30s forwards; }
          .spark-dot-1 { opacity:0; animation: sparkFadeIn 0.35s ease 0.72s forwards; }
          .spark-dot-2 { opacity:0; animation: sparkFadeIn 0.35s ease 1.12s forwards; }
          .spark-dot-3 { opacity:0; animation: sparkFadeIn 0.35s ease 1.55s forwards; }
          .spark-annotation {
            opacity: 0;
            animation: sparkFadeIn 0.5s ease 1.85s forwards;
          }
        `}</style>
      </defs>

      <path d={areaPath} fill={TOKENS.primary} fillOpacity="0.07" className="spark-area" />
      <path
        d={linePath}
        pathLength="1"
        stroke={TOKENS.primary}
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="spark-line"
      />
      {points.map((p, i) => (
        <circle key={p.week} cx={p.x} cy={p.y} r="3.5" fill={TOKENS.primary} className={`spark-dot-${i}`} />
      ))}
      {points.map((p) => (
        <text
          key={`lbl-${p.week}`}
          x={p.x}
          y={H - 6}
          textAnchor="middle"
          fontSize="10"
          fill={TOKENS.muted}
          fontFamily="'Inter', system-ui, sans-serif"
        >
          {p.week}
        </text>
      ))}
      <g className="spark-annotation">
        <line
          x1={annotated.x}
          y1={annotated.y - 9}
          x2={annotated.x}
          y2={padY - 2}
          stroke={TOKENS.accent}
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <text
          x={annotAnchorX}
          y={padY + 3}
          textAnchor="end"
          fontSize="9"
          fontWeight="600"
          fill={TOKENS.accent}
          fontFamily="'Inter', system-ui, sans-serif"
        >
          Wk 3 · Marcus T.
        </text>
        <text
          x={annotAnchorX}
          y={padY + 14}
          textAnchor="end"
          fontSize="9"
          fill={TOKENS.accent}
          fontFamily="'Inter', system-ui, sans-serif"
        >
          shared the client-email workflow
        </text>
      </g>
    </svg>
  );
}

// ─── KPI tile ──────────────────────────────────────────────────────────────

function KpiTile({ label, value, delta, caption }: (typeof KPIS)[number]) {
  return (
    <div
      className="p-6 md:p-7"
      style={{ backgroundColor: TOKENS.card, border: `1px solid ${TOKENS.rule}` }}
    >
      <div
        className="text-[10px] font-medium uppercase mb-4"
        style={{ color: TOKENS.muted, letterSpacing: "0.28em" }}
      >
        {label}
      </div>
      <div
        className="font-serif italic leading-none"
        style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "44px", color: TOKENS.text }}
      >
        {value}
      </div>
      <div className="mt-3 text-[12.5px] font-medium" style={{ color: TOKENS.primary }}>
        {delta}
      </div>
      <div className="mt-2 text-[12.5px] leading-snug" style={{ color: TOKENS.muted }}>
        {caption}
      </div>
    </div>
  );
}

// ─── Trend indicator ───────────────────────────────────────────────────────

function TrendBadge({ delta }: { delta: number }) {
  if (delta > 0) {
    return (
      <span
        style={{
          fontSize: "11px",
          color: TOKENS.primary,
          backgroundColor: "#dcfce7",
          padding: "2px 7px",
          borderRadius: "2px",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        ↑ +{delta} this week
      </span>
    );
  }
  if (delta < 0) {
    return (
      <span
        style={{
          fontSize: "11px",
          color: TOKENS.accent,
          backgroundColor: "#fef3c7",
          padding: "2px 7px",
          borderRadius: "2px",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        ↓ {delta} this week
      </span>
    );
  }
  return (
    <span
      style={{
        fontSize: "11px",
        color: TOKENS.muted,
        backgroundColor: TOKENS.bg,
        border: `1px solid ${TOKENS.rule}`,
        padding: "2px 7px",
        borderRadius: "2px",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      → flat
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [actioned, setActioned] = useState<Record<number, boolean>>({});
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [recognised, setRecognised] = useState<Record<string, boolean>>({});
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [nudgeResetDone, setNudgeResetDone] = useState(false);
  const [copiedDemo, setCopiedDemo] = useState(false);

  function handleResetNudge() {
    localStorage.removeItem(NUDGE_DISMISSED_KEY);
    window.dispatchEvent(new CustomEvent("compass:nudge-reset"));
    setNudgeResetDone(true);
    setTimeout(() => setNudgeResetDone(false), 2500);
  }

  function handleCopyDemoLink() {
    const url = `${window.location.origin}${window.location.pathname.replace(/\/admin\/?$/, "")}/feed?nudge=reset`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedDemo(true);
      setTimeout(() => setCopiedDemo(false), 2000);
    }).catch(() => {
      window.prompt("Copy this link:", url);
    });
  }

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: TOKENS.bg, color: TOKENS.text, fontFamily: "'Inter', system-ui, sans-serif" }}
      data-testid="admin-page"
    >
      {/* Header */}
      <header
        className="sticky top-0 z-10"
        style={{
          backgroundColor: `${TOKENS.bg}E6`,
          backdropFilter: "blur(8px)",
          borderBottom: `1px solid ${TOKENS.rule}`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: TOKENS.muted }}
            data-testid="link-back-cover"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to cover
          </Link>
          <div className="text-[11px] font-medium uppercase" style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}>
            Compass · Admin
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-32">
        {/* Hero */}
        <section className="max-w-3xl mb-20">
          <div className="text-[11px] font-medium uppercase mb-6" style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}>
            Month 1 of pilot
          </div>
          <h1
            className="font-serif italic leading-[1.05] tracking-tight text-[44px] md:text-[64px]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
          >
            £6,900 reclaimed this week across 28 peer-shared workflows.
            <br />
            <span style={{ color: TOKENS.primary }}>At full adoption: £358,800/year.</span>
          </h1>
          <div className="h-px w-[120px] mt-10" style={{ backgroundColor: TOKENS.rule }} />
          <p className="mt-8 text-[16px] md:text-[18px] leading-[1.6] max-w-[640px]" style={{ color: TOKENS.text }}>
            69 active peers × 2 hours/week × £50, per enterprise client. The pilot is testing the curve, not the ceiling.
          </p>
        </section>

        {/* KPI tiles */}
        <section className="mb-24" aria-labelledby="kpi-heading">
          <h2
            id="kpi-heading"
            className="text-[11px] font-medium uppercase mb-5"
            style={{ color: TOKENS.muted, letterSpacing: "0.32em" }}
          >
            Measured this month
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {KPIS.map((k) => (
              <KpiTile key={k.label} {...k} />
            ))}
          </div>
        </section>

        {/* ─── Peer network panel ─────────────────────────────────────────── */}
        <section className="mb-24" aria-labelledby="peer-heading">
          <div className="flex items-baseline justify-between mb-6">
            <h2
              id="peer-heading"
              className="font-serif italic text-[26px] md:text-[32px] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
            >
              The peer network
            </h2>
            <div className="text-[12.5px]" style={{ color: TOKENS.muted }}>
              What's spreading, and where
            </div>
          </div>

          {/* Network graph */}
          <div
            className="mb-6 p-6 md:p-8"
            style={{ backgroundColor: TOKENS.card, border: `1px solid ${TOKENS.rule}` }}
          >
            <div className="text-[10px] font-medium uppercase mb-4" style={{ color: TOKENS.muted, letterSpacing: "0.28em" }}>
              Influence map — hover a node to trace connections
            </div>
            <NetworkGraph hoveredNode={hoveredNode} onNodeHover={setHoveredNode} />
          </div>

          {/* Expandable rows */}
          <div style={{ borderTop: `1px solid ${TOKENS.rule}` }}>
            {PEER_NETWORK.map((row) => {
              const isExpanded = expandedRow === row.contributor;
              const isHighlighted = hoveredNode === row.contributor;
              const isRecognised = recognised[row.contributor];
              const suggestRole = computeSuggestRole(row);

              return (
                <div
                  key={row.contributor + row.title}
                  style={{
                    borderBottom: `1px solid ${TOKENS.rule}`,
                    backgroundColor: isHighlighted ? "#f0fdf4" : "transparent",
                    transition: "background-color 0.18s ease",
                  }}
                >
                  {/* Main row — click to expand */}
                  <button
                    type="button"
                    onClick={() => setExpandedRow(isExpanded ? null : row.contributor)}
                    aria-expanded={isExpanded}
                    style={{ background: "none", cursor: "pointer", display: "block", width: "100%", textAlign: "left" }}
                  >
                    <div className="grid grid-cols-12 gap-4 items-center py-5 px-1">
                      {/* Avatar + name */}
                      <div className="col-span-12 md:col-span-4 flex items-center gap-3">
                        <img
                          src={avatarUrl(row.contributor)}
                          alt=""
                          width={40}
                          height={40}
                          className="rounded-full"
                          style={{ filter: "saturate(0.85)", flexShrink: 0 }}
                        />
                        <div>
                          <div className="text-[14.5px] font-medium" style={{ color: TOKENS.text }}>
                            {row.contributor}
                          </div>
                          <div className="text-[12px]" style={{ color: TOKENS.muted }}>
                            {row.role}
                          </div>
                        </div>
                      </div>

                      {/* Workflow title + suggest chip */}
                      <div className="col-span-12 md:col-span-3">
                        <div className="text-[14px]" style={{ color: TOKENS.text }}>
                          {row.title}
                        </div>
                        {suggestRole && (
                          <div className="mt-1.5">
                            <span
                              style={{
                                fontSize: "10.5px",
                                color: TOKENS.accent,
                                border: `1px solid ${TOKENS.accent}`,
                                padding: "1px 7px",
                                borderRadius: "2px",
                                opacity: 0.85,
                                whiteSpace: "nowrap",
                              }}
                            >
                              → Suggest to {suggestRole}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="col-span-6 md:col-span-2 text-[13px]" style={{ color: TOKENS.muted }}>
                        Tried by{" "}
                        <span style={{ color: TOKENS.text, fontWeight: 500 }}>{row.tried}</span> ·{" "}
                        <span style={{ color: TOKENS.primary, fontWeight: 500 }}>{row.worked} worked</span>
                      </div>

                      {/* Hours + trend + chevron */}
                      <div className="col-span-6 md:col-span-3 flex items-center justify-end gap-3">
                        <TrendBadge delta={row.weeklyDelta} />
                        <span
                          className="font-serif italic text-[18px] hidden md:block"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
                        >
                          {row.hours}
                        </span>
                        <ChevronDown
                          className="w-4 h-4 shrink-0"
                          strokeWidth={1.75}
                          style={{
                            color: TOKENS.muted,
                            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.25s ease",
                          }}
                        />
                      </div>
                    </div>
                  </button>

                  {/* Expanded: propagation chain + Recognise */}
                  <div
                    style={{
                      overflow: "hidden",
                      maxHeight: isExpanded ? "420px" : "0px",
                      transition: "max-height 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        padding: "18px 4px 22px 56px",
                        borderTop: `1px solid ${TOKENS.rule}`,
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                      }}
                    >
                      {/* Propagation chain */}
                      <div>
                        <div
                          className="text-[10px] font-medium uppercase mb-3"
                          style={{ color: TOKENS.muted, letterSpacing: "0.28em" }}
                        >
                          Propagation chain
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {row.propagation.map((step, si) => (
                            <div key={si} style={{ display: "flex", alignItems: "flex-start", gap: "0" }}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  marginRight: "12px",
                                }}
                              >
                                <img
                                  src={avatarUrl(step.name)}
                                  alt=""
                                  width={26}
                                  height={26}
                                  className="rounded-full"
                                  style={{ filter: "saturate(0.8)", flexShrink: 0 }}
                                />
                                {si < row.propagation.length - 1 && (
                                  <div
                                    style={{
                                      width: "1px",
                                      height: "16px",
                                      backgroundColor: TOKENS.rule,
                                      marginTop: "2px",
                                      marginBottom: "2px",
                                    }}
                                  />
                                )}
                              </div>
                              <div style={{ paddingTop: "4px" }}>
                                <span className="text-[13px] font-medium" style={{ color: TOKENS.text }}>
                                  {step.name}
                                </span>
                                <span className="text-[13px]" style={{ color: TOKENS.muted }}>
                                  {" "}— {step.action}
                                </span>
                                <span
                                  className="text-[11px] ml-2"
                                  style={{
                                    color: TOKENS.muted,
                                    backgroundColor: TOKENS.bg,
                                    border: `1px solid ${TOKENS.rule}`,
                                    padding: "1px 6px",
                                    borderRadius: "2px",
                                  }}
                                >
                                  {step.week}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recognise button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRecognised((s) => ({ ...s, [row.contributor]: true }));
                        }}
                        className="inline-flex items-center gap-2 text-[13px] font-medium hover:opacity-70 transition-opacity self-start"
                        style={{
                          color: isRecognised ? TOKENS.muted : TOKENS.primary,
                          borderBottom: `1px solid ${isRecognised ? TOKENS.rule : TOKENS.primary}`,
                          paddingBottom: "2px",
                          background: "none",
                          cursor: isRecognised ? "default" : "pointer",
                        }}
                        data-testid={`recognise-${row.contributor}`}
                      >
                        {isRecognised ? (
                          <>
                            <Check className="w-3.5 h-3.5" strokeWidth={1.75} /> Recognised
                          </>
                        ) : (
                          <>
                            Recognise {row.contributor.split(" ")[0]}
                            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Two-column: Contributors + Coverage */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          {/* Contributors */}
          <div>
            <div className="flex items-baseline justify-between mb-6">
              <h2
                className="font-serif italic text-[26px] md:text-[32px] tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
              >
                Top contributors — the 40
              </h2>
            </div>
            <p className="text-[13.5px] mb-6 max-w-md" style={{ color: TOKENS.muted }}>
              These are the people teaching the organisation. Recognise them. Hours below are{" "}
              <span style={{ color: TOKENS.text }}>saved for others</span>, not for self.
            </p>
            <div style={{ borderTop: `1px solid ${TOKENS.rule}` }}>
              {CONTRIBUTORS.map((c) => (
                <div
                  key={c.name}
                  className="grid grid-cols-12 gap-3 items-center py-4"
                  style={{ borderBottom: `1px solid ${TOKENS.rule}` }}
                >
                  <div className="col-span-7 flex items-center gap-3">
                    <img
                      src={avatarUrl(c.name)}
                      alt=""
                      width={32}
                      height={32}
                      className="rounded-full"
                      style={{ filter: "saturate(0.85)" }}
                    />
                    <div>
                      <div className="text-[14px] font-medium" style={{ color: TOKENS.text }}>
                        {c.name}
                      </div>
                      <div className="text-[12px]" style={{ color: TOKENS.muted }}>
                        {c.role}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 text-[12.5px]" style={{ color: TOKENS.muted }}>
                    {c.shared} shared
                  </div>
                  <div
                    className="col-span-3 text-right font-serif italic text-[17px]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
                  >
                    {c.hoursForOthers}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage by role */}
          <div>
            <div className="flex items-baseline justify-between mb-6">
              <h2
                className="font-serif italic text-[26px] md:text-[32px] tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
              >
                Where the gap is hiding
              </h2>
            </div>
            <p className="text-[13.5px] mb-6 max-w-md" style={{ color: TOKENS.muted }}>
              Coverage by role — % of the role who've tried a peer workflow this month. Roles in{" "}
              <span style={{ color: TOKENS.accent, fontWeight: 500 }}>amber</span> are where the
              next contributor needs to come from.
            </p>
            <div className="space-y-4">
              {ROLE_COVERAGE.map((r) => (
                <div key={r.role}>
                  <div className="flex items-baseline justify-between text-[13px] mb-1.5">
                    <span style={{ color: TOKENS.text }}>{r.role}</span>
                    <span style={{ color: r.under ? TOKENS.accent : TOKENS.text, fontWeight: 500 }}>
                      {r.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full" style={{ backgroundColor: TOKENS.rule }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${r.pct}%`,
                        backgroundColor: r.under ? TOKENS.accent : TOKENS.primary,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Concierge actions */}
        <section className="mb-24" aria-labelledby="concierge-heading">
          <div className="flex items-baseline justify-between mb-6">
            <h2
              id="concierge-heading"
              className="font-serif italic text-[26px] md:text-[32px] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
            >
              Concierge, not control
            </h2>
            <div className="text-[12.5px]" style={{ color: TOKENS.muted }}>
              The admin's job in month 1 is to recruit contributors
            </div>
          </div>
          <p className="text-[13.5px] mb-8 max-w-2xl" style={{ color: TOKENS.muted }}>
            Compass does not assign workflows or nudge consumers. It surfaces the few
            high-leverage moves that grow the network — the kind of moves a thoughtful PM would
            make by hand in a pilot.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CONCIERGE_ACTIONS.map((a, i) => {
              const done = !!actioned[i];
              return (
                <div
                  key={i}
                  className="p-6 flex flex-col"
                  style={{ backgroundColor: TOKENS.card, border: `1px solid ${TOKENS.rule}` }}
                >
                  <div className="text-[15px] leading-snug mb-3" style={{ color: TOKENS.text, fontWeight: 500 }}>
                    {a.headline}
                  </div>
                  <div className="text-[13px] leading-relaxed mb-6 flex-1" style={{ color: TOKENS.muted }}>
                    {a.body}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActioned((s) => ({ ...s, [i]: true }))}
                    className="inline-flex items-center gap-2 text-[13px] font-medium self-start hover:opacity-70 transition-opacity"
                    style={{
                      color: done ? TOKENS.muted : TOKENS.primary,
                      borderBottom: `1px solid ${done ? TOKENS.rule : TOKENS.primary}`,
                      paddingBottom: "2px",
                    }}
                    data-testid={`concierge-action-${i}`}
                  >
                    {done ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Sent
                      </>
                    ) : (
                      <>
                        {a.cta} <ArrowUpRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Adoption sparkline */}
        <section aria-labelledby="adoption-heading">
          <div className="flex items-baseline justify-between mb-6">
            <h2
              id="adoption-heading"
              className="font-serif italic text-[26px] md:text-[32px] tracking-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: TOKENS.text }}
            >
              How adoption is spreading
            </h2>
            <div className="text-[12.5px]" style={{ color: TOKENS.muted }}>
              Latent users who tried a peer workflow, by week
            </div>
          </div>
          <div
            className="p-6 md:p-8"
            style={{ backgroundColor: TOKENS.card, border: `1px solid ${TOKENS.rule}` }}
          >
            <Sparkline />
            <p className="mt-6 text-[13.5px] max-w-2xl" style={{ color: TOKENS.muted }}>
              Growth is event-driven. Each step up corresponds to a contributor sharing — not a
              broadcast or a mandate. Adoption compounds when the right person shares the right
              workflow at the right moment.
            </p>
          </div>
        </section>

        {/* Demo tools */}
        <div
          className="mt-24 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ borderTop: `1px solid ${TOKENS.rule}` }}
        >
          <div className="text-[11.5px]" style={{ color: TOKENS.muted }}>
            All numbers reconcile with the pitch deck (RoiModel slide). Pilot data is illustrative for this submission.
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={handleCopyDemoLink}
              className="inline-flex items-center gap-2 text-[12px] font-medium transition-opacity hover:opacity-70"
              style={{
                color: copiedDemo ? TOKENS.primary : TOKENS.muted,
                border: `1px solid ${copiedDemo ? TOKENS.primary : TOKENS.rule}`,
                borderRadius: 3,
                padding: "5px 12px",
                background: copiedDemo ? "#dcfce7" : "transparent",
                transition: "color 0.2s, border-color 0.2s, background 0.2s",
              }}
              data-testid="admin-copy-demo-link"
            >
              {copiedDemo ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy demo link
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleResetNudge}
              className="inline-flex items-center gap-2 text-[12px] font-medium transition-opacity hover:opacity-70"
              style={{
                color: nudgeResetDone ? TOKENS.primary : TOKENS.muted,
                border: `1px solid ${nudgeResetDone ? TOKENS.primary : TOKENS.rule}`,
                borderRadius: 3,
                padding: "5px 12px",
                background: nudgeResetDone ? "#dcfce7" : "transparent",
                transition: "color 0.2s, border-color 0.2s, background 0.2s",
              }}
              data-testid="admin-reset-nudge"
            >
              {nudgeResetDone ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Nudge strip reset
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset nudge demo
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
