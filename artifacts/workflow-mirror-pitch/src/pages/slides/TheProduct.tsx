import SlideChrome from "@/components/SlideChrome";
import { Camera, Eye, Repeat } from "lucide-react";

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
            <Camera className="w-[2.6vw] h-[2.6vw] text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-[2.6vw] leading-[1.1] text-text mb-[1.5vh]">
            Capture
          </h3>
          <p className="font-body text-[1.55vw] leading-[1.5] text-text/75">
            Record what worked, in 60 seconds. No write-up. No template. Just the prompt and the why.
          </p>
        </div>
        <div className="border-t-2 border-primary pt-[3vh]">
          <div className="w-[5vw] h-[5vw] rounded-full bg-primary/10 flex items-center justify-center mb-[3vh]">
            <Eye className="w-[2.6vw] h-[2.6vw] text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-[2.6vw] leading-[1.1] text-text mb-[1.5vh]">
            Mirror
          </h3>
          <p className="font-body text-[1.55vw] leading-[1.5] text-text/75">
            Browse what colleagues in your role are actually doing. Filtered by team, tool, and frequency.
          </p>
        </div>
        <div className="border-t-2 border-primary pt-[3vh]">
          <div className="w-[5vw] h-[5vw] rounded-full bg-primary/10 flex items-center justify-center mb-[3vh]">
            <Repeat className="w-[2.6vw] h-[2.6vw] text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-[2.6vw] leading-[1.1] text-text mb-[1.5vh]">
            Adopt
          </h3>
          <p className="font-body text-[1.55vw] leading-[1.5] text-text/75">
            Try the workflow yourself in one click. Mark "worked for me" so the next colleague sees the signal.
          </p>
        </div>
      </div>
    </div>
  );
}
