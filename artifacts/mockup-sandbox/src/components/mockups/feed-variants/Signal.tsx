import React from "react";
import { Plus, Search, Sparkles, ArrowRight, ThumbsUp, Activity } from "lucide-react";
import "./_signal.css";

const workflows = [
  { id:1, title:"Drafting quarterly board updates", role:"Operations Manager", aiTool:"Claude", category:"Reporting", timeSaved:"~2h 15m", frequency:"Quarterly", summary:"Used Claude to draft the Q1 board update by feeding in last quarter's report and new numbers. Edited for 20 minutes instead of writing from scratch for 3 hours.", workedForMeCount:14, author:"Priya N." },
  { id:2, title:"Writing client meeting follow-up emails", role:"Account Manager", aiTool:"ChatGPT", category:"Communication", timeSaved:"~45m/day", frequency:"Daily", summary:"After every client call, I paste my rough notes into ChatGPT and get a structured follow-up email in 2 minutes instead of spending 15 minutes writing each one.", workedForMeCount:18, author:"Marcus T." },
  { id:3, title:"Building weekly sales pipeline reports", role:"Sales Analyst", aiTool:"Claude", category:"Reporting", timeSaved:"~3h/week", frequency:"Weekly", summary:"Claude analyses my exported pipeline data and generates the narrative commentary for the weekly sales report, including trend observations I would have missed.", workedForMeCount:9, author:"Jordan K." },
  { id:4, title:"Summarising regulatory changes for compliance", role:"Compliance Officer", aiTool:"Gemini", category:"Analysis", timeSaved:"~2h/week", frequency:"Weekly", summary:"Gemini reads through new regulatory bulletins and produces a plain-English summary with action items for the compliance team, cutting my review time in half.", workedForMeCount:7, author:"Sana A." },
  { id:5, title:"Creating onboarding checklists for new hires", role:"HR Business Partner", aiTool:"ChatGPT", category:"Admin", timeSaved:"~1h per new hire", frequency:"Per new hire", summary:"ChatGPT generates a role-specific onboarding checklist based on the department and seniority level, saving me from rebuilding one from scratch every time.", workedForMeCount:11, author:"Devon R." },
  { id:6, title:"Drafting RFP responses from previous submissions", role:"Business Development Manager", aiTool:"Claude", category:"Communication", timeSaved:"~4h per RFP", frequency:"Per RFP", summary:"Claude drafts RFP responses by referencing our previous winning submissions, adapting the content to the new client's requirements while maintaining our proven structure.", workedForMeCount:5, author:"Lena M." },
];

const getToolConfig = (tool: string) => {
  switch (tool) {
    case "Claude": return { color: "#D97757", bg: "rgba(217, 119, 87, 0.1)" };
    case "ChatGPT": return { color: "#10A37F", bg: "rgba(16, 163, 127, 0.1)" };
    case "Gemini": return { color: "#4285F4", bg: "rgba(66, 133, 244, 0.1)" };
    default: return { color: "#888", bg: "rgba(136, 136, 136, 0.1)" };
  }
};

export function Signal() {
  return (
    <div className="signal-theme min-h-screen relative pb-32">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0B0B12]/80 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-[#15151F] border border-white/[0.12] shadow-sm">
              <Activity className="w-3.5 h-3.5 text-[#06B6D4]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['Space_Grotesk'] font-medium tracking-tight text-[15px] text-white/90">
                Compass
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/[0.06] text-white/40 tracking-wide uppercase">
                Chico.ai
              </span>
            </div>
          </div>
          
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] rounded-md text-[13px] font-medium text-white/90 transition-all duration-200 hover:border-white/[0.2]">
            <Plus className="w-3.5 h-3.5 opacity-70" />
            Share a workflow
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-12">
        <div className="max-w-2xl mb-10">
          <h1 className="font-['Space_Grotesk'] text-2xl font-semibold text-white/95 mb-2 tracking-tight">
            Real workflows from your colleagues. Try one this week.
          </h1>
          <p className="text-[15px] text-white/50 leading-relaxed">
            Discover how teams across Chico.ai are using AI to remove friction and focus on high-leverage work.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="select-wrapper">
            <select className="signal-select min-w-[160px]">
              <option value="">Role</option>
              <option value="ops">Operations</option>
              <option value="sales">Sales</option>
            </select>
          </div>
          <div className="select-wrapper">
            <select className="signal-select min-w-[160px]">
              <option value="">AI Tool</option>
              <option value="claude">Claude</option>
              <option value="chatgpt">ChatGPT</option>
            </select>
          </div>
          <div className="select-wrapper">
            <select className="signal-select min-w-[160px]">
              <option value="">Category</option>
              <option value="reporting">Reporting</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {workflows.map((wf) => {
            const toolCfg = getToolConfig(wf.aiTool);
            return (
              <div key={wf.id} className="signal-card p-5 flex flex-col group cursor-pointer relative overflow-hidden">
                {/* Subtle gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/0 to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="flex items-start justify-between gap-4 mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 rounded-[4px] text-[11px] font-medium flex items-center gap-1.5 border border-white/[0.05]" style={{ background: toolCfg.bg, color: toolCfg.color }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: toolCfg.color }} />
                      {wf.aiTool}
                    </div>
                    <span className="text-[11px] font-medium text-white/30 uppercase tracking-wider">{wf.category}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/40">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="mono-nums text-[12px]">{wf.workedForMeCount}</span>
                  </div>
                </div>

                <h3 className="font-['Space_Grotesk'] text-[17px] font-medium text-white/95 leading-snug mb-2 relative z-10">
                  {wf.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-medium text-white/70">
                    {wf.author.charAt(0)}
                  </div>
                  <span className="text-[13px] text-white/60">{wf.author}</span>
                  <span className="text-white/20 text-[10px]">/</span>
                  <span className="text-[13px] text-white/40">{wf.role}</span>
                </div>

                <p className="text-[14px] text-white/50 leading-relaxed mb-6 line-clamp-2 relative z-10">
                  {wf.summary}
                </p>

                <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Saves</span>
                      <span className="mono-nums text-[13px] text-[#06B6D4] font-medium">{wf.timeSaved}</span>
                    </div>
                    <div className="w-px h-6 bg-white/[0.08]" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Freq</span>
                      <span className="text-[13px] text-white/70 font-medium">{wf.frequency}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 text-[13px] font-medium text-[#7C3AED] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-300">
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Floating Prompt Bar */}
      <div className="fixed bottom-0 left-0 w-full p-6 pointer-events-none z-50 flex justify-center">
        <div className="signal-glass pointer-events-auto w-full max-w-[720px] rounded-xl p-2 pl-3 flex items-center gap-3 shadow-2xl shadow-[#0B0B12]/80">
          <div className="select-wrapper shrink-0">
            <select className="appearance-none bg-transparent border-none text-[13px] text-white/70 font-medium cursor-pointer focus:outline-none pr-6">
              <option value="">My Role</option>
              <option value="ops">Operations</option>
            </select>
          </div>
          
          <div className="w-px h-6 bg-white/[0.1] shrink-0" />
          
          <input 
            type="text" 
            placeholder="Describe a workflow you've used recently..." 
            className="flex-1 bg-transparent border-none text-[14px] text-white/90 placeholder:text-white/30 focus:outline-none min-w-0"
          />
          
          <div className="flex items-center gap-2 shrink-0">
            <button className="px-3 py-2 rounded-lg text-[13px] font-medium text-white/60 hover:text-white/90 hover:bg-white/[0.05] transition-colors flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 opacity-70" />
              Find similar
            </button>
            <button className="px-4 py-2 rounded-lg text-[13px] font-medium bg-[#7C3AED] hover:bg-[#6D28D9] text-white transition-colors flex items-center gap-1.5 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              <Sparkles className="w-3.5 h-3.5" />
              Structure with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
