import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { useWorkflows, type Workflow } from "@/lib/workflows";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowRight,
  Check,
  Plus,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
import { CompassMark } from "@/components/compass-mark";

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
const ICON = 1.5;

const NUDGE_KEY = "compass.workflowsTried";
const NUDGE_DISMISSED_KEY = "compass.nudgeDismissed";
const VIEWER_ROLE = "Account Manager";

function monogram(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Mono({ initials, size = 32 }: { initials: string; size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center font-semibold tracking-wider"
      style={{
        width: size,
        height: size,
        borderRadius: 2,
        border: `1px solid ${T.rule}`,
        color: T.mutedStrong,
        backgroundColor: "rgba(229,219,200,0.35)",
        fontFamily: T.ui,
        fontSize: size >= 30 ? 11 : 10,
      }}
    >
      {initials}
    </span>
  );
}

function ToolTag({ tool }: { tool: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
      style={{
        color: T.mutedStrong,
        border: `1px solid ${T.rule}`,
        borderRadius: 2,
        fontFamily: T.ui,
      }}
      data-testid="badge-ai-tool"
    >
      <span className="inline-block" style={{ width: 6, height: 6, borderRadius: 999, backgroundColor: T.accent }} />
      {tool}
    </span>
  );
}

function TimeStrip({ from, to }: { from: string; to: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5"
      style={{ backgroundColor: "rgba(229,219,200,0.45)", borderRadius: 2, fontFamily: T.ui, fontSize: 12 }}
      data-testid="time-comparison"
    >
      <span style={{ color: T.mutedStrong, textDecoration: "line-through" }}>{from} manually</span>
      <span style={{ color: T.muted }}>→</span>
      <span style={{ color: T.primary, fontWeight: 600 }}>{to} with Compass</span>
    </div>
  );
}

function ActivityNudgeBanner() {
  const search = useSearch();
  const [tried, setTried] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const triedParam = params.get("tried");
    const dismissParam = params.get("nudge");
    if (triedParam !== null) {
      const n = Math.max(0, parseInt(triedParam, 10) || 0);
      window.localStorage.setItem(NUDGE_KEY, String(n));
      if (dismissParam === "show") {
        window.localStorage.removeItem(NUDGE_DISMISSED_KEY);
      }
    }
    const stored = parseInt(window.localStorage.getItem(NUDGE_KEY) ?? "0", 10);
    setTried(Number.isFinite(stored) ? stored : 0);
    setDismissed(window.localStorage.getItem(NUDGE_DISMISSED_KEY) === "true");
  }, [search]);

  if (tried === null) return null;
  if (dismissed) return null;
  if (tried >= 5) return null;

  const handleDismiss = () => {
    window.localStorage.setItem(NUDGE_DISMISSED_KEY, "true");
    setDismissed(true);
  };

  let headline: React.ReactNode;
  let cta: string;
  if (tried === 0) {
    headline = (
      <>
        <span style={{ color: T.text, fontWeight: 600 }}>0 of 47</span> tried this quarter. The next one could save you{" "}
        <em style={{ fontStyle: "italic", color: T.primary, fontWeight: 600 }}>30 minutes.</em>
      </>
    );
    cta = "Pick one to try this week";
  } else {
    headline = (
      <>
        Nice — you've tried <span style={{ color: T.primary, fontWeight: 600 }}>{tried}</span>. Most colleagues build the
        habit by <em style={{ fontStyle: "italic" }}>five.</em>
      </>
    );
    cta = "Keep going";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="mb-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-4 sm:px-5 py-4"
      style={{ background: T.card, borderRadius: 2 }}
      data-testid="activity-nudge"
    >
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.22em] shrink-0"
        style={{ color: T.accent }}
      >
        Your week
      </span>
      <p className="flex-1 text-[14px]" style={{ color: T.text, fontFamily: T.serif, lineHeight: 1.45 }}>
        {headline}
      </p>
      <div className="flex items-center gap-4 sm:gap-3 shrink-0">
        <a
          href="#most-copied"
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium hover:opacity-80 transition-opacity"
          style={{ color: T.primary, fontFamily: T.ui }}
        >
          {cta} <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON} />
        </a>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="hover:opacity-70 transition-opacity"
          style={{ color: T.mutedStrong }}
          data-testid="button-dismiss-nudge"
        >
          <X className="w-4 h-4" strokeWidth={ICON} />
        </button>
      </div>
    </motion.div>
  );
}

function FeedCard({ workflow, peerLabel }: { workflow: Workflow; peerLabel?: string }) {
  return (
    <Link href={`/workflow/${workflow.id}`} className="block h-full no-underline" data-testid={`card-workflow-${workflow.id}`}>
      <article
        className="h-full p-5 flex flex-col transition-shadow hover:shadow-sm"
        style={{ background: "#FFFEFB", border: `1px solid ${T.rule}`, borderRadius: 4 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <Mono initials={monogram(workflow.author)} size={28} />
            <div className="leading-tight">
              <p className="text-[12px] font-semibold" style={{ color: T.text }} data-testid="text-author">
                {workflow.author}
              </p>
              <p className="text-[10px]" style={{ color: T.mutedStrong }} data-testid="badge-role">
                {workflow.role}
              </p>
            </div>
          </div>
          <ToolTag tool={workflow.aiTool} />
        </div>

        <h3 className="text-[19px] leading-snug mb-3" style={{ fontFamily: T.serif, fontWeight: 500, color: T.text }} data-testid="text-title">
          {workflow.title}
        </h3>

        <div className="mb-3">
          <TimeStrip from={workflow.timeManual} to={workflow.timeWithAI} />
        </div>

        <p
          className="text-[10px] font-semibold uppercase tracking-wider mb-2"
          style={{ color: T.mutedStrong }}
          data-testid="text-meta"
        >
          <span data-testid="badge-category">{workflow.category}</span> · {workflow.frequency}
        </p>

        <p className="text-[13px] mb-4 line-clamp-2" style={{ color: T.text, lineHeight: 1.55 }} data-testid="text-summary">
          {workflow.summary}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between border-t" style={{ borderColor: T.rule }}>
          <span className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: T.mutedStrong }} data-testid="text-peer-stat">
            <Users className="w-3 h-3" strokeWidth={ICON} />
            <span style={{ color: T.text, fontWeight: 600 }}>{workflow.peerCount}</span>{" "}
            {peerLabel ?? `${workflow.role.toLowerCase()}s`}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px]" style={{ color: T.mutedStrong }} data-testid="text-worked-for-me">
            <Check className="w-3 h-3" strokeWidth={ICON} style={{ color: T.primary }} />
            <span style={{ color: T.text, fontWeight: 600 }}>{workflow.workedForMeCount}</span> worked for me
          </span>
        </div>
      </article>
    </Link>
  );
}

function LeadStory({ workflow }: { workflow: Workflow }) {
  return (
    <article className="grid grid-cols-12 gap-5 sm:gap-8 p-5 sm:p-7 mb-12" style={{ background: T.card, borderRadius: 4 }} data-testid="lead-story">
      <div className="col-span-12 md:col-span-7">
        <div className="flex items-center gap-3 mb-4">
          <Mono initials={monogram(workflow.author)} />
          <div className="leading-tight">
            <p className="text-[13px] font-semibold" style={{ color: T.text }}>
              {workflow.author}
            </p>
            <p className="text-[11px]" style={{ color: T.mutedStrong }}>
              {workflow.role}
            </p>
          </div>
          <span className="ml-auto">
            <ToolTag tool={workflow.aiTool} />
          </span>
        </div>
        <Link href={`/workflow/${workflow.id}`} className="no-underline">
          <h2 className="text-[24px] sm:text-[30px] leading-[1.15] sm:leading-[1.1] mb-4 hover:opacity-80 transition-opacity" style={{ fontFamily: T.serif, fontWeight: 500, color: T.text }}>
            {workflow.title}
          </h2>
        </Link>
        <p className="text-[14px] mb-5" style={{ color: T.mutedStrong, lineHeight: 1.65 }}>
          {workflow.summary}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href={`/workflow/${workflow.id}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium no-underline hover:opacity-80 transition-opacity"
            style={{ color: T.primary }}
            data-testid="link-read-lead"
          >
            Read the workflow <ArrowRight className="w-3.5 h-3.5" strokeWidth={ICON} />
          </Link>
          <span className="inline-flex items-center gap-1.5 text-[12px]" style={{ color: T.mutedStrong }}>
            <Check className="w-3.5 h-3.5" strokeWidth={ICON} style={{ color: T.primary }} />
            <span style={{ color: T.text, fontWeight: 600 }}>{workflow.workedForMeCount}</span> said it worked
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px]" style={{ color: T.mutedStrong }}>
            <Users className="w-3.5 h-3.5" strokeWidth={ICON} />
            <span style={{ color: T.text, fontWeight: 600 }}>{workflow.peerCount}</span> in {workflow.role.toLowerCase()}s
          </span>
        </div>
      </div>
      <div className="col-span-12 md:col-span-5 md:pl-8 md:border-l mt-2 md:mt-0 pt-5 md:pt-0 border-t md:border-t-0" style={{ borderColor: "rgba(58,58,58,0.12)" }}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-3" style={{ color: T.mutedStrong }}>
          Time saved per cycle
        </p>
        <div className="flex items-baseline gap-3 mb-2">
          <span
            className="leading-none text-[40px] sm:text-[56px]"
            style={{ fontFamily: T.serif, color: T.primary, fontWeight: 500 }}
            data-testid="text-time-saved-hero"
          >
            {workflow.timeSaved}
          </span>
        </div>
        <p className="text-[12px] mb-5" style={{ color: T.mutedStrong }}>
          {workflow.timeManual} manually → {workflow.timeWithAI} with Compass
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] mb-2" style={{ color: T.mutedStrong }}>
          Cadence
        </p>
        <p className="text-[13px]" style={{ color: T.text }}>
          {workflow.frequency} · {workflow.category}
        </p>
      </div>
    </article>
  );
}

export default function FeedPage() {
  const { workflows } = useWorkflows();

  const [roleFilter, setRoleFilter] = useState("all");
  const [aiToolFilter, setAiToolFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount = [roleFilter, aiToolFilter, categoryFilter].filter((v) => v !== "all").length;
  const filtersActive = activeFilterCount > 0;

  const roles = useMemo(() => Array.from(new Set(workflows.map((w) => w.role))).sort(), [workflows]);
  const aiTools = useMemo(() => Array.from(new Set(workflows.map((w) => w.aiTool))).sort(), [workflows]);
  const categories = useMemo(() => Array.from(new Set(workflows.map((w) => w.category))).sort(), [workflows]);

  const filterKey = `${roleFilter}|${aiToolFilter}|${categoryFilter}`;

  const filteredWorkflows = useMemo(() => {
    return workflows.filter((w) => {
      const matchRole = roleFilter === "all" || w.role === roleFilter;
      const matchAiTool = aiToolFilter === "all" || w.aiTool === aiToolFilter;
      const matchCategory = categoryFilter === "all" || w.category === categoryFilter;
      return matchRole && matchAiTool && matchCategory;
    });
  }, [workflows, roleFilter, aiToolFilter, categoryFilter]);

  // Editorial sections (only used when no filters are active)
  const lead = workflows[0];
  const mostCopied = useMemo(
    () =>
      workflows
        .filter((w) => w.id !== lead?.id)
        .slice()
        .sort((a, b) => b.workedForMeCount - a.workedForMeCount)
        .slice(0, 3),
    [workflows, lead?.id],
  );
  const inYourRole = useMemo(() => {
    const usedIds = new Set<number>([lead?.id, ...mostCopied.map((w) => w.id)].filter(Boolean) as number[]);
    const roleMatches = workflows.filter((w) => w.role === VIEWER_ROLE && !usedIds.has(w.id));
    const fillers = workflows.filter((w) => !usedIds.has(w.id) && w.role !== VIEWER_ROLE);
    return [...roleMatches, ...fillers].slice(0, 2);
  }, [workflows, lead?.id, mostCopied]);

  const totalCount = workflows.length;
  const contributorCount = useMemo(() => new Set(workflows.map((w) => w.author)).size, [workflows]);
  const roleCount = roles.length;

  return (
    <div className="min-h-screen" style={{ background: T.bg, color: T.text, fontFamily: T.ui }}>
      <header
        className="sticky top-0 z-20 border-b backdrop-blur-md"
        style={{ borderColor: T.rule, backgroundColor: "rgba(251,248,244,0.85)" }}
      >
        <div className="max-w-[1180px] mx-auto px-5 sm:px-10 h-16 flex items-center justify-between gap-3">
          <Link href="/" className="no-underline min-w-0">
            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <CompassMark size={22} className="text-primary" />
              <span className="text-[20px]" style={{ fontFamily: T.serif, fontWeight: 600, color: T.text }}>
                Compass
              </span>
              <span
                className="hidden sm:inline text-[10px] font-semibold uppercase tracking-[0.18em] pl-3 border-l"
                style={{ color: T.mutedStrong, borderColor: T.rule }}
              >
                Chico.ai Internal
              </span>
            </div>
          </Link>
          <Link href="/capture" className="no-underline shrink-0">
            <Button
              data-testid="button-share-workflow"
              className="gap-2 px-3 sm:px-5 h-10 shadow-none"
              style={{ background: T.primary, color: "#FBF8F4", borderRadius: 2 }}
            >
              <Plus className="w-4 h-4" strokeWidth={ICON} />
              <span className="hidden sm:inline">Share a workflow</span>
              <span className="sm:hidden">Share</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-[1180px] mx-auto px-5 sm:px-10 pt-8 sm:pt-10 pb-24">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between mb-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: T.mutedStrong }}>
            This Week · Vol. 12 · 9 May
          </p>
          <p className="text-[12px]" style={{ color: T.mutedStrong }}>
            <span style={{ color: T.text, fontWeight: 600 }}>{totalCount}</span> workflows ·{" "}
            <span style={{ color: T.text, fontWeight: 600 }}>{contributorCount}</span> contributors ·{" "}
            <span style={{ color: T.text, fontWeight: 600 }}>{roleCount}</span> roles
          </p>
        </div>

        <h1
          className="text-[30px] sm:text-[44px] leading-[1.08] sm:leading-[1.05] tracking-tight mb-3"
          style={{ fontFamily: T.serif, color: T.text, fontWeight: 500 }}
        >
          What your colleagues <em style={{ fontStyle: "italic" }}>actually</em> shipped this week.
        </h1>
        <p className="text-[15px] max-w-[640px] mb-8" style={{ color: T.mutedStrong, lineHeight: 1.6 }}>
          Real workflows from people across Chico.ai. Try one this week and let them know it helped.
        </p>

        <ActivityNudgeBanner />

        {!filtersActive && lead && <LeadStory workflow={lead} />}

        {/* Filter bar — between editorial lead and grid sections */}
        <div className="mb-8" id="most-copied">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              className="gap-2 px-4 h-9 shadow-none"
              style={{ borderColor: T.rule, color: T.text, borderRadius: 2, background: "transparent" }}
              onClick={() => setFiltersOpen((prev) => !prev)}
              data-testid="button-filter-toggle"
            >
              <SlidersHorizontal className="w-4 h-4" strokeWidth={ICON} />
              {activeFilterCount > 0 ? `Filter · ${activeFilterCount}` : "Filter"}
            </Button>
            {!filtersOpen && roleFilter !== "all" && (
              <button
                type="button"
                className="inline-flex items-center gap-1 px-3 h-7 text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ background: "rgba(22,101,52,0.1)", color: T.primary, borderRadius: 999 }}
                data-testid="chip-role"
                onClick={() => setRoleFilter("all")}
                aria-label={`Remove role filter: ${roleFilter}`}
              >
                {roleFilter}
                <X className="w-3 h-3" />
              </button>
            )}
            {!filtersOpen && aiToolFilter !== "all" && (
              <button
                type="button"
                className="inline-flex items-center gap-1 px-3 h-7 text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ background: "rgba(22,101,52,0.1)", color: T.primary, borderRadius: 999 }}
                data-testid="chip-ai-tool"
                onClick={() => setAiToolFilter("all")}
                aria-label={`Remove AI tool filter: ${aiToolFilter}`}
              >
                {aiToolFilter}
                <X className="w-3 h-3" />
              </button>
            )}
            {!filtersOpen && categoryFilter !== "all" && (
              <button
                type="button"
                className="inline-flex items-center gap-1 px-3 h-7 text-sm font-medium hover:opacity-80 transition-opacity"
                style={{ background: "rgba(22,101,52,0.1)", color: T.primary, borderRadius: 999 }}
                data-testid="chip-category"
                onClick={() => setCategoryFilter("all")}
                aria-label={`Remove category filter: ${categoryFilter}`}
              >
                {categoryFilter}
                <X className="w-3 h-3" />
              </button>
            )}
            {activeFilterCount > 0 && (
              <button
                onClick={() => {
                  setRoleFilter("all");
                  setAiToolFilter("all");
                  setCategoryFilter("all");
                }}
                className="text-sm hover:opacity-70 transition-opacity underline-offset-2 hover:underline"
                style={{ color: T.mutedStrong }}
                data-testid="button-clear-filters"
              >
                Clear
              </button>
            )}
          </div>

          <AnimatePresence initial={false}>
            {filtersOpen && (
              <motion.div
                key="filter-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[200px]" data-testid="select-role" style={{ borderRadius: 2 }}>
                      <SelectValue placeholder="Filter by Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={aiToolFilter} onValueChange={setAiToolFilter}>
                    <SelectTrigger className="w-[200px]" data-testid="select-ai-tool" style={{ borderRadius: 2 }}>
                      <SelectValue placeholder="Filter by AI Tool" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All AI Tools</SelectItem>
                      {aiTools.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[200px]" data-testid="select-category" style={{ borderRadius: 2 }}>
                      <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {filtersActive ? (
          // Filtered grid view — replaces editorial sections
          filteredWorkflows.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredWorkflows.map((w, index) => (
                <motion.div
                  key={`${w.id}-${filterKey}`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: Math.min(index * 0.05, 0.3) }}
                >
                  <FeedCard workflow={w} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className="text-center py-20"
              style={{ background: "transparent", border: `1px dashed ${T.rule}`, borderRadius: 2 }}
              data-testid="empty-state"
            >
              <h3 className="text-[18px]" style={{ fontFamily: T.serif, color: T.text, fontWeight: 500 }}>
                No workflows match those filters.
              </h3>
              <p className="text-[13px] mt-2" style={{ color: T.mutedStrong }}>
                Try clearing one to see more.
              </p>
            </div>
          )
        ) : (
          <>
            {/* MOST COPIED */}
            {mostCopied.length > 0 && (
              <>
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="text-[18px]" style={{ fontFamily: T.serif, fontWeight: 500, color: T.text }}>
                    Most copied this week
                  </h3>
                  <span className="text-[12px]" style={{ color: T.mutedStrong }}>
                    See all {totalCount} →
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
                  {mostCopied.map((w, index) => (
                    <motion.div
                      key={w.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut", delay: Math.min(index * 0.06, 0.3) }}
                    >
                      <FeedCard workflow={w} />
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {/* IN YOUR ROLE */}
            {inYourRole.length > 0 && (
              <>
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="text-[18px]" style={{ fontFamily: T.serif, fontWeight: 500, color: T.text }}>
                    By people in your role{" "}
                    <span className="text-[12px]" style={{ fontFamily: T.ui, color: T.mutedStrong }}>
                      · {VIEWER_ROLE}
                    </span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {inYourRole.map((w, index) => (
                    <motion.div
                      key={w.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut", delay: Math.min(index * 0.06, 0.3) }}
                    >
                      <FeedCard workflow={w} />
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
