import SlideChrome from "@/components/SlideChrome";

export default function TheMetricSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={8} totalSlides={10} />

      <div className="absolute top-[14vh] left-[5.5vw] flex items-baseline gap-[1.2vw]">
        <span className="font-display italic text-[2vw] text-accent">08</span>
        <span className="text-[1.6vw] uppercase tracking-[0.3em] text-muted font-semibold">
          The Metric
        </span>
      </div>

      <div className="absolute top-[26vh] left-[5.5vw] right-[5.5vw]">
        <div className="text-[1.5vw] uppercase tracking-[0.3em] text-accent font-semibold mb-[2vh]">
          North Star
        </div>
        <h2 className="font-display text-[5vw] leading-[1.05] tracking-tight text-text max-w-[80vw]" style={{ textWrap: "balance" }}>
          Workflows adopted, per active user, per month.
        </h2>
      </div>

      <div className="absolute bottom-[12vh] left-[5.5vw] right-[5.5vw] grid grid-cols-2 gap-[5vw] items-end">
        <div>
          <div className="text-[1.5vw] uppercase tracking-[0.3em] text-muted font-semibold mb-[2vh]">
            Why this number
          </div>
          <p className="font-body text-[1.55vw] leading-[1.5] text-text/80">
            It's the only metric that goes up only when someone learned something from a colleague and used it. Page views, posts, and signups don't tell us that.
          </p>
        </div>
        <div className="border-l-2 border-primary pl-[2.5vw]">
          <div className="text-[1.5vw] uppercase tracking-[0.3em] text-accent font-semibold mb-[1.5vh]">
            Pilot target
          </div>
          <div className="font-display text-[8vw] leading-none font-semibold text-primary">
            0.8
          </div>
          <p className="font-body text-[1.55vw] leading-[1.45] text-text/70 mt-[2vh]">
            adoptions per active user per month, by week 6.
          </p>
        </div>
      </div>
    </div>
  );
}
