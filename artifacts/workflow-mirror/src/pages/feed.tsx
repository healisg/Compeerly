import { useState, useMemo } from "react";
import { Link } from "wouter";
import { useWorkflows } from "@/lib/workflows";
import { WorkflowCard } from "@/components/workflow-card";
import { PromptBar } from "@/components/prompt-bar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Sparkles, SlidersHorizontal } from "lucide-react";

export default function FeedPage() {
  const { workflows } = useWorkflows();

  const [roleFilter, setRoleFilter] = useState("all");
  const [aiToolFilter, setAiToolFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount = [roleFilter, aiToolFilter, categoryFilter].filter((v) => v !== "all").length;

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
    setFiltersOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="no-underline">
            <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Sparkles className="w-5 h-5 text-primary" />
              <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground flex items-baseline gap-3">
                Workflow Mirror
                <span className="text-[10px] font-sans font-bold text-muted-foreground uppercase tracking-widest">
                  Chico.ai Internal
                </span>
              </h1>
            </div>
          </Link>
          <Link href="/capture" className="no-underline">
            <Button data-testid="button-share-workflow" className="gap-2 rounded-xl px-5 h-10 shadow-sm">
              <Plus className="w-4 h-4" />
              Share a workflow
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-32">
        <div className="max-w-2xl mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-medium italic text-foreground leading-tight tracking-tight mb-4">
            Real workflows from your colleagues.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            See how teams across Chico.ai are using AI to save time and work smarter. Try one this week and let them know it helped.
          </p>
        </div>

        <div className="mb-10 pb-6 border-b border-border/60">
          <Button
            variant="outline"
            className="gap-2 rounded-xl px-4 h-9"
            onClick={() => setFiltersOpen((prev) => !prev)}
            data-testid="button-filter-toggle"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {activeFilterCount > 0 ? `Filter · ${activeFilterCount}` : "Filter"}
          </Button>

          {filtersOpen && (
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
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
          )}
        </div>

        {filteredWorkflows.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
