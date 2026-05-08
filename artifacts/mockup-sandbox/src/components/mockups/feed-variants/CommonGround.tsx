import React from "react";
import { Plus, Search, ChevronDown, Sparkles, MessageSquare, ArrowRight, Check } from "lucide-react";
import "./_commonground.css";

const workflows = [
  { id:1, title:"Drafting quarterly board updates", role:"Operations Manager", aiTool:"Claude", category:"Reporting", timeSaved:"~2h 15m", frequency:"Quarterly", summary:"Used Claude to draft the Q1 board update by feeding in last quarter's report and new numbers. Edited for 20 minutes instead of writing from scratch for 3 hours.", workedForMeCount:14, author:"Priya N." },
  { id:2, title:"Writing client meeting follow-up emails", role:"Account Manager", aiTool:"ChatGPT", category:"Communication", timeSaved:"~45m/day", frequency:"Daily", summary:"After every client call, I paste my rough notes into ChatGPT and get a structured follow-up email in 2 minutes instead of spending 15 minutes writing each one.", workedForMeCount:18, author:"Marcus T." },
  { id:3, title:"Building weekly sales pipeline reports", role:"Sales Analyst", aiTool:"Claude", category:"Reporting", timeSaved:"~3h/week", frequency:"Weekly", summary:"Claude analyses my exported pipeline data and generates the narrative commentary for the weekly sales report, including trend observations I would have missed.", workedForMeCount:9, author:"Jordan K." },
  { id:4, title:"Summarising regulatory changes for compliance", role:"Compliance Officer", aiTool:"Gemini", category:"Analysis", timeSaved:"~2h/week", frequency:"Weekly", summary:"Gemini reads through new regulatory bulletins and produces a plain-English summary with action items for the compliance team, cutting my review time in half.", workedForMeCount:7, author:"Sana A." },
  { id:5, title:"Creating onboarding checklists for new hires", role:"HR Business Partner", aiTool:"ChatGPT", category:"Admin", timeSaved:"~1h per new hire", frequency:"Per new hire", summary:"ChatGPT generates a role-specific onboarding checklist based on the department and seniority level, saving me from rebuilding one from scratch every time.", workedForMeCount:11, author:"Devon R." },
  { id:6, title:"Drafting RFP responses from previous submissions", role:"Business Development Manager", aiTool:"Claude", category:"Communication", timeSaved:"~4h per RFP", frequency:"Per RFP", summary:"Claude drafts RFP responses by referencing our previous winning submissions, adapting the content to the new client's requirements while maintaining our proven structure.", workedForMeCount:5, author:"Lena M." },
];

export function CommonGround() {
  return (
    <div className="min-h-screen bg-[#FBF8F4] font-['Plus_Jakarta_Sans'] text-stone-800 pb-32">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#FBF8F4]/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#166534] flex items-center justify-center text-white font-bold shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-stone-900 leading-tight">Compass</h1>
              <p className="text-xs font-medium text-stone-500 uppercase tracking-widest">Chico.ai Internal</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#166534] hover:bg-[#14532b] text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Share a workflow
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Intro */}
        <div className="mb-12 max-w-2xl">
          <h2 className="text-4xl font-extrabold text-stone-900 mb-4 tracking-tight">
            Real workflows from your colleagues.
          </h2>
          <p className="text-lg text-stone-600 leading-relaxed font-medium">
            See how teams across Chico.ai are using AI to save time and work smarter. Try one this week and let them know it helped.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
          <div className="flex-shrink-0 relative">
            <select className="appearance-none bg-white border border-stone-200 text-stone-700 py-2.5 pl-4 pr-10 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#166534]/20 shadow-sm cursor-pointer min-w-[160px]">
              <option>All Roles</option>
              <option>Operations</option>
              <option>Sales</option>
              <option>HR</option>
            </select>
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <div className="flex-shrink-0 relative">
            <select className="appearance-none bg-white border border-stone-200 text-stone-700 py-2.5 pl-4 pr-10 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#166534]/20 shadow-sm cursor-pointer min-w-[160px]">
              <option>All AI Tools</option>
              <option>Claude</option>
              <option>ChatGPT</option>
              <option>Gemini</option>
            </select>
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <div className="flex-shrink-0 relative">
            <select className="appearance-none bg-white border border-stone-200 text-stone-700 py-2.5 pl-4 pr-10 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-[#166534]/20 shadow-sm cursor-pointer min-w-[160px]">
              <option>All Categories</option>
              <option>Reporting</option>
              <option>Communication</option>
              <option>Admin</option>
            </select>
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((wf) => (
            <div key={wf.id} className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-all flex flex-col group cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FBF8F4] border border-stone-200 flex items-center justify-center text-stone-600 font-bold text-sm">
                    {wf.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">{wf.author}</p>
                    <p className="text-xs text-stone-500">{wf.role}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                  wf.aiTool === 'Claude' ? 'bg-orange-100 text-orange-800' :
                  wf.aiTool === 'ChatGPT' ? 'bg-emerald-100 text-emerald-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {wf.aiTool}
                </span>
              </div>

              <h3 className="text-lg font-bold text-stone-900 mb-2 leading-snug group-hover:text-[#166534] transition-colors">
                {wf.title}
              </h3>
              
              <p className="text-sm text-stone-600 mb-6 line-clamp-3 leading-relaxed">
                {wf.summary}
              </p>

              <div className="mt-auto">
                <div className="flex items-center gap-4 text-xs font-medium text-stone-500 mb-4 pb-4 border-b border-stone-100">
                  <span>{wf.category}</span>
                  <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                  <span>Saves {wf.timeSaved}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B45309] bg-amber-50 px-2.5 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                    +{wf.workedForMeCount} worked for me
                  </div>
                  <span className="text-sm font-semibold text-stone-400 group-hover:text-[#166534] flex items-center gap-1 transition-colors">
                    Read <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Prompt Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[720px] px-4 z-50">
        <div className="bg-white rounded-3xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] border border-stone-100 p-2 flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center flex-1 w-full bg-[#FBF8F4] rounded-full px-4 py-2 border border-stone-200 focus-within:ring-2 focus-within:ring-[#166534]/20 focus-within:border-[#166534] transition-all">
            <select className="appearance-none bg-transparent text-stone-600 text-sm font-semibold focus:outline-none pr-8 border-r border-stone-300 relative cursor-pointer mr-3 py-1">
              <option>Your role</option>
              <option>Operations</option>
            </select>
            <input 
              type="text" 
              placeholder="Describe a workflow you've used recently..." 
              className="bg-transparent border-none focus:outline-none text-sm text-stone-800 placeholder:text-stone-400 flex-1 py-1"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto px-2 sm:px-0 pb-2 sm:pb-0">
            <button className="flex-1 sm:flex-none px-4 py-2.5 rounded-full text-sm font-bold text-[#B45309] border border-[#B45309]/30 hover:bg-amber-50 transition-colors">
              Find similar
            </button>
            <button className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-sm font-bold bg-[#166534] text-white hover:bg-[#14532b] transition-colors shadow-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Structure with AI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
