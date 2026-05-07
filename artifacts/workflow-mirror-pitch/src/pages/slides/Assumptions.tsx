import SlideChrome from "@/components/SlideChrome";

export default function AssumptionsSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={7} totalSlides={10} />

      <div className="absolute top-[14vh] left-[5.5vw] flex items-baseline gap-[1.2vw]">
        <span className="font-display italic text-[2vw] text-accent">07</span>
        <span className="text-[1.6vw] uppercase tracking-[0.3em] text-muted font-semibold">
          Assumptions
        </span>
      </div>

      <div className="absolute top-[23vh] left-[5.5vw] right-[5.5vw] grid grid-cols-12 gap-x-[3vw]">
        <div className="col-span-7">
          <h2 className="font-display text-[4.4vw] leading-[1.05] tracking-tight text-text mb-[5vh]" style={{ textWrap: "balance" }}>
            What has to be true.
          </h2>

          <div className="space-y-[3vh]">
            <div className="flex items-baseline gap-[1.5vw]">
              <span className="font-display italic text-[1.6vw] text-accent w-[3vw] shrink-0">01</span>
              <p className="font-body text-[1.5vw] leading-[1.45] text-text">
                People will share workflows when asked, without explicit incentive.
              </p>
            </div>
            <div className="flex items-baseline gap-[1.5vw]">
              <span className="font-display italic text-[1.6vw] text-accent w-[3vw] shrink-0">02</span>
              <p className="font-body text-[1.5vw] leading-[1.45] text-text">
                Workflows generalize across people in the same role.
              </p>
            </div>
            <div className="flex items-baseline gap-[1.5vw]">
              <span className="font-display italic text-[1.6vw] text-accent w-[3vw] shrink-0">03</span>
              <p className="font-body text-[1.5vw] leading-[1.45] text-text">
                A colleague's name on a post is enough trust to try it.
              </p>
            </div>
            <div className="flex items-baseline gap-[1.5vw]">
              <span className="font-display italic text-[1.6vw] text-accent w-[3vw] shrink-0">04</span>
              <p className="font-body text-[1.5vw] leading-[1.45] text-text">
                Adoption follows visibility. If they see it, they will try it.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-5 border-l-2 border-accent pl-[2.5vw] flex flex-col justify-center">
          <div className="text-[1.5vw] uppercase tracking-[0.3em] text-accent font-semibold mb-[2vh]">
            Riskiest assumption
          </div>
          <p className="font-display italic text-[2.6vw] leading-[1.2] text-text" style={{ textWrap: "balance" }}>
            That workflows generalize across roles.
          </p>
          <p className="font-body text-[1.55vw] leading-[1.5] text-text/70 mt-[3vh]">
            If they don't, the feed becomes noise. We have to test this in the pilot before anything else.
          </p>
        </div>
      </div>
    </div>
  );
}
