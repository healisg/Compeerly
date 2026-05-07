import SlideChrome from "@/components/SlideChrome";

export default function RoiModelSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={9} totalSlides={10} />

      <div className="absolute top-[14vh] left-[5.5vw] flex items-baseline gap-[1.2vw]">
        <span className="font-display italic text-[2vw] text-accent">09</span>
        <span className="text-[1.6vw] uppercase tracking-[0.3em] text-muted font-semibold">
          ROI Model
        </span>
      </div>

      <div className="absolute top-[24vh] left-[5.5vw] right-[5.5vw]">
        <h2 className="font-display text-[4.6vw] leading-[1.05] tracking-tight text-text" style={{ textWrap: "balance" }}>
          What 0.8 buys, per account.
        </h2>
      </div>

      <div className="absolute top-[44vh] left-[5.5vw] right-[5.5vw]">
        <div className="grid grid-cols-[1fr_auto_auto] items-baseline border-t-2 border-text/80 py-[2.2vh] gap-x-[3vw]">
          <span className="font-body text-[1.5vw] text-text/75">Active users per account</span>
          <span className="font-body text-[1.5vw] text-muted uppercase tracking-widest">baseline</span>
          <span className="font-display text-[2.6vw] text-text font-semibold tabular-nums w-[14vw] text-right">500</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] items-baseline border-t border-rule py-[2.2vh] gap-x-[3vw]">
          <span className="font-body text-[1.5vw] text-text/75">× Workflows adopted / user / month</span>
          <span className="font-body text-[1.5vw] text-muted uppercase tracking-widest">target</span>
          <span className="font-display text-[2.6vw] text-text font-semibold tabular-nums w-[14vw] text-right">0.8</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] items-baseline border-t border-rule py-[2.2vh] gap-x-[3vw]">
          <span className="font-body text-[1.5vw] text-text/75">× Hours saved per workflow</span>
          <span className="font-body text-[1.5vw] text-muted uppercase tracking-widest">avg</span>
          <span className="font-display text-[2.6vw] text-text font-semibold tabular-nums w-[14vw] text-right">1.5 hr</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] items-baseline border-t-2 border-primary py-[2.6vh] gap-x-[3vw]">
          <span className="font-display italic text-[1.9vw] text-text">Hours returned to the business, monthly</span>
          <span className="font-body text-[1.5vw] text-accent uppercase tracking-widest font-semibold">result</span>
          <span className="font-display text-[3.2vw] text-primary font-semibold tabular-nums w-[14vw] text-right">600 hr</span>
        </div>
      </div>

      <div className="absolute bottom-[4vh] left-[5.5vw] right-[5.5vw] flex items-center justify-between text-[1.5vw] text-muted">
        <span className="uppercase tracking-[0.3em]">Per account, per month</span>
        <span className="font-display italic">~$90k loaded labor cost, monthly, per account</span>
      </div>
    </div>
  );
}
