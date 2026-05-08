import SlideChrome from "@/components/SlideChrome";

export default function RoiModelSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={10} totalSlides={12} />

      <div className="absolute top-[14vh] left-[5.5vw] flex items-baseline gap-[1.2vw]">
        <span className="font-display italic text-[2vw] text-accent">10</span>
        <span className="text-[1.6vw] uppercase tracking-[0.3em] text-muted font-semibold">
          ROI Model
        </span>
      </div>

      <div className="absolute top-[23vh] left-[5.5vw] right-[5.5vw]">
        <h2 className="font-display text-[4.4vw] leading-[1.05] tracking-tight text-text" style={{ textWrap: "balance" }}>
          What it's worth, per enterprise client.
        </h2>
      </div>

      <div className="absolute top-[40vh] left-[5.5vw] right-[5.5vw]">
        <div className="grid grid-cols-[1fr_auto_auto] items-baseline border-t-2 border-text/80 py-[1.6vh] gap-x-[3vw]">
          <span className="font-body text-[1.55vw] text-text/75">Active users</span>
          <span className="font-body text-[1.5vw] text-muted uppercase tracking-widest">baseline</span>
          <span className="font-display text-[2.4vw] text-text font-semibold tabular-nums w-[20vw] text-right">69</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] items-baseline border-t border-rule py-[1.6vh] gap-x-[3vw]">
          <span className="font-body text-[1.55vw] text-text/75">× Hours saved per user, per week</span>
          <span className="font-body text-[1.5vw] text-muted uppercase tracking-widest">avg</span>
          <span className="font-display text-[2.4vw] text-text font-semibold tabular-nums w-[20vw] text-right">2 hr</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] items-baseline border-t border-rule py-[1.6vh] gap-x-[3vw]">
          <span className="font-body text-[1.55vw] text-text/75">× Blended labour rate</span>
          <span className="font-body text-[1.5vw] text-muted uppercase tracking-widest">rate</span>
          <span className="font-display text-[2.4vw] text-text font-semibold tabular-nums w-[20vw] text-right">£50 / hr</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] items-baseline border-t-2 border-primary py-[2vh] gap-x-[3vw]">
          <span className="font-display italic text-[1.85vw] text-text">Value returned, per week</span>
          <span className="font-body text-[1.5vw] text-muted uppercase tracking-widest font-semibold">weekly</span>
          <span className="font-display text-[2.8vw] text-text font-semibold tabular-nums w-[20vw] text-right">£6,900</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_auto] items-baseline border-t-[3px] border-accent py-[2.4vh] gap-x-[3vw] bg-primary/[0.04]">
          <span className="font-display italic text-[2.1vw] text-text pl-[1vw]">Annualised, per enterprise client</span>
          <span className="font-body text-[1.5vw] text-accent uppercase tracking-widest font-semibold">annual</span>
          <span className="font-display text-[3.6vw] text-primary font-semibold tabular-nums w-[20vw] text-right pr-[1vw]">£358,800</span>
        </div>
      </div>

    </div>
  );
}
