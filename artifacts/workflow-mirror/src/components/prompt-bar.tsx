import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PromptBarProps {
  roles: string[];
  onFindWorkflow: (role: string) => void;
}

export function PromptBar({ roles, onFindWorkflow }: PromptBarProps) {
  const [, setLocation] = useLocation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [selectedRole, setSelectedRole] = useState("all");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (dismissed) return null;

  const handleFindWorkflow = () => {
    onFindWorkflow(selectedRole);
  };

  const handleStructureMine = () => {
    const params = new URLSearchParams();
    if (selectedRole && selectedRole !== "all") params.set("role", selectedRole);
    if (description.trim()) params.set("description", description.trim());
    const query = params.toString();
    setLocation(`/capture${query ? `?${query}` : ""}`);
  };

  return (
    <div
      style={{
        transition: "opacity 0.5s ease, transform 0.5s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(2rem)",
        pointerEvents: visible ? "auto" : "none",
      }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4"
    >
      <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100 p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5 shrink-0" role="img" aria-label="lightbulb">💡</span>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 mb-3">
              It looks like you're working on something repetitive.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-full sm:w-[200px] h-9 text-sm bg-gray-50 border-gray-200">
                  <SelectValue placeholder="Your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any role</SelectItem>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                className="flex-1 h-9 text-sm bg-gray-50 border-gray-200"
                placeholder="e.g. writing a weekly status report"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleStructureMine();
                }}
              />

              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={handleFindWorkflow}
                >
                  Find a workflow
                </Button>
                <Button
                  size="sm"
                  className="h-9 text-sm bg-[#5B1F8A] hover:bg-[#4a1870] text-white"
                  onClick={handleStructureMine}
                >
                  Structure mine
                </Button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-0.5 rounded-full p-0.5 hover:bg-gray-100"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
