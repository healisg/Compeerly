import SlideChrome from "@/components/SlideChrome";

export default function ThePilotSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={11} totalSlides={11} />
      <div className="absolute top-[14vh] left-[5.5vw] flex items-baseline gap-[1.2vw]">
        <span className="font-display italic text-[2vw] text-accent">11</span>
        <span className="text-[1.6vw] uppercase tracking-[0.3em] text-muted font-semibold">
          The Pilot
        </span>
      </div>
      <div className="absolute top-[23vh] left-[5.5vw] right-[5.5vw]">
        <h2 className="font-display text-[4.6vw] leading-[1.05] tracking-tight text-text" style={{ textWrap: "balance" }}>
          Concierge first. Engineer later.
        </h2>
      </div>
      <div className="absolute top-[40vh] left-[5.5vw] right-[5.5vw] space-y-[1.6vh] mt-[-20px] mb-[0px] ml-[0px] mr-[0px]">
        <div className="flex items-baseline gap-[2vw] border-b border-rule pb-[1.4vh]">
          <span className="font-display text-[3vw] text-primary font-semibold tabular-nums w-[5vw] shrink-0">01</span>
          <p className="font-body text-[1.6vw] leading-[1.4] text-text">
            One client.
          </p>
        </div>
        <div className="flex items-baseline gap-[2vw] border-b border-rule pb-[1.4vh]">
          <span className="font-display text-[3vw] text-primary font-semibold tabular-nums w-[5vw] shrink-0">02</span>
          <p className="font-body text-[1.6vw] leading-[1.4] text-text">
            Interview 10 active users.
          </p>
        </div>
        <div className="flex items-baseline gap-[2vw] border-b border-rule pb-[1.4vh]">
          <span className="font-display text-[3vw] text-primary font-semibold tabular-nums w-[5vw] shrink-0">03</span>
          <p className="font-body text-[1.6vw] leading-[1.4] text-text">
            Manually curate and publish their workflows.
          </p>
        </div>
        <div className="flex items-baseline gap-[2vw] border-b border-rule pb-[1.4vh]">
          <span className="font-display text-[3vw] text-primary font-semibold tabular-nums w-[5vw] shrink-0">04</span>
          <p className="font-body text-[1.6vw] leading-[1.4] text-text">
            Surface them to 50 non-active users in matched roles.
          </p>
        </div>
        <div className="flex items-baseline gap-[2vw]">
          <span className="font-display text-[3vw] text-accent font-semibold tabular-nums w-[5vw] shrink-0">05</span>
          <p className="font-body text-[1.6vw] leading-[1.4] text-text">
            30 days. Measure activation rate.
          </p>
        </div>
      </div>
      <div className="absolute bottom-[4vh] left-[5.5vw] right-[5.5vw] flex items-center gap-[1.5vw] text-[1.5vw] text-muted">
        <span className="h-[1px] w-[3vw] bg-rule" />
        <span className="font-display italic">No engineering lift beyond a new tab in the existing dashboard.</span>
      </div>
    </div>
  );
}
