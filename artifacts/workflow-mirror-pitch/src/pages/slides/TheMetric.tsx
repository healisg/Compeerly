import SlideChrome from "@/components/SlideChrome";

export default function TheMetricSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={9} totalSlides={12} />
      <div className="absolute top-[14vh] left-[5.5vw] flex items-baseline gap-[1.2vw]">
        <span className="font-display italic text-[2vw] text-accent">09</span>
        <span className="text-[1.6vw] uppercase tracking-[0.3em] text-muted font-semibold">The North Star
</span>
      </div>
      <div className="absolute top-[26vh] left-[5.5vw] right-[5.5vw]">
        <div className="text-[1.5vw] uppercase tracking-[0.3em] text-accent font-semibold mb-[2vh]">
          One metric
        </div>
        <h2 className="font-display text-[4.6vw] leading-[1.05] tracking-tight text-text max-w-[82vw]" style={{ textWrap: "balance" }}>
          Activation rate among non-active users exposed to peer workflows.
        </h2>
      </div>
      <div className="absolute bottom-[12vh] left-[5.5vw] right-[5.5vw] grid grid-cols-2 gap-[5vw] items-end">
        <div>
          <div className="text-[1.5vw] uppercase tracking-[0.3em] text-muted font-semibold mb-[2vh]">
            How we count it
          </div>
          <p className="font-body text-[1.55vw] leading-[1.5] text-text/80">
            Activation = <span className="text-text font-semibold">2 or more AI tool uses</span> in a 7-day window after viewing a peer workflow.
          </p>
        </div>
        <div className="border-l-2 border-primary pl-[2.5vw]">
          <div className="text-[1.5vw] uppercase tracking-[0.3em] text-accent font-semibold mb-[1.5vh]">
            Target
          </div>
          <div className="font-display text-[8vw] leading-none font-semibold text-primary">
            15%
          </div>
          <p className="font-body text-[1.55vw] leading-[1.45] text-text/70 mt-[2vh]">
            of exposed non-active users activated within 30 days.
          </p>
        </div>
      </div>
    </div>
  );
}
