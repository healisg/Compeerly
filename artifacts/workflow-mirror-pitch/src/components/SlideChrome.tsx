interface SlideChromeProps {
  slideNumber: number;
  totalSlides: number;
  inverted?: boolean;
}

export default function SlideChrome({ slideNumber, totalSlides, inverted = false }: SlideChromeProps) {
  const progress = (slideNumber / totalSlides) * 100;
  return (
    <>
      {/* Progress bar */}
      <div className={`absolute top-0 left-0 right-0 h-[0.55vh] ${inverted ? "bg-white/20" : "bg-rule/70"}`}>
        <div
          className={`h-full ${inverted ? "bg-white/70" : "bg-primary"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Header row */}
      <div className={`absolute top-[3.5vh] left-[5.5vw] right-[5.5vw] flex items-center justify-between text-[1.5vw] font-medium uppercase tracking-[0.25em] ${inverted ? "text-white/50" : "text-muted"}`}>
        <span>Workflow Mirror</span>
        <span className="font-body tabular-nums tracking-widest">
          {String(slideNumber).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
        </span>
      </div>
    </>
  );
}
