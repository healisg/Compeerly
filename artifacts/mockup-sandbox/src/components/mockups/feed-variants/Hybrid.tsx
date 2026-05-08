import React from "react";
import { Plus, Sparkles, ChevronDown, ArrowRight, Check, Filter } from "lucide-react";

const workflows = [
  { id:1, title:"Drafting quarterly board updates", role:"Operations Manager", aiTool:"Claude", category:"Reporting", timeSaved:"~2h 15m", frequency:"Quarterly", summary:"Used Claude to draft the Q1 board update by feeding in last quarter's report and new numbers. Edited for 20 minutes instead of writing from scratch for 3 hours.", workedForMeCount:14, author:"Priya N." },
  { id:2, title:"Writing client meeting follow-up emails", role:"Account Manager", aiTool:"ChatGPT", category:"Communication", timeSaved:"~45m/day", frequency:"Daily", summary:"After every client call, I paste my rough notes into ChatGPT and get a structured follow-up email in 2 minutes instead of spending 15 minutes writing each one.", workedForMeCount:18, author:"Marcus T." },
  { id:3, title:"Building weekly sales pipeline reports", role:"Sales Analyst", aiTool:"Claude", category:"Reporting", timeSaved:"~3h/week", frequency:"Weekly", summary:"Claude analyses my exported pipeline data and generates the narrative commentary for the weekly sales report, including trend observations I would have missed.", workedForMeCount:9, author:"Jordan K." },
  { id:4, title:"Summarising regulatory changes for compliance", role:"Compliance Officer", aiTool:"Gemini", category:"Analysis", timeSaved:"~2h/week", frequency:"Weekly", summary:"Gemini reads through new regulatory bulletins and produces a plain-English summary with action items for the compliance team, cutting my review time in half.", workedForMeCount:7, author:"Sana A." },
  { id:5, title:"Creating onboarding checklists for new hires", role:"HR Business Partner", aiTool:"ChatGPT", category:"Admin", timeSaved:"~1h per new hire", frequency:"Per new hire", summary:"ChatGPT generates a role-specific onboarding checklist based on the department and seniority level, saving me from rebuilding one from scratch every time.", workedForMeCount:11, author:"Devon R." },
  { id:6, title:"Drafting RFP responses from previous submissions", role:"Business Development Manager", aiTool:"Claude", category:"Communication", timeSaved:"~4h per RFP", frequency:"Per RFP", summary:"Claude drafts RFP responses by referencing our previous winning submissions, adapting the content to the new client's requirements while maintaining our proven structure.", workedForMeCount:5, author:"Lena M." },
];

export function Hybrid() {
  return (
    <div className="min-h-screen bg-[#FBF8F4] font-['Inter'] text-stone-800 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#FBF8F4]/90 backdrop-blur-sm border-b border-stone-200/50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#166534]" />
            <h1 className="text-2xl font-['Playfair_Display'] font-semibold text-stone-900 tracking-tight flex items-baseline gap-3">
              Compass
              <span className="text-xs font-sans font-bold text-stone-500 uppercase tracking-widest">
                Chico.ai Internal
              </span>
            </h1>
          </div>
          <button className="flex items-center gap-2 bg-[#166534] hover:bg-[#14532b] text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm text-sm">
            <Plus className="w-4 h-4" />
            Share a workflow
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-medium text-stone-900 mb-4 tracking-tight leading-tight italic">
            Real workflows from your colleagues.
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed">
            See how teams across Chico.ai are using AI to save time and work smarter. Try one this week and let them know it helped.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-2 border-b border-stone-200/50">
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-400 uppercase tracking-widest mr-2 pb-4">
            <Filter className="w-4 h-4" />
            Filter
          </div>
          <div className="flex gap-3 pb-4">
            <div className="relative">
              <select className="appearance-none bg-white border border-stone-200 text-stone-700 py-2 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#166534]/20 shadow-sm cursor-pointer min-w-[140px]">
                <option>All Roles</option>
                <option>Operations</option>
                <option>Sales</option>
                <option>HR</option>
              </select>
              <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border border-stone-200 text-stone-700 py-2 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#166534]/20 shadow-sm cursor-pointer min-w-[140px]">
                <option>All AI Tools</option>
                <option>Claude</option>
                <option>ChatGPT</option>
                <option>Gemini</option>
              </select>
              <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border border-stone-200 text-stone-700 py-2 pl-4 pr-10 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#166534]/20 shadow-sm cursor-pointer min-w-[140px]">
                <option>All Categories</option>
                <option>Reporting</option>
                <option>Communication</option>
                <option>Admin</option>
              </select>
              <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {workflows.map((wf) => (
            <article key={wf.id} className="bg-white rounded-2xl p-7 shadow-sm border border-stone-200/60 hover:shadow-md transition-all flex flex-col group cursor-pointer relative overflow-hidden">
              
              {/* Header: Byline & AI Tool Chip */}
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 font-semibold text-xs border border-amber-200/50">
                    {wf.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm leading-none mb-1">{wf.author}</p>
                    <p className="text-xs text-stone-500 leading-none">{wf.role}</p>
                  </div>
                </div>
                <div className="px-2 py-1 uppercase tracking-wider text-[10px] font-bold text-stone-500 border border-stone-200 rounded">
                  {wf.aiTool}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-['Playfair_Display'] font-medium text-stone-900 mb-3 leading-snug group-hover:text-[#166534] transition-colors">
                {wf.title}
              </h3>
              
              {/* Meta metrics (tabular/refined) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-4 font-medium font-mono uppercase tracking-tight">
                <span>{wf.category}</span>
                <span className="text-stone-300">•</span>
                <span>{wf.timeSaved}</span>
                <span className="text-stone-300">•</span>
                <span>{wf.frequency}</span>
              </div>

              {/* Summary */}
              <p className="text-stone-600 mb-8 line-clamp-2 leading-relaxed text-sm">
                {wf.summary}
              </p>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between pt-5 border-t border-stone-100">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B45309]">
                  <Check className="w-3.5 h-3.5" />
                  {wf.workedForMeCount} worked for me
                </div>
                <div className="text-sm font-medium text-stone-400 group-hover:text-[#166534] flex items-center gap-1 transition-colors">
                  Read full workflow <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Floating Prompt Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[720px] px-4 z-50">
        <div className="bg-[#FBF8F4] rounded-2xl shadow-xl border border-stone-200 p-2 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center flex-1 w-full bg-white rounded-xl border border-stone-200/80 focus-within:ring-2 focus-within:ring-[#166534]/20 focus-within:border-[#166534] transition-all overflow-hidden h-12">
            <select className="appearance-none bg-transparent text-stone-600 text-sm font-medium focus:outline-none pl-4 pr-8 border-r border-stone-200 relative cursor-pointer py-3 h-full">
              <option>Your role</option>
              <option>Operations</option>
              <option>Sales</option>
            </select>
            <input 
              type="text" 
              placeholder="Describe a workflow you've used recently..." 
              className="bg-transparent border-none focus:outline-none text-sm text-stone-800 placeholder:text-stone-400 flex-1 px-4 h-full"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <button className="flex-1 sm:flex-none px-4 py-3 h-12 rounded-xl text-sm font-semibold text-stone-600 border border-stone-200 hover:bg-stone-50 hover:text-stone-900 transition-colors">
              Find similar
            </button>
            <button className="flex-1 sm:flex-none px-5 py-3 h-12 rounded-xl text-sm font-semibold bg-[#166534] text-white hover:bg-[#14532b] transition-colors shadow-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Structure with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
