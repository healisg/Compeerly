import { Link } from "wouter";
import { Workflow } from "@/lib/workflows";
import { Check, ArrowRight } from "lucide-react";

const TOOL_DOTS: Record<string, string> = {
  claude: "#D97757",
  chatgpt: "#10A37F",
  gemini: "#4285F4",
};

function toolDotColor(tool: string) {
  const key = tool.toLowerCase();
  for (const k of Object.keys(TOOL_DOTS)) {
    if (key.includes(k)) return TOOL_DOTS[k];
  }
  return "#78716c";
}

const AVATAR_PALETTE = [
  { bg: "#FEF3C7", fg: "#92400E", border: "#FDE68A" },
  { bg: "#DCFCE7", fg: "#166534", border: "#BBF7D0" },
  { bg: "#FEE2E2", fg: "#991B1B", border: "#FECACA" },
  { bg: "#DBEAFE", fg: "#1E40AF", border: "#BFDBFE" },
  { bg: "#EDE9FE", fg: "#5B21B6", border: "#DDD6FE" },
];

function avatarStyle(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
}

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const initial = (workflow.author || "?").trim().charAt(0).toUpperCase();
  const av = avatarStyle(workflow.author || workflow.role);

  return (
    <Link href={`/workflow/${workflow.id}`} className="block h-full group no-underline">
      <article
        className="h-full flex flex-col bg-card rounded-2xl p-7 shadow-sm border border-border hover:shadow-md hover:border-primary/30 transition-all relative overflow-hidden"
        data-testid={`card-workflow-${workflow.id}`}
      >
        {/* Byline + tool chip */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-xs border"
              style={{ backgroundColor: av.bg, color: av.fg, borderColor: av.border }}
            >
              {initial}
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-foreground text-sm" data-testid="text-author">
                {workflow.author}
              </p>
              <p className="text-xs text-muted-foreground" data-testid="badge-role">
                {workflow.role}
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 px-2 py-1 uppercase tracking-wider text-[10px] font-semibold text-muted-foreground border border-border rounded"
            data-testid="badge-ai-tool"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: toolDotColor(workflow.aiTool) }}
              aria-hidden
            />
            {workflow.aiTool}
          </div>
        </div>

        {/* Title (serif) */}
        <h3
          className="font-serif font-medium text-[1.6rem] leading-snug text-foreground mb-3 group-hover:text-primary transition-colors"
          data-testid="text-title"
        >
          {workflow.title}
        </h3>

        {/* Meta line */}
        <div
          className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground mb-4 font-medium uppercase tracking-wide"
          data-testid="text-meta"
        >
          <span data-testid="badge-category">{workflow.category}</span>
          <span className="text-border">•</span>
          <span data-testid="text-time-saved">{workflow.timeSaved}</span>
          <span className="text-border">•</span>
          <span>{workflow.frequency}</span>
        </div>

        {/* Summary */}
        <p
          className="text-card-foreground line-clamp-2 leading-relaxed text-sm mb-8"
          data-testid="text-summary"
        >
          {workflow.summary}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-5 border-t border-border/60">
          <div
            className="flex items-center gap-1.5 text-xs font-semibold text-accent"
            data-testid="text-worked-count"
          >
            <Check className="w-3.5 h-3.5" />
            {workflow.workedForMeCount} worked for me
          </div>
          <div className="text-xs font-medium text-muted-foreground group-hover:text-primary flex items-center gap-1 transition-colors">
            Read full workflow
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </article>
    </Link>
  );
}
