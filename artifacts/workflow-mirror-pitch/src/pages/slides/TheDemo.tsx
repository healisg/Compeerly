import SlideChrome from "@/components/SlideChrome";

export default function TheDemoSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-primary">
      <SlideChrome slideNumber={8} totalSlides={12} inverted />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[10vw]">
        <div className="text-[1.5vw] uppercase tracking-[0.35em] text-white/50 font-semibold mb-[4vh]">
          08 · The Demo
        </div>
        <h2 className="font-display text-[9vw] leading-[1.0] tracking-tight text-white text-center">
          Let's see it.
        </h2>
        <div className="mt-[5vh] flex items-center gap-[3vw] text-[1.6vw] text-white/60 font-body">
          <span>Workflow Feed</span>
          <span className="text-white/30">—</span>
          <span>Workflow Capture</span>
          <span className="text-white/30">—</span>
          <span>Nudge Strip</span>
        </div>
      </div>
    </div>
  );
}
