import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type FileInput = {
  label: string;
  hint?: string;
};

export type Workflow = {
  id: number;
  title: string;
  role: string;
  aiTool: string;
  category: string;
  timeSaved: string;
  timeManual: string;
  timeWithAI: string;
  peerCount: number;
  frequency: string;
  summary: string;
  steps: string[];
  tips: string;
  workedForMeCount: number;
  author: string;
  fileInputs?: FileInput[];
};

const seedData: Workflow[] = [
  {
    id: 1,
    author: "Priya N.",
    title: "Drafting quarterly board updates",
    role: "Operations Manager",
    aiTool: "Claude",
    category: "Reporting",
    timeSaved: "~2h 15m",
    timeManual: "~3h",
    timeWithAI: "~45m",
    peerCount: 14,
    frequency: "Quarterly",
    summary: "Used Claude to draft the Q1 board update by feeding in last quarter's report and new numbers. Edited for 20 minutes instead of writing from scratch for 3 hours.",
    steps: [
      "Pasted last quarter's board update into Claude as a voice reference",
      "Added the new quarterly numbers and key highlights",
      "Asked Claude to draft in the same tone and structure",
      "Reviewed and edited the draft — took about 20 minutes",
    ],
    tips: "Use your previous report as a voice reference so Claude matches your writing style, not its own.",
    workedForMeCount: 14,
    fileInputs: [
      { label: "Last quarter's board update", hint: "Used as a voice and structure reference" },
      { label: "New quarterly numbers and highlights", hint: "What needs to go into this update" },
    ],
  },
  {
    id: 2,
    author: "Marcus T.",
    title: "Writing client meeting follow-up emails",
    role: "Account Manager",
    aiTool: "Claude",
    category: "Communication",
    timeSaved: "~45m/day",
    timeManual: "~15m",
    timeWithAI: "~2m",
    peerCount: 18,
    frequency: "Daily",
    summary: "After every client call, I paste my rough notes into Claude and get a structured follow-up email in 2 minutes instead of spending 15 minutes writing each one.",
    steps: [
      "Take rough notes during the client call",
      "Paste notes into Claude with the instruction 'Write a professional follow-up email summarising these points'",
      "Review the draft and adjust tone for the specific client",
      "Send directly from email",
    ],
    tips: "Add the client's name and any specific next steps to the prompt — it makes the email feel personal rather than templated.",
    workedForMeCount: 18,
    fileInputs: [
      { label: "Your rough call notes", hint: "Plain text — bullets are fine" },
    ],
  },
  {
    id: 3,
    author: "Jordan K.",
    title: "Building weekly sales pipeline reports",
    role: "Sales Analyst",
    aiTool: "Claude",
    category: "Reporting",
    timeSaved: "~3h/week",
    timeManual: "~4h",
    timeWithAI: "~1h",
    peerCount: 9,
    frequency: "Weekly",
    summary: "Claude analyses my exported pipeline data and generates the narrative commentary for the weekly sales report, including trend observations I would have missed.",
    steps: [
      "Export pipeline data from CRM as CSV",
      "Upload to Claude with the prompt 'Analyse this sales pipeline data and write the narrative section for our weekly report'",
      "Claude identifies trends, flags risks, and writes commentary",
      "I review, adjust any inaccuracies, and paste into the report template",
    ],
    tips: "Give Claude the previous week's report so it can compare and highlight week-on-week changes automatically.",
    workedForMeCount: 9,
    fileInputs: [
      { label: "Pipeline data export", hint: "CSV from your CRM" },
      { label: "Last week's report (optional)", hint: "Lets Claude compare week-on-week" },
    ],
  },
  {
    id: 4,
    author: "Sana A.",
    title: "Summarising regulatory changes for compliance",
    role: "Compliance Officer",
    aiTool: "Gemini",
    category: "Analysis",
    timeSaved: "~2h/week",
    timeManual: "~4h",
    timeWithAI: "~2h",
    peerCount: 7,
    frequency: "Weekly",
    summary: "Gemini reads through new regulatory bulletins and produces a plain-English summary with action items for the compliance team, cutting my review time in half.",
    steps: [
      "Paste the regulatory bulletin or guidance document into Gemini",
      "Ask it to 'Summarise the key changes in plain English and list any action items for a compliance team'",
      "Review the summary against the original document for accuracy",
      "Distribute to the compliance team with my annotations",
    ],
    tips: "Always verify the specific clause references Gemini cites — it sometimes paraphrases section numbers incorrectly.",
    workedForMeCount: 7,
    fileInputs: [
      { label: "Regulatory bulletin or guidance document", hint: "Text or PDF — text gets embedded, PDF re-attaches in Gemini" },
    ],
  },
  {
    id: 5,
    author: "Devon R.",
    title: "Creating onboarding checklists for new hires",
    role: "HR Business Partner",
    aiTool: "ChatGPT",
    category: "Admin",
    timeSaved: "~1h per new hire",
    timeManual: "~1.5h",
    timeWithAI: "~30m",
    peerCount: 11,
    frequency: "Per new hire",
    summary: "ChatGPT generates a role-specific onboarding checklist based on the department and seniority level, saving me from rebuilding one from scratch every time.",
    steps: [
      "Tell ChatGPT the role title, department, and seniority level of the new hire",
      "Ask it to generate a 30/60/90 day onboarding checklist with department-specific tasks",
      "Review and customise based on the specific team's tools and processes",
      "Share with the hiring manager for sign-off",
    ],
    tips: "Include the team's actual tool stack in the prompt (e.g. 'they use Salesforce, Slack, and Jira') so the checklist includes relevant setup tasks.",
    workedForMeCount: 11,
  },
  {
    id: 6,
    author: "Lena M.",
    title: "Drafting RFP responses from previous submissions",
    role: "Business Development Manager",
    aiTool: "Claude",
    category: "Communication",
    timeSaved: "~4h per RFP",
    timeManual: "~6h",
    timeWithAI: "~2h",
    peerCount: 5,
    frequency: "Per RFP",
    summary: "Claude drafts RFP responses by referencing our previous winning submissions, adapting the content to the new client's requirements while maintaining our proven structure.",
    steps: [
      "Upload 2-3 previous winning RFP responses to Claude",
      "Paste the new RFP requirements and ask Claude to draft responses following our established structure",
      "Claude adapts previous answers to match the new client's specific requirements",
      "I review for accuracy, add client-specific details, and finalise",
    ],
    tips: "Only use winning submissions as references — losing ones will propagate the wrong messaging.",
    workedForMeCount: 5,
    fileInputs: [
      { label: "Previous winning RFP responses", hint: "2-3 documents — text gets embedded, DOCX re-attaches in Claude" },
      { label: "New RFP requirements", hint: "The brief you're responding to" },
    ],
  },
];

type WorkflowContextType = {
  workflows: Workflow[];
  addWorkflow: (
    workflow: Omit<Workflow, "id" | "workedForMeCount" | "author" | "timeManual" | "timeWithAI" | "peerCount"> &
      { author?: string; timeManual?: string; timeWithAI?: string; peerCount?: number }
  ) => void;
  incrementWorkedForMe: (id: number) => void;
};

const STORAGE_KEY = "compass.userWorkflows";

function loadUserWorkflows(): Workflow[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Workflow[];
  } catch {
    return [];
  }
}

function saveUserWorkflows(workflows: Workflow[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workflows));
  } catch {}
}

const seedIds = new Set(seedData.map((w) => w.id));

const WorkflowContext = createContext<WorkflowContextType | null>(null);

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [userWorkflows, setUserWorkflows] = useState<Workflow[]>(() => loadUserWorkflows());

  const workflows = [...userWorkflows, ...seedData];

  const addWorkflow = (
    workflow: Omit<Workflow, "id" | "workedForMeCount" | "author" | "timeManual" | "timeWithAI" | "peerCount"> &
      { author?: string; timeManual?: string; timeWithAI?: string; peerCount?: number }
  ) => {
    const newWorkflow: Workflow = {
      ...workflow,
      author: workflow.author ?? "You",
      timeManual: workflow.timeManual ?? "—",
      timeWithAI: workflow.timeWithAI ?? "—",
      peerCount: workflow.peerCount ?? 1,
      id: Date.now(),
      workedForMeCount: 0,
    };
    setUserWorkflows((prev) => {
      const next = [newWorkflow, ...prev];
      saveUserWorkflows(next);
      return next;
    });
  };

  const incrementWorkedForMe = (id: number) => {
    if (seedIds.has(id)) {
      // seed workflows are read-only; no-op for persistence (count resets on refresh by design)
      return;
    }
    setUserWorkflows((prev) => {
      const next = prev.map((w) =>
        w.id === id ? { ...w, workedForMeCount: w.workedForMeCount + 1 } : w
      );
      saveUserWorkflows(next);
      return next;
    });
  };

  return (
    <WorkflowContext.Provider value={{ workflows, addWorkflow, incrementWorkedForMe }}>
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflows() {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error("useWorkflows must be used within a WorkflowProvider");
  }
  return context;
}
