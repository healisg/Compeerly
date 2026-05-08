import SlideChrome from "@/components/SlideChrome";

export default function WhySlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={3} totalSlides={10} />

      <div className="absolute top-[14vh] left-[5.5vw] flex items-baseline gap-[1.2vw]">
        <span className="font-display italic text-[2vw] text-accent">03</span>
        <span className="text-[1.6vw] uppercase tracking-[0.3em] text-muted font-semibold">
          Why · Customer Pain
        </span>
      </div>

      <div className="absolute top-[24vh] left-[5.5vw] right-[5.5vw]">
        <h2 className="font-display text-[5.4vw] leading-[1.05] tracking-tight text-text max-w-[78vw]" style={{ textWrap: "balance" }}>
          What we keep hearing.
        </h2>
      </div>

      <div className="absolute top-[44vh] left-[5.5vw] right-[5.5vw] grid grid-cols-2 gap-x-[5vw] gap-y-[5vh]">
        <div className="border-t-2 border-primary pt-[2.5vh]">
          <div className="font-display italic text-[1.6vw] text-accent mb-[1.2vh]">i.</div>
          <p className="font-display text-[2.2vw] leading-[1.25] text-text" style={{ textWrap: "pretty" }}>
            Most employees don't know what to use AI for in their actual job.
          </p>
        </div>
        <div className="border-t-2 border-primary pt-[2.5vh]">
          <div className="font-display italic text-[1.6vw] text-accent mb-[1.2vh]">ii.</div>
          <p className="font-display text-[2.2vw] leading-[1.25] text-text" style={{ textWrap: "pretty" }}>
            The few who do are saving hours a week — but the knowledge never spreads.
          </p>
        </div>
        <div className="border-t-2 border-primary pt-[2.5vh]">
          <div className="font-display italic text-[1.6vw] text-accent mb-[1.2vh]">iii.</div>
          <p className="font-display text-[2.2vw] leading-[1.25] text-text" style={{ textWrap: "pretty" }}>
            Middle managers are the bottleneck — sceptical, time-poor, never sold on it.
          </p>
        </div>
        <div className="border-t-2 border-primary pt-[2.5vh]">
          <div className="font-display italic text-[1.6vw] text-accent mb-[1.2vh]">iv.</div>
          <p className="font-display text-[2.2vw] leading-[1.25] text-text" style={{ textWrap: "pretty" }}>
            Generic training doesn't land. It's never role-specific enough.
          </p>
        </div>
      </div>
    </div>
  );
}
