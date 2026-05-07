import { useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { useWorkflows } from "@/lib/workflows";
import { useStructureWorkflow } from "@workspace/api-client-react";
import type { StructuredWorkflow } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function CapturePage() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const prefilledRole = params.get("role") ?? "";
  const prefilledDescription = params.get("description") ?? "";

  const { addWorkflow } = useWorkflows();
  const { toast } = useToast();

  const initialRawText = prefilledRole && prefilledDescription
    ? `I work as a ${prefilledRole}. ${prefilledDescription}`
    : prefilledDescription || prefilledRole ? `I work as a ${prefilledRole}. ` : "";

  const [rawText, setRawText] = useState(initialRawText);
  const [structuredData, setStructuredData] = useState<StructuredWorkflow | null>(null);

  const structureMutation = useStructureWorkflow();

  const handleStructure = () => {
    if (!rawText.trim()) return;
    structureMutation.mutate({ data: { rawText } }, {
      onSuccess: (data) => {
        setStructuredData({
          title: data.title || "",
          role: data.role || "",
          aiTool: data.aiTool || "",
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
      addWorkflow(structuredData);
      toast({ title: "Workflow published successfully!" });
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center gap-4">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-back">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">Share a Workflow</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        {!structuredData ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-foreground">How do you use AI at Chico.ai?</h2>
              <p className="text-muted-foreground">
                Paste your prompt, explain your steps, or just brain dump how you save time with AI. We'll structure it into a clean, reusable format.
              </p>
            </div>
            
            <Textarea 
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="E.g. Every Monday I export Salesforce pipeline data, paste it into Claude and ask it to find week-over-week trends..."
              className="min-h-[250px] text-base leading-relaxed p-4"
              data-testid="textarea-raw-workflow"
            />

            <Button 
              size="lg" 
              onClick={handleStructure} 
              disabled={!rawText.trim() || structureMutation.isPending}
              className="w-full gap-2"
              data-testid="button-structure"
            >
              {structureMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Structuring with Claude...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Structure my workflow
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-foreground">Review & Publish</h2>
              <p className="text-muted-foreground">
                Here's how your workflow will look to the team. Feel free to tweak any details.
              </p>
            </div>

            <Card className="border-border">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" value={structuredData.title} onChange={e => setStructuredData({...structuredData, title: e.target.value})} data-testid="input-title" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" value={structuredData.role} onChange={e => setStructuredData({...structuredData, role: e.target.value})} data-testid="input-role" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="aiTool">AI Tool</Label>
                      <Input id="aiTool" value={structuredData.aiTool} onChange={e => setStructuredData({...structuredData, aiTool: e.target.value})} data-testid="input-aiTool" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" value={structuredData.category} onChange={e => setStructuredData({...structuredData, category: e.target.value})} data-testid="input-category" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timeSaved">Time Saved</Label>
                      <Input id="timeSaved" value={structuredData.timeSaved} onChange={e => setStructuredData({...structuredData, timeSaved: e.target.value})} data-testid="input-timeSaved" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Frequency</Label>
                      <Input id="frequency" value={structuredData.frequency} onChange={e => setStructuredData({...structuredData, frequency: e.target.value})} data-testid="input-frequency" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="summary">Summary</Label>
                    <Textarea id="summary" value={structuredData.summary} onChange={e => setStructuredData({...structuredData, summary: e.target.value})} className="h-20" data-testid="textarea-summary" />
                  </div>

                  <div className="space-y-2">
                    <Label>Steps</Label>
                    {structuredData.steps.map((step: string, idx: number) => (
                      <div key={idx} className="flex gap-2">
                        <div className="w-6 h-10 flex items-center justify-center font-medium text-muted-foreground shrink-0">{idx + 1}.</div>
                        <Input 
                          value={step} 
                          onChange={(e) => {
                            const newSteps = [...structuredData.steps];
                            newSteps[idx] = e.target.value;
                            setStructuredData({...structuredData, steps: newSteps});
                          }} 
                          data-testid={`input-step-${idx}`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tips">Pro Tip</Label>
                    <Input id="tips" value={structuredData.tips} onChange={e => setStructuredData({...structuredData, tips: e.target.value})} data-testid="input-tips" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setStructuredData(null)} data-testid="button-edit-raw">
                Edit Raw Text
              </Button>
              <Button className="flex-1" onClick={handlePublish} data-testid="button-publish">
                Publish to Mirror
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
