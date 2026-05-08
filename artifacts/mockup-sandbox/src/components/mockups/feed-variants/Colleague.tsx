import React from "react";
import { Plus, Search, Sparkles, User, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const workflows = [
  { id:1, title:"Drafting quarterly board updates", role:"Operations Manager", aiTool:"Claude", category:"Reporting", timeSaved:"~2h 15m", frequency:"Quarterly", summary:"Used Claude to draft the Q1 board update by feeding in last quarter's report and new numbers. Edited for 20 minutes instead of writing from scratch for 3 hours.", workedForMeCount:14, author:"Priya N." },
  { id:2, title:"Writing client meeting follow-up emails", role:"Account Manager", aiTool:"ChatGPT", category:"Communication", timeSaved:"~45m/day", frequency:"Daily", summary:"After every client call, I paste my rough notes into ChatGPT and get a structured follow-up email in 2 minutes instead of spending 15 minutes writing each one.", workedForMeCount:18, author:"Marcus T." },
  { id:3, title:"Building weekly sales pipeline reports", role:"Sales Analyst", aiTool:"Claude", category:"Reporting", timeSaved:"~3h/week", frequency:"Weekly", summary:"Claude analyses my exported pipeline data and generates the narrative commentary for the weekly sales report, including trend observations I would have missed.", workedForMeCount:9, author:"Jordan K." },
  { id:4, title:"Summarising regulatory changes for compliance", role:"Compliance Officer", aiTool:"Gemini", category:"Analysis", timeSaved:"~2h/week", frequency:"Weekly", summary:"Gemini reads through new regulatory bulletins and produces a plain-English summary with action items for the compliance team, cutting my review time in half.", workedForMeCount:7, author:"Sana A." },
  { id:5, title:"Creating onboarding checklists for new hires", role:"HR Business Partner", aiTool:"ChatGPT", category:"Admin", timeSaved:"~1h per new hire", frequency:"Per new hire", summary:"ChatGPT generates a role-specific onboarding checklist based on the department and seniority level, saving me from rebuilding one from scratch every time.", workedForMeCount:11, author:"Devon R." },
  { id:6, title:"Drafting RFP responses from previous submissions", role:"Business Development Manager", aiTool:"Claude", category:"Communication", timeSaved:"~4h per RFP", frequency:"Per RFP", summary:"Claude drafts RFP responses by referencing our previous winning submissions, adapting the content to the new client's requirements while maintaining our proven structure.", workedForMeCount:5, author:"Lena M." },
];

export function Colleague() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1D3557] font-['IBM_Plex_Sans'] selection:bg-[#E07A5F] selection:text-white pb-32">
      {/* Header */}
      <header className="border-b border-[#1D3557]/10 bg-[#FAFAF8] sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="text-2xl font-['Playfair_Display'] font-semibold italic tracking-tight text-[#1D3557]">
              Compass
            </h1>
            <span className="text-sm font-medium text-[#1D3557]/60 tracking-wide uppercase">
              Chico.ai Internal
            </span>
          </div>
          <Button className="bg-[#E07A5F] hover:bg-[#c8664d] text-white font-medium rounded-sm px-6 h-10 gap-2 border-none shadow-none">
            <Plus className="w-4 h-4" />
            Share a workflow
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 pt-16">
        {/* Intro */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-medium leading-tight mb-4 text-[#1D3557]">
            Real workflows from your colleagues. Try one this week.
          </h2>
          <p className="text-lg text-[#1D3557]/70 leading-relaxed max-w-xl">
            Discover how teams across Chico.ai are using AI to skip the busywork and get back to what matters.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12 py-6 border-y border-[#1D3557]/10">
          <div className="flex items-center gap-2 text-sm font-medium text-[#1D3557]/50 uppercase tracking-widest mr-2">
            <Filter className="w-4 h-4" />
            Filter by
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-transparent border-[#1D3557]/20 text-[#1D3557] h-10 rounded-sm focus:ring-[#E07A5F]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="ops">Operations</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-transparent border-[#1D3557]/20 text-[#1D3557] h-10 rounded-sm focus:ring-[#E07A5F]">
              <SelectValue placeholder="AI Tool" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tools</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
              <SelectItem value="chatgpt">ChatGPT</SelectItem>
              <SelectItem value="gemini">Gemini</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] bg-transparent border-[#1D3557]/20 text-[#1D3557] h-10 rounded-sm focus:ring-[#E07A5F]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="reporting">Reporting</SelectItem>
              <SelectItem value="communication">Communication</SelectItem>
              <SelectItem value="analysis">Analysis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {workflows.map((workflow) => (
            <article key={workflow.id} className="group flex flex-col cursor-pointer">
              {/* Byline */}
              <div className="flex items-center justify-between mb-4 border-b border-[#1D3557]/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#1D3557]/5 flex items-center justify-center text-[#1D3557] text-xs font-medium">
                    {workflow.author.charAt(0)}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-[#1D3557]">{workflow.author}</span>
                    <span className="text-[#1D3557]/50 mx-1.5">•</span>
                    <span className="text-[#1D3557]/70">{workflow.role}</span>
                  </div>
                </div>
              </div>

              {/* Title & Tool */}
              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="text-2xl font-['Playfair_Display'] font-medium leading-snug group-hover:text-[#E07A5F] transition-colors">
                  {workflow.title}
                </h3>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#1D3557]/60 mb-4 font-medium tracking-wide">
                <span className="bg-[#B5C9B7]/30 text-[#1D3557] px-2.5 py-1 rounded-sm">
                  {workflow.aiTool}
                </span>
                <span>{workflow.category}</span>
                <span>•</span>
                <span>Saves {workflow.timeSaved} {workflow.frequency.toLowerCase()}</span>
              </div>

              {/* Summary */}
              <p className="text-[#1D3557]/80 leading-relaxed mb-6 flex-grow">
                {workflow.summary}
              </p>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1D3557]/10">
                <div className="text-sm font-medium text-[#1D3557]/60">
                  <span className="text-[#1D3557] font-semibold">{workflow.workedForMeCount}</span> colleagues use this
                </div>
                <div className="text-sm font-semibold text-[#E07A5F] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read full <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Prompt Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[720px] px-4 z-40">
        <div className="bg-[#FAFAF8] rounded-sm shadow-[0_12px_40px_-12px_rgba(29,53,87,0.2)] border border-[#1D3557]/10 p-2 pl-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] border-none bg-transparent shadow-none text-sm font-medium focus:ring-0 text-[#1D3557] p-0 h-auto">
                <SelectValue placeholder="Your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any role</SelectItem>
                <SelectItem value="ops">Operations</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="hr">HR</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-px h-6 bg-[#1D3557]/10 hidden sm:block"></div>
          </div>
          
          <Input 
            className="flex-1 border-none shadow-none bg-transparent text-[#1D3557] placeholder:text-[#1D3557]/40 focus-visible:ring-0 px-0 h-10" 
            placeholder="Describe a workflow you've used recently…"
          />
          
          <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
            <Button variant="outline" className="flex-1 sm:flex-none border-[#B5C9B7] text-[#1D3557] hover:bg-[#B5C9B7]/20 rounded-sm h-10 px-4">
              Find similar
            </Button>
            <Button className="flex-1 sm:flex-none bg-[#E07A5F] hover:bg-[#c8664d] text-white rounded-sm h-10 px-5 shadow-none border-none">
              <Sparkles className="w-4 h-4 mr-2" />
              Structure with AI
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
