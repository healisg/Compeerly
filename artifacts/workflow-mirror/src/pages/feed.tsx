import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useWorkflows } from "@/lib/workflows";
import { WorkflowCard } from "@/components/workflow-card";
import { PromptBar } from "@/components/prompt-bar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function FeedPage() {
  const { workflows } = useWorkflows();

  const [roleFilter, setRoleFilter] = useState("all");
  const [aiToolFilter, setAiToolFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const roles = useMemo(() => Array.from(new Set(workflows.map((w) => w.role))).sort(), [workflows]);
  const aiTools = useMemo(() => Array.from(new Set(workflows.map((w) => w.aiTool))).sort(), [workflows]);
  const categories = useMemo(() => Array.from(new Set(workflows.map((w) => w.category))).sort(), [workflows]);

  const filteredWorkflows = useMemo(() => {
    return workflows.filter((w) => {
      const matchRole = roleFilter === "all" || w.role === roleFilter;
      const matchAiTool = aiToolFilter === "all" || w.aiTool === aiToolFilter;
      const matchCategory = categoryFilter === "all" || w.category === categoryFilter;
      return matchRole && matchAiTool && matchCategory;
    });
  }, [workflows, roleFilter, aiToolFilter, categoryFilter]);

  const handleFindWorkflow = (role: string) => {
    setRoleFilter(role);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
              C
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">Workflow Mirror</h1>
          </div>
          <Link href="/capture" className="no-underline">
            <Button data-testid="button-share-workflow" className="gap-2">
              <Plus className="w-4 h-4" />
              Share a workflow
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 pb-32">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[200px]" data-testid="select-role">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={aiToolFilter} onValueChange={setAiToolFilter}>
            <SelectTrigger className="w-[200px]" data-testid="select-ai-tool">
              <SelectValue placeholder="Filter by AI Tool" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All AI Tools</SelectItem>
              {aiTools.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]" data-testid="select-category">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredWorkflows.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkflows.map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-lg border border-dashed border-border" data-testid="empty-state">
            <h3 className="text-lg font-medium text-foreground">No workflows found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </main>

      <PromptBar roles={roles} onFindWorkflow={handleFindWorkflow} />
    </div>
  );
}
