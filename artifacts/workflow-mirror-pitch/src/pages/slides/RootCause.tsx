import SlideChrome from "@/components/SlideChrome";

export default function RootCauseSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={4} totalSlides={10} />

      <div className="absolute top-[14vh] left-[5.5vw] flex items-baseline gap-[1.2vw]">
        <span className="font-display italic text-[2vw] text-accent">04</span>
        <span className="text-[1.6vw] uppercase tracking-[0.3em] text-muted font-semibold">
          Root Cause
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[10vw]">
        <span className="font-display text-[12vw] leading-none text-accent/30 select-none -mb-[6vh]">
          &ldquo;
        </span>
        <p className="font-display italic text-[3.6vw] leading-[1.18] text-text text-center max-w-[78vw]" style={{ textWrap: "balance" }}>
          88% of heavy AI users cited peers as influential in shaping their AI behaviour
          <span className="text-text/55"> — vs 50% of low users.</span>
        </p>
        <div className="mt-[6vh] flex items-center gap-[1.5vw] text-[1.5vw] uppercase tracking-[0.3em] text-muted font-semibold">
          <span className="h-[1px] w-[3vw] bg-rule" />
          Microsoft Research, 2026
        </div>
      </div>
    </div>
  );
}
