import SlideChrome from "@/components/SlideChrome";

export default function TheGapSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={2} totalSlides={12} />
      <div className="absolute top-[14vh] left-[5.5vw] flex items-baseline gap-[1.2vw]">
        <span className="font-display italic text-[2vw] text-accent">02</span>
        <span className="text-[1.6vw] uppercase tracking-[0.3em] text-muted font-semibold">
          The Gap
        </span>
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[6vw]">
        <div className="flex items-baseline justify-center gap-[2vw] font-display tracking-tight text-text">
          <span className="text-[18vw] leading-none font-semibold text-primary">50</span>
          <span className="text-[10vw] leading-none text-muted/80 font-light">/</span>
          <span className="text-[18vw] leading-none font-semibold text-text/85">500</span>
        </div>
        <div className="mt-[6vh] h-[2px] w-[10vw] bg-rule" />
        <p className="mt-[4vh] font-display italic text-[2.4vw] text-text/85 max-w-[58vw] text-center leading-[1.3]" style={{ textWrap: "balance" }}>
          In a typical enterprise AI deployment,
          only 10% of licensed users drive most activity.
        </p>
      </div>
      <div className="absolute bottom-[4vh] left-[5.5vw] right-[5.5vw] flex items-end justify-between text-[1.5vw] text-muted">
        <span className="uppercase tracking-[0.3em]">Internal usage data, Q1 2026</span>
        <span className="font-display italic">8% adoption</span>
      </div>
    </div>
  );
}
