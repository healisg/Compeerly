import SlideChrome from "@/components/SlideChrome";
import { List, Mic, Zap } from "lucide-react";

export default function TheProductSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={6} totalSlides={10} />

      <div className="absolute top-[14vh] left-[5.5vw] flex items-baseline gap-[1.2vw]">
        <span className="font-display italic text-[2vw] text-accent">06</span>
        <span className="text-[1.6vw] uppercase tracking-[0.3em] text-muted font-semibold">
          The Product
        </span>
      </div>

      <div className="absolute top-[24vh] left-[5.5vw] right-[5.5vw]">
        <h2 className="font-display text-[5.2vw] leading-[1.05] tracking-tight text-text max-w-[70vw]" style={{ textWrap: "balance" }}>
          Three components. One loop.
        </h2>
      </div>

      <div className="absolute top-[46vh] left-[5.5vw] right-[5.5vw] grid grid-cols-3 gap-x-[3.5vw]">
        <div className="border-t-2 border-primary pt-[3vh]">
          <div className="w-[5vw] h-[5vw] rounded-full bg-primary/10 flex items-center justify-center mb-[3vh]">
            <List className="w-[2.6vw] h-[2.6vw] text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-[2.6vw] leading-[1.1] text-text mb-[1.5vh]">
            Workflow Feed
          </h3>
          <p className="font-body text-[1.55vw] leading-[1.5] text-text/75">
            A role-filtered library of peer-submitted AI workflows. See what people who do your job are actually doing.
          </p>
        </div>
        <div className="border-t-2 border-primary pt-[3vh]">
          <div className="w-[5vw] h-[5vw] rounded-full bg-primary/10 flex items-center justify-center mb-[3vh]">
            <Mic className="w-[2.6vw] h-[2.6vw] text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-[2.6vw] leading-[1.1] text-text mb-[1.5vh]">
            Workflow Capture
          </h3>
          <p className="font-body text-[1.55vw] leading-[1.5] text-text/75">
            90 seconds of natural language. Claude structures the rest into a shareable workflow with prompts, tools, and context.
          </p>
        </div>
        <div className="border-t-2 border-primary pt-[3vh]">
          <div className="w-[5vw] h-[5vw] rounded-full bg-primary/10 flex items-center justify-center mb-[3vh]">
            <Zap className="w-[2.6vw] h-[2.6vw] text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-[2.6vw] leading-[1.1] text-text mb-[1.5vh]">
            Nudge Bar
          </h3>
          <p className="font-body text-[1.55vw] leading-[1.5] text-text/75">
            A floating prompt that surfaces relevant peer workflows mid-session, exactly when a colleague's pattern would help.
          </p>
        </div>
      </div>
    </div>
  );
}
