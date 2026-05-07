import { useParams, Link } from "wouter";
import { useWorkflows } from "@/lib/workflows";
import { ArrowLeft, Clock, Activity, ThumbsUp, ExternalLink, Lightbulb, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

export default function DetailPage() {
  const params = useParams();
  const { workflows, incrementWorkedForMe } = useWorkflows();
  
  const workflowId = Number(params.id);
  const workflow = workflows.find((w) => w.id === workflowId);

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

  const getToolUrl = (tool: string) => {
    if (tool.toLowerCase().includes("claude")) return "https://claude.ai";
    if (tool.toLowerCase().includes("chatgpt")) return "https://chat.openai.com";
    if (tool.toLowerCase().includes("gemini")) return "https://gemini.google.com";
    return "#";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium text-sm" data-testid="link-back">
            <ArrowLeft className="w-4 h-4" />
            Back to Mirror
          </Link>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => incrementWorkedForMe(workflow.id)}
              data-testid="button-worked"
            >
              <Check className="w-4 h-4 text-accent" />
              Worked for me ({workflow.workedForMeCount})
            </Button>
            <Button 
              className="gap-2"
              onClick={() => window.open(getToolUrl(workflow.aiTool), "_blank")}
              data-testid="button-try"
            >
              Try in {workflow.aiTool}
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {/* Header Section */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="outline" className="text-xs px-2.5 py-1 font-semibold uppercase tracking-wider text-muted-foreground bg-card" data-testid="badge-role">{workflow.role}</Badge>
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
            
            <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground bg-secondary/50 p-4 rounded-xl inline-flex">
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
        </div>
      </main>
    </div>
  );
}
