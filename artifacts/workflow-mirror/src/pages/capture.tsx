import { useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { useWorkflows } from "@/lib/workflows";
import type { FileInput } from "@/lib/workflows";
import { useStructureWorkflow } from "@workspace/api-client-react";
import type { StructuredWorkflow } from "@workspace/api-client-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Clock, Loader2, Paperclip, Plus, Sparkles, X as XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CompassMark } from "@/components/compass-mark";

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
const ICON = 1.5;
const TOOLS = ['Grok', 'DeepSeek', 'Both'];

function PageHeader({ eyebrow = 'CONTRIBUTE · VOL. 1' }: { eyebrow?: string }) {
  return (
    <header className="border-b" style={{ borderColor: T.rule, backgroundColor: T.bg }}>
      <div className="max-w-[1180px] mx-auto px-5 sm:px-10 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <Link href="/feed" className="flex items-center gap-2 text-[13px] shrink-0" style={{ color: T.mutedStrong }}>
            <ArrowLeft className="w-4 h-4" strokeWidth={ICON} />
            <span className="hidden sm:inline">Back to Compass</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <span aria-hidden className="hidden sm:inline" style={{ color: T.rule }}>·</span>
          <div className="text-[11px] font-semibold truncate" style={{ color: T.mutedStrong, letterSpacing: '0.32em' }}>
            {eyebrow}
          </div>
        </div>
        <CompassMark size={28} />
      </div>
    </header>
  );
}

export default function CapturePage() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const prefilledDescription = params.get("prefill") ?? params.get("description") ?? "";

  const { addWorkflow } = useWorkflows();
  const { toast } = useToast();

  const [workflow, setWorkflow] = useState(prefilledDescription);
  const [selectedTool, setSelectedTool] = useState('Grok');
  const [trick, setTrick] = useState('');
  const [freeformMode, setFreeformMode] = useState(false);
  const [freeformText, setFreeformText] = useState('');
  const [structuredData, setStructuredData] = useState<StructuredWorkflow | null>(null);
  const [fileInputs, setFileInputs] = useState<FileInput[]>([]);

  const structureMutation = useStructureWorkflow();

  const canSubmit = freeformMode
    ? freeformText.trim().length > 0
    : workflow.trim().length > 0;

  const buildRawText = () => {
    if (freeformMode) return freeformText.trim();
    const parts: string[] = [];
    if (workflow.trim()) parts.push(workflow.trim());
    if (selectedTool) parts.push(`LLM used: ${selectedTool}`);
    if (trick.trim()) parts.push(`Key tip: ${trick.trim()}`);
    return parts.join('\n\n');
  };

  const handleStructure = () => {
    const rawText = buildRawText();
    if (!rawText) return;
    structureMutation.mutate({ data: { rawText } }, {
      onSuccess: (data) => {
        setStructuredData({
          title: data.title || "",
          role: data.role || "",
          aiTool: data.aiTool || selectedTool || "",
          category: data.category || "",
          timeSaved: data.timeSaved || "",
          frequency: data.frequency || "",
          summary: data.summary || "",
          steps: data.steps || [],
          tips: data.tips || "",
        });
      },
      onError: () => {
        toast({
          title: "Error structuring workflow",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  const handlePublish = () => {
    if (structuredData) {
      const cleanedInputs = fileInputs
        .map((fi) => ({ label: fi.label.trim(), hint: fi.hint?.trim() || undefined }))
        .filter((fi) => fi.label.length > 0);
      addWorkflow({ ...structuredData, fileInputs: cleanedInputs });
      toast({ title: "Workflow published successfully!" });
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: T.bg, color: T.text, fontFamily: T.ui }}>
      <PageHeader />

      <main className="max-w-[1180px] mx-auto px-5 sm:px-10 pt-8 sm:pt-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left — three prompts (or freeform fallback) */}
        <section className="lg:col-span-8">
          <div className="text-[12px] font-semibold mb-4" style={{ color: T.mutedStrong, letterSpacing: '0.32em' }}>
            {freeformMode ? 'SHARE A WORKFLOW' : 'THREE QUESTIONS · 90 SECONDS'}
          </div>
          <h1
            className="leading-[1.08] sm:leading-[1.06] tracking-tight text-[30px] sm:text-[44px]"
            style={{ fontFamily: T.serif, color: T.text }}
          >
            {freeformMode
              ? <>How do you use <em className="italic">LLMs</em> at Chico.ai?</>
              : <>Tell us about one workflow that <em className="italic">actually</em> saves you time.</>
            }
          </h1>
          <p className="mt-4 text-[15.5px] leading-[1.6]" style={{ color: T.text }}>
            {freeformMode
              ? "Paste your prompt, explain your steps, or just brain-dump how you save time with LLMs. We'll structure it into a clean, reusable format."
              : "Three short answers. Compass turns them into a clean entry your colleagues can copy. You review before it's published."
            }
          </p>

          {freeformMode ? (
            <div className="mt-8 space-y-6">
              <div>
                <label htmlFor="freeform-text" className="block text-[11px] font-semibold mb-3" style={{ color: T.mutedStrong, letterSpacing: '0.28em' }}>
                  YOUR WORKFLOW
                </label>
                <textarea
                  id="freeform-text"
                  value={freeformText}
                  onChange={(e) => setFreeformText(e.target.value)}
                  placeholder="E.g. Every Monday I export Salesforce pipeline data, paste it into Compass and ask it to find week-over-week trends..."
                  className="w-full outline-none resize-none text-[15.5px] leading-[1.7] p-6"
                  style={{
                    minHeight: 260,
                    color: T.text,
                    fontFamily: T.ui,
                    backgroundColor: '#fff',
                    border: `1px solid ${T.rule}`,
                    borderRadius: '2px',
                  }}
                  data-testid="textarea-raw-workflow"
                />
              </div>
              <div className="flex items-center justify-between">
                <button onClick={() => setFreeformMode(false)} className="text-[13px] hover:opacity-70 transition-opacity" style={{ color: T.mutedStrong, borderBottom: `1px solid ${T.rule}`, paddingBottom: 2 }}>
                  ← Use the guided prompts instead
                </button>
                <button
                  onClick={handleStructure}
                  disabled={!canSubmit || structureMutation.isPending}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-[14.5px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: T.primary, borderRadius: '2px' }}
                  data-testid="button-structure"
                >
                  {structureMutation.isPending ? (
                    <><Loader2 className="w-4 h-4 animate-spin" strokeWidth={ICON} /> Structuring…</>
                  ) : (
                    <><Sparkles className="w-4 h-4" strokeWidth={ICON} /> Structure with Compass <ArrowRight className="w-4 h-4" strokeWidth={ICON} /></>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              {/* Prompt 01 */}
              <div
                className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-5 items-start py-6"
                style={{ borderTop: `1px solid ${T.rule}`, borderBottom: `1px solid ${T.rule}` }}
              >
                <div className="hidden sm:flex sm:col-span-1 justify-end pt-1">
                  <span className="text-[26px] leading-none" style={{ fontFamily: T.serif, color: workflow.trim() ? T.primary : T.muted }}>
                    <em className="italic">01</em>
                  </span>
                </div>
                <div className="sm:col-span-4 pt-1">
                  <label htmlFor="q-workflow" className="block text-[15px] font-medium" style={{ color: T.text, fontFamily: T.serif }}>
                    <span className="sm:hidden" style={{ fontFamily: T.serif, color: T.primary }}><em className="italic">01.</em> </span>
                    What's the workflow?
                  </label>
                  <div className="text-[12px] mt-1.5 leading-[1.5]" style={{ color: T.mutedStrong }}>
                    A sentence or two. Plain English.
                  </div>
                </div>
                <div className="sm:col-span-7">
                  <input
                    id="q-workflow"
                    type="text"
                    value={workflow}
                    onChange={(e) => setWorkflow(e.target.value)}
                    placeholder="e.g. Drafting weekly pipeline updates for the leadership thread"
                    className="w-full bg-transparent outline-none text-[15px] pb-2 placeholder:opacity-50"
                    style={{
                      color: T.text,
                      borderBottom: `1px solid ${workflow.trim() ? T.primary : T.rule}`,
                      fontFamily: T.ui,
                    }}
                    data-testid="textarea-raw-workflow"
                  />
                </div>
              </div>

              {/* Prompt 02 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-5 items-start py-6" style={{ borderBottom: `1px solid ${T.rule}` }}>
                <div className="hidden sm:flex sm:col-span-1 justify-end pt-1">
                  <span className="text-[26px] leading-none" style={{ fontFamily: T.serif, color: selectedTool ? T.primary : T.muted }}>
                    <em className="italic">02</em>
                  </span>
                </div>
                <div className="sm:col-span-4 pt-1">
                  <div className="text-[15px] font-medium" style={{ color: T.text, fontFamily: T.serif }}>
                    <span className="sm:hidden" style={{ fontFamily: T.serif, color: T.primary }}><em className="italic">02.</em> </span>
                    Which LLM?
                  </div>
                  <div className="text-[12px] mt-1.5 leading-[1.5]" style={{ color: T.mutedStrong }}>
                    Pick one — or both — you can add more on the next step.
                  </div>
                </div>
                <div className="sm:col-span-7">
                  <div className="flex flex-wrap gap-2">
                    {TOOLS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTool(t)}
                        className="text-[12.5px] px-3 py-1.5 transition-colors"
                        style={{
                          border: `1px solid ${selectedTool === t ? T.primary : T.rule}`,
                          color: selectedTool === t ? '#FFFFFF' : T.text,
                          backgroundColor: selectedTool === t ? T.primary : 'transparent',
                          borderRadius: '999px',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Prompt 03 */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-5 items-start py-6" style={{ borderBottom: `1px solid ${T.rule}` }}>
                <div className="hidden sm:flex sm:col-span-1 justify-end pt-1">
                  <span className="text-[26px] leading-none" style={{ fontFamily: T.serif, color: trick.trim() ? T.primary : T.muted }}>
                    <em className="italic">03</em>
                  </span>
                </div>
                <div className="sm:col-span-4 pt-1">
                  <label htmlFor="q-trick" className="block text-[15px] font-medium" style={{ color: T.text, fontFamily: T.serif }}>
                    <span className="sm:hidden" style={{ fontFamily: T.serif, color: T.primary }}><em className="italic">03.</em> </span>
                    What's the trick?
                  </label>
                  <div className="text-[12px] mt-1.5 leading-[1.5]" style={{ color: T.mutedStrong }}>
                    The one thing a colleague needs to know to make it work.
                  </div>
                </div>
                <div className="sm:col-span-7">
                  <textarea
                    id="q-trick"
                    value={trick}
                    onChange={(e) => setTrick(e.target.value)}
                    placeholder="e.g. I always paste the pipeline as CSV first, not from the table view — Compass reads structure better."
                    className="w-full bg-transparent outline-none resize-none text-[14.5px] leading-[1.6] pb-2 placeholder:opacity-50"
                    style={{
                      minHeight: 64,
                      color: T.text,
                      borderBottom: `1px solid ${trick.trim() ? T.primary : T.rule}`,
                      fontFamily: T.ui,
                    }}
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-3 sm:items-center sm:justify-between">
                <div className="flex items-center gap-2.5 text-[12px]" style={{ color: T.mutedStrong }}>
                  <Clock className="w-3.5 h-3.5" strokeWidth={ICON} />
                  Average so far: 1 min 12 sec
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                  <button
                    type="button"
                    onClick={() => setFreeformMode(true)}
                    className="text-[12.5px] hover:opacity-70 transition-opacity"
                    style={{ color: T.mutedStrong, borderBottom: `1px solid ${T.rule}`, paddingBottom: 2 }}
                  >
                    Or paste a finished prompt
                  </button>
                  <button
                    type="button"
                    onClick={handleStructure}
                    disabled={!canSubmit || structureMutation.isPending}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 text-[14.5px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: T.primary, borderRadius: '2px' }}
                    data-testid="button-structure"
                  >
                    {structureMutation.isPending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" strokeWidth={ICON} /> Structuring…</>
                    ) : (
                      <><Sparkles className="w-4 h-4" strokeWidth={ICON} /> Structure with Compass <ArrowRight className="w-4 h-4" strokeWidth={ICON} /></>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Right rail */}
        <aside className="lg:col-span-4 space-y-7 lg:pt-[58px]">
          <div className="p-6" style={{ backgroundColor: T.card, borderRadius: '4px' }}>
            <div className="text-[11px] font-semibold mb-4" style={{ color: T.mutedStrong, letterSpacing: '0.28em' }}>
              JOIN YOUR PEERS
            </div>
            <div className="text-[44px] leading-none" style={{ fontFamily: T.serif, color: T.primary }}>
              <em className="italic">38</em>
            </div>
            <p className="mt-3 text-[13px] leading-[1.55]" style={{ color: T.text }}>
              colleagues at Chico.ai have shared a workflow this quarter. Sara, Marcus and 6 others shared this week.
            </p>
          </div>

          <div>
            <div className="text-[11px] font-semibold mb-4" style={{ color: T.mutedStrong, letterSpacing: '0.28em' }}>
              WHAT HAPPENS NEXT
            </div>
            <ol className="space-y-3 text-[13px]" style={{ color: T.text }}>
              {[
                'Compass structures your three answers into title, steps, and a pro tip.',
                'You review, edit, and add any file inputs.',
                'It appears in the team feed, filtered by role.',
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full text-[11px] font-medium flex items-center justify-center"
                    style={{ backgroundColor: T.bg, color: T.primary, border: `1px solid ${T.primary}` }}
                  >
                    {i + 1}
                  </span>
                  <span className="leading-[1.55]">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="pt-5" style={{ borderTop: `1px solid ${T.rule}` }}>
            <p className="text-[12px] leading-[1.6]" style={{ color: T.mutedStrong }}>
              Visible only to your Chico.ai team. You can edit or remove anytime.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
}
