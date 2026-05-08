import SlideChrome from "@/components/SlideChrome";
import CompassMark from "@/components/CompassMark";

export default function ThankYouSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative bg-bg">
      <SlideChrome slideNumber={12} totalSlides={12} />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[10vw]">
        <h2 className="font-display italic text-[10vw] leading-[1.0] tracking-tight text-text text-center">
          Thank you.
        </h2>
        <div className="mt-[5vh] h-[2px] w-[8vw] bg-primary" />
        <p className="mt-[4vh] text-[1.8vw] uppercase tracking-[0.35em] text-muted font-semibold text-center">
          Questions welcome
        </p>
      </div>

      <div className="absolute bottom-[5vh] left-[5.5vw] right-[5.5vw] flex items-center justify-center gap-[1.5vw] text-[1.4vw] text-muted/60">
        <CompassMark size="1.6vw" strokeWidth={3} />
        <span className="font-display italic">Compass</span>
        <span>·</span>
        <span className="uppercase tracking-[0.2em]">Chico.ai</span>
      </div>
    </div>
  );
}
