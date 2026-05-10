import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "wouter";
import { useWorkflows } from "@/lib/workflows";
import { PageFooter } from "@/components/page-footer";
import { Workflow } from "@/lib/workflows";
import {
  ArrowLeft,
  Clock,
  Activity,
  ExternalLink,
  Lightbulb,
  Check,
  Copy,
  CheckCheck,
  Zap,
  Paperclip,
  X as XIcon,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function authorAvatarUrl(name: string) {
  const seed = encodeURIComponent(name || "anon");
  return `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=fef3c7,dcfce7,dbeafe,fee2e2,ede9fe&radius=50`;
}

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

function getToolUrl(tool: string, prompt?: string) {
  if (tool.toLowerCase().includes("claude")) {
    const base = "https://claude.ai/new";
    return prompt ? `${base}?q=${encodeURIComponent(prompt)}` : base;
  }
  if (tool.toLowerCase().includes("chatgpt")) return "https://chat.openai.com";
  if (tool.toLowerCase().includes("gemini")) return "https://gemini.google.com";
  return "#";
}

const TEXT_EXTS = new Set([
  "txt", "csv", "tsv", "md", "markdown", "json", "xml", "yml", "yaml", "log", "html", "htm",
]);

const MAX_EMBED_BYTES = 100_000; // 100KB — anything larger gets treated as "re-attach"
const MAX_URL_PROMPT_CHARS = 6000; // safe ceiling for the ?q= URL transport

function isTextLike(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (TEXT_EXTS.has(ext)) return true;
  if (file.type.startsWith("text/")) return true;
  if (file.type === "application/json") return true;
  return false;
}

type Attachment = {
  fileName: string;
  isText: boolean; // true if content is embedded in prompt
  content: string | null;
  oversized?: boolean; // true if it was a text file but too large to embed
};

function buildStarterPrompt(workflow: Workflow, attachments: Record<number, Attachment | null>): string {
  const stepLines = workflow.steps.map((step, i) => `${i + 1}. ${step}`).join("\n");
  const tipSection = workflow.tips ? `\n\nOne thing to keep in mind: ${workflow.tips}` : "";
  const inputs = workflow.fileInputs ?? [];

  let materials = "";

  if (inputs.length === 0) {
    materials = "\n\nI'll share the relevant materials as we go.";
  } else {
    const textBlocks: string[] = [];
    const binaryReminders: string[] = [];
    const missing: string[] = [];

    inputs.forEach((input, i) => {
      const att = attachments[i];
      if (!att) {
        missing.push(input.label.toLowerCase());
      } else if (att.isText && att.content !== null) {
        textBlocks.push(
          `--- BEGIN ${input.label} (${att.fileName}) ---\n${att.content}\n--- END ${input.label} ---`
        );
      } else {
        binaryReminders.push(`${input.label.toLowerCase()} (${att.fileName})`);
      }
    });

    const parts: string[] = [];
    if (textBlocks.length) parts.push(textBlocks.join("\n\n"));
    if (binaryReminders.length) {
      parts.push(`I'll attach the following file(s) once we begin: ${binaryReminders.join(", ")}.`);
    }
    if (missing.length) {
      parts.push(`I'll share the ${missing.join(", ")} once you're ready.`);
    }
    materials = "\n\n" + parts.join("\n\n");
  }

  return `I need your help with: ${workflow.title}

${workflow.summary}

Here's how I'd like to work through this with you:

${stepLines}${tipSection}${materials}

Please let me know when you're ready to start.`;
}

function FileDropZone({
  index,
  label,
  hint,
  attachment,
  onAttach,
  onRemove,
}: {
  index: number;
  label: string;
  hint?: string;
  attachment: Attachment | null;
  onAttach: (index: number, file: File) => void;
  onRemove: (index: number) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onAttach(index, file);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onAttach(index, file);
    e.target.value = "";
  };

  if (attachment) {
    return (
      <div
        className="rounded-lg border border-primary/30 bg-primary/5 p-4 flex items-start justify-between gap-3"
        data-testid={`attachment-card-${index}`}
      >
        <div className="flex items-start gap-3 min-w-0">
          <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate" data-testid={`text-attached-name-${index}`}>
              {attachment.fileName}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {label}
            </p>
            <p className="text-xs mt-1.5 font-medium" style={{ color: attachment.isText ? "#166534" : "#92400E" }}>
              {attachment.isText
                ? "✓ Embedded in prompt — will be sent automatically"
                : attachment.oversized
                  ? "⚠ Too large to embed — re-attach in the AI tool after it opens"
                  : "⚠ Re-attach in the AI tool after it opens (binary file)"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0 p-1 -m-1"
          aria-label={`Remove ${attachment.fileName}`}
          data-testid={`button-remove-attachment-${index}`}
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`rounded-lg border-2 border-dashed p-4 cursor-pointer transition-all ${
        isDragging
          ? "border-primary bg-primary/10"
          : "border-border hover:border-primary/40 hover:bg-secondary/30"
      }`}
      data-testid={`dropzone-${index}`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleSelect}
        data-testid={`input-file-${index}`}
      />
      <div className="flex items-start gap-3">
        <Paperclip className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {label}
          </p>
          {hint && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {hint}
            </p>
          )}
          <p className="text-xs text-muted-foreground/80 mt-1.5">
            Drop a file here or <span className="text-primary font-medium underline">browse</span>
          </p>
          <p className="text-xs text-muted-foreground/55 mt-1">
            Text files (txt, csv, md) embed in the prompt automatically — PDFs and images need re-attaching in the AI tool.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DetailPage() {
  const params = useParams();
  const { workflows, incrementWorkedForMe } = useWorkflows();
  const [copied, setCopied] = useState(false);
  const [attachments, setAttachments] = useState<Record<number, Attachment | null>>({});

  const workflowId = Number(params.id);
  const workflow = workflows.find((w) => w.id === workflowId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setAttachments({});
  }, [workflowId]);

  if (!workflow) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Workflow not found</h1>
          <Link href="/">
            <Button variant="outline" data-testid="button-back-home">Back to Feed</Button>
          </Link>
        </div>
      </div>
    );
  }

  const fileInputs = workflow.fileInputs ?? [];
  const starterPrompt = buildStarterPrompt(workflow, attachments);
  const supportsUrlPrompt = workflow.aiTool.toLowerCase().includes("claude");

  const handleAttach = (index: number, file: File) => {
    if (isTextLike(file) && file.size <= MAX_EMBED_BYTES) {
      const reader = new FileReader();
      reader.onload = () => {
        setAttachments((prev) => ({
          ...prev,
          [index]: {
            fileName: file.name,
            isText: true,
            content: typeof reader.result === "string" ? reader.result : null,
          },
        }));
      };
      reader.readAsText(file);
    } else {
      const oversized = isTextLike(file) && file.size > MAX_EMBED_BYTES;
      setAttachments((prev) => ({
        ...prev,
        [index]: { fileName: file.name, isText: false, content: null, oversized },
      }));
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => ({ ...prev, [index]: null }));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(starterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const promptFitsInUrl =
    supportsUrlPrompt && encodeURIComponent(starterPrompt).length <= MAX_URL_PROMPT_CHARS;

  const handleCopyAndOpen = async () => {
    await navigator.clipboard.writeText(starterPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    // Only embed in URL if it fits; otherwise open blank tool and rely on clipboard paste
    window.open(getToolUrl(workflow.aiTool, promptFitsInUrl ? starterPrompt : undefined), "_blank");
  };

  const hasBinaryAttachment = Object.values(attachments).some((a) => a && !a.isText);
  const hasOversizedAttachment = Object.values(attachments).some((a) => a?.oversized);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <Link href="/feed" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium text-sm shrink-0" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Compass</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button
              variant="outline"
              className="gap-2 px-2.5 sm:px-4"
              onClick={() => incrementWorkedForMe(workflow.id)}
              data-testid="button-worked"
            >
              <Check className="w-4 h-4 text-accent" />
              <span className="hidden sm:inline">Worked for me ({workflow.workedForMeCount})</span>
              <span className="sm:hidden">Worked ({workflow.workedForMeCount})</span>
            </Button>
            <Button
              className="gap-2 px-2.5 sm:px-4"
              onClick={handleCopyAndOpen}
              data-testid="button-try"
            >
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Try in {workflow.aiTool}</span>
              <span className="sm:hidden">Try</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="space-y-12">
          {/* Header Section */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="outline" className="text-xs px-2.5 py-1 font-semibold uppercase tracking-wider text-muted-foreground bg-card" data-testid="badge-category">{workflow.category}</Badge>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground border border-border rounded-md bg-card"
                data-testid="badge-aiTool"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: toolDotColor(workflow.aiTool) }}
                  aria-hidden
                />
                {workflow.aiTool}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground leading-tight tracking-tight" data-testid="text-title">
              {workflow.title}
            </h1>

            {/* Author byline */}
            <div className="flex items-center gap-3 pt-1" data-testid="author-byline">
              <img
                src={authorAvatarUrl(workflow.author)}
                alt={`Avatar for ${workflow.author}`}
                className="w-11 h-11 rounded-full bg-secondary border border-border object-cover"
                data-testid="img-author-avatar"
              />
              <div className="leading-tight">
                <p className="text-sm font-semibold text-foreground" data-testid="text-author-name">
                  {workflow.author}
                </p>
                <p className="text-xs text-muted-foreground" data-testid="badge-role">
                  {workflow.role}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground bg-secondary/50 p-4 rounded-xl">
              <div className="flex items-center gap-2" data-testid="text-timeSaved">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-foreground">Saves {workflow.timeSaved}</span>
              </div>
              <div className="w-px h-4 bg-border"></div>
              <div className="flex items-center gap-2" data-testid="text-frequency">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-foreground">{workflow.frequency}</span>
              </div>
            </div>
          </div>

          <hr className="border-border" />

          {/* Summary */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Why it works</h2>
            <p className="text-lg text-card-foreground leading-relaxed" data-testid="text-summary">
              {workflow.summary}
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-foreground">The Workflow</h2>
            <div className="space-y-4">
              {workflow.steps.map((step, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg border bg-card hover:border-primary/30 transition-colors" data-testid={`step-${index}`}>
                  <div className="w-8 h-8 rounded-full bg-secondary text-primary font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-card-foreground pt-1 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          {workflow.tips && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex gap-4" data-testid="container-tips">
              <div className="mt-1">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-primary">Pro Tip</h3>
                <p className="text-card-foreground leading-relaxed">{workflow.tips}</p>
              </div>
            </div>
          )}

          {/* Starter Prompt — the one-click bridge */}
          <div
            className="rounded-2xl border-2 border-primary/20 overflow-hidden"
            data-testid="container-starter-prompt"
          >
            {/* Header bar */}
            <div className="bg-primary px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-primary-foreground" />
                <span className="text-sm font-semibold text-primary-foreground tracking-wide uppercase">
                  Your starter prompt
                </span>
              </div>
              <span className="text-xs text-primary-foreground/70 font-medium">
                {supportsUrlPrompt
                  ? `Opens pre-filled in ${workflow.aiTool}`
                  : `Copy, then paste into ${workflow.aiTool}`}
              </span>
            </div>

            {/* Prompt body */}
            <div className="bg-card p-6 space-y-5">
              {/* File inputs declared by the workflow author */}
              {fileInputs.length > 0 && (
                <div className="space-y-3" data-testid="container-file-inputs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Inputs this workflow needs
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Optional — fill what you have now
                    </p>
                  </div>
                  <div className="space-y-2.5">
                    {fileInputs.map((input, i) => (
                      <FileDropZone
                        key={i}
                        index={i}
                        label={input.label}
                        hint={input.hint}
                        attachment={attachments[i] ?? null}
                        onAttach={handleAttach}
                        onRemove={handleRemoveAttachment}
                      />
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider pt-1">
                {fileInputs.length > 0
                  ? "Live preview — your prompt updates as you attach files"
                  : "This prompt is ready to use — just fill in your own materials where indicated."}
              </p>
              <pre
                className="text-sm text-card-foreground leading-relaxed whitespace-pre-wrap font-sans bg-background rounded-xl p-5 border border-border select-all cursor-text max-h-[420px] overflow-y-auto"
                data-testid="text-starter-prompt"
              >
                {starterPrompt}
              </pre>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleCopy}
                  data-testid="button-copy-prompt"
                >
                  {copied ? (
                    <>
                      <CheckCheck className="w-4 h-4 text-accent" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy prompt
                    </>
                  )}
                </Button>

                <Button
                  className="gap-2"
                  onClick={handleCopyAndOpen}
                  data-testid="button-open-tool"
                >
                  <Zap className="w-4 h-4" />
                  {promptFitsInUrl
                    ? `Open in ${workflow.aiTool} — prompt ready`
                    : `Copy & open ${workflow.aiTool}`}
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>

              {(!promptFitsInUrl || hasBinaryAttachment || hasOversizedAttachment) && (
                <p className="text-xs text-muted-foreground" data-testid="text-prompt-help">
                  {!supportsUrlPrompt && (
                    <>The prompt will be copied to your clipboard. Paste it when {workflow.aiTool} opens.{" "}</>
                  )}
                  {supportsUrlPrompt && !promptFitsInUrl && (
                    <>The prompt is too long to send via the URL — it'll be copied to your clipboard. Paste it when {workflow.aiTool} opens.{" "}</>
                  )}
                  {(hasBinaryAttachment || hasOversizedAttachment) && (
                    <>Files marked as "re-attach" (binary or large) can't travel through automatically — drag them into {workflow.aiTool} after it opens.</>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <PageFooter />
    </div>
  );
}
