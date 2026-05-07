import SlideChrome from "@/components/SlideChrome";

export default function TheBetSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={5} totalSlides={10} />

      <div className="absolute top-[14vh] left-[5.5vw] flex items-baseline gap-[1.2vw]">
        <span className="font-display italic text-[2vw] text-accent">05</span>
        <span className="text-[1.6vw] uppercase tracking-[0.3em] text-muted font-semibold">
          The Bet
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col justify-center pl-[8vw] pr-[12vw]">
        <div className="h-[3px] w-[8vw] bg-accent mb-[5vh]" />
        <h2 className="font-display text-[7vw] leading-[1.02] tracking-tight text-text" style={{ textWrap: "balance" }}>
          AI adoption inside the enterprise
          <span className="text-text/50"> won't be top-down.</span>
        </h2>
        <h2 className="font-display italic text-[7vw] leading-[1.02] tracking-tight text-primary mt-[2vh]" style={{ textWrap: "balance" }}>
          It will be peer-to-peer.
        </h2>
      </div>

      <div className="absolute bottom-[4vh] right-[5.5vw] font-display italic text-[1.6vw] text-muted">
        Make the shadow workflows visible.
      </div>
    </div>
  );
}
