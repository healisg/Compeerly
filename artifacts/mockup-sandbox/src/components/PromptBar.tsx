import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface PromptBarProps {
  roles: string[];
  onFindWorkflow?: (role: string) => void;
  onStructureMine?: (params: { role: string; description: string }) => void;
  immediate?: boolean;
}

export function PromptBar({ roles, onFindWorkflow, onStructureMine, immediate = false }: PromptBarProps) {
  const [visible, setVisible] = useState(immediate);
  const [dismissed, setDismissed] = useState(false);
  const [selectedRole, setSelectedRole] = useState("all");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (immediate) return;
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, [immediate]);

  if (dismissed) return null;

  const handleFindWorkflow = () => {
    onFindWorkflow?.(selectedRole);
  };

  const handleStructureMine = () => {
    onStructureMine?.({ role: selectedRole, description: description.trim() });
  };

  return (
    <div
      style={{
        transition: "opacity 0.5s ease, transform 0.5s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(2rem)",
        pointerEvents: visible ? "auto" : "none",
      }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4"
    >
      <div
        className="p-4"
        style={{
          background: "#FBF8F4",
          border: "1px solid #E5DBC8",
          borderRadius: 4,
          boxShadow: "0 18px 48px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08)",
          fontFamily: "'Inter', system-ui, sans-serif",
          color: "#3A3A3A",
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5 shrink-0" role="img" aria-label="lightbulb">
            💡
          </span>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium mb-3" style={{ color: "#3A3A3A" }}>
              It looks like you're working on something repetitive.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full sm:w-[200px] h-9 text-sm px-3 outline-none"
                style={{ background: "#fff", border: "1px solid #E5DBC8", borderRadius: 2, color: "#3A3A3A" }}
                aria-label="Your role"
              >
                <option value="all">Your role</option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <input
                className="flex-1 h-9 text-sm px-3 outline-none"
                style={{ background: "#fff", border: "1px solid #E5DBC8", borderRadius: 2, color: "#3A3A3A" }}
                placeholder="Describe a workflow you've used…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleStructureMine();
                }}
              />

              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleFindWorkflow}
                  className="h-9 px-3 text-sm font-medium"
                  style={{
                    background: "#fff",
                    border: "1px solid #E5DBC8",
                    borderRadius: 2,
                    color: "#3A3A3A",
                  }}
                >
                  Find similar
                </button>
                <button
                  type="button"
                  onClick={handleStructureMine}
                  className="h-9 px-3 text-sm font-medium inline-flex items-center gap-1.5"
                  style={{
                    background: "#166534",
                    color: "#FBF8F4",
                    borderRadius: 2,
                    border: "1px solid #166534",
                  }}
                >
                  ✨ Structure with AI
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 transition-colors mt-0.5 rounded-full p-0.5"
            style={{ color: "#8A7F70" }}
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
