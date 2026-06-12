import SlideChrome from "@/components/SlideChrome";
import CompassMark from "@/components/CompassMark";

export default function TitleSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={1} totalSlides={12} />

      <div className="absolute inset-0 flex flex-col justify-center pl-[8vw] pr-[8vw]">
        <div className="text-[1.5vw] uppercase tracking-[0.35em] text-accent font-semibold mb-[3vh]">
          Pitch · 2026
        </div>
        <h1 className="font-display text-[8.5vw] leading-[0.95] tracking-tight text-text flex items-center gap-[2.5vw]">
          <CompassMark size="7vw" strokeWidth={2.4} className="text-primary shrink-0" />
          <span className="italic text-primary">Compeerly</span>
        </h1>
        <div className="mt-[5vh] h-[2px] w-[14vw] bg-primary" />
        <p className="mt-[4vh] font-display italic text-[2.6vw] text-text/80 max-w-[55vw] leading-[1.25]">
          Peer-led AI adoption for the enterprise.
        </p>
      </div>

      <div className="absolute bottom-[4vh] left-[5.5vw] right-[5.5vw] flex items-end justify-between text-[1.5vw] text-muted">
        <span className="uppercase tracking-[0.3em]">A standalone platform</span>
        <span className="font-display italic">Internal panel · 30 min</span>
      </div>
    </div>
  );
}
