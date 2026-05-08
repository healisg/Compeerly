interface CompassMarkProps {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

/**
 * Compass — "Bearing" wordmark icon.
 * A single off-axis needle inside a clean ring. Uses currentColor so the
 * mark inherits whatever text colour its parent sets.
 */
export default function CompassMark({ className, size, strokeWidth = 2.2 }: CompassMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth={strokeWidth} />
      <g transform="rotate(-22 32 32)">
        <path d="M32 9 L40 34 L32 31 L24 34 Z" fill="currentColor" />
        <path d="M32 55 L24 30 L32 33 L40 30 Z" fill="currentColor" fillOpacity="0.22" />
      </g>
    </svg>
  );
}
