import { Link } from "wouter";
import { Workflow } from "@/lib/workflows";
import { ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function WorkflowCard({ workflow }: { workflow: Workflow }) {
  const getToolColor = (tool: string) => {
    if (tool.toLowerCase().includes("claude")) return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    if (tool.toLowerCase().includes("chatgpt")) return "bg-green-100 text-green-800 hover:bg-green-100";
    if (tool.toLowerCase().includes("gemini")) return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  };

  return (
    <Link href={`/workflow/${workflow.id}`} className="block h-full group no-underline">
      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md hover:border-primary/30" data-testid={`card-workflow-${workflow.id}`}>
        <CardHeader className="pb-3 flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 items-center text-xs">
            <Badge variant="secondary" className="font-normal" data-testid="badge-role">{workflow.role}</Badge>
            <Badge variant="secondary" className={`font-medium ${getToolColor(workflow.aiTool)}`} data-testid="badge-ai-tool">{workflow.aiTool}</Badge>
            <Badge variant="outline" className="font-normal text-muted-foreground" data-testid="badge-category">{workflow.category}</Badge>
            <span className="text-muted-foreground text-xs ml-auto font-medium" data-testid="text-time-saved">Saves {workflow.timeSaved}</span>
          </div>
          <h3 className="font-semibold text-[1.1rem] leading-snug group-hover:text-primary transition-colors text-foreground" data-testid="text-title">
            {workflow.title}
          </h3>
        </CardHeader>
        <CardContent className="pb-4 flex-grow">
          <p className="text-sm text-card-foreground line-clamp-3 leading-relaxed" data-testid="text-summary">
            {workflow.summary}
          </p>
        </CardContent>
        <CardFooter className="pt-0 pb-4 border-t border-border/40 mt-auto pt-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5 bg-secondary px-2.5 py-1 rounded-full text-xs font-medium" data-testid="text-worked-count">
            <ThumbsUp className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground">{workflow.workedForMeCount} worked for me</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
