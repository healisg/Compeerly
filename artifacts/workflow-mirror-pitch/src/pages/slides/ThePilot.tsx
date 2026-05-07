import SlideChrome from "@/components/SlideChrome";

export default function ThePilotSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={10} totalSlides={10} />

      <div className="absolute top-[14vh] left-[5.5vw] flex items-baseline gap-[1.2vw]">
        <span className="font-display italic text-[2vw] text-accent">10</span>
        <span className="text-[1.6vw] uppercase tracking-[0.3em] text-muted font-semibold">
          The Pilot
        </span>
      </div>

      <div className="absolute top-[23vh] left-[5.5vw] right-[5.5vw]">
        <h2 className="font-display text-[4.6vw] leading-[1.05] tracking-tight text-text" style={{ textWrap: "balance" }}>
          Six weeks. Three accounts. One question.
        </h2>
      </div>

      <div className="absolute top-[42vh] left-[5.5vw] right-[5.5vw] space-y-[2.6vh]">
        <div className="flex items-baseline gap-[2vw] border-b border-rule pb-[2vh]">
          <span className="font-display text-[3vw] text-primary font-semibold tabular-nums w-[5vw] shrink-0">01</span>
          <p className="font-body text-[1.6vw] leading-[1.4] text-text">
            Recruit 50 power users across three customer accounts.
          </p>
        </div>
        <div className="flex items-baseline gap-[2vw] border-b border-rule pb-[2vh]">
          <span className="font-display text-[3vw] text-primary font-semibold tabular-nums w-[5vw] shrink-0">02</span>
          <p className="font-body text-[1.6vw] leading-[1.4] text-text">
            Seed each account with five starter workflows from the design partners.
          </p>
        </div>
        <div className="flex items-baseline gap-[2vw] border-b border-rule pb-[2vh]">
          <span className="font-display text-[3vw] text-primary font-semibold tabular-nums w-[5vw] shrink-0">03</span>
          <p className="font-body text-[1.6vw] leading-[1.4] text-text">
            Run for six weeks with weekly check-ins, no incentives.
          </p>
        </div>
        <div className="flex items-baseline gap-[2vw] border-b border-rule pb-[2vh]">
          <span className="font-display text-[3vw] text-primary font-semibold tabular-nums w-[5vw] shrink-0">04</span>
          <p className="font-body text-[1.6vw] leading-[1.4] text-text">
            Measure adoption rate, "worked for me" rate, and qualitative trust.
          </p>
        </div>
        <div className="flex items-baseline gap-[2vw]">
          <span className="font-display text-[3vw] text-accent font-semibold tabular-nums w-[5vw] shrink-0">05</span>
          <p className="font-body text-[1.6vw] leading-[1.4] text-text">
            Decide go / no-go on broad rollout. One number gates the call: 0.8.
          </p>
        </div>
      </div>
    </div>
  );
}
