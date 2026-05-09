import { CompassMark } from "@/components/compass-mark";

export default function OgCard() {
  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        background: "#166534",
        color: "#FBF8F4",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
      data-testid="og-card-root"
    >
      <svg
        width="1200"
        height="630"
        viewBox="0 0 1200 630"
        style={{ position: "absolute", inset: 0, opacity: 0.18 }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="og-dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="#FBF8F4" />
          </pattern>
          <linearGradient id="og-fade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#166534" stopOpacity="1" />
            <stop offset="0.55" stopColor="#166534" stopOpacity="0.4" />
            <stop offset="1" stopColor="#166534" stopOpacity="0" />
          </linearGradient>
          <mask id="og-fade-mask">
            <rect x="0" y="0" width="1200" height="630" fill="url(#og-fade)" />
          </mask>
        </defs>
        <rect x="0" y="0" width="1200" height="630" fill="url(#og-dots)" mask="url(#og-fade-mask)" />
      </svg>

      <div
        style={{
          position: "absolute",
          right: -120,
          top: -120,
          width: 520,
          height: 520,
          color: "#FBF8F4",
          opacity: 0.08,
        }}
      >
        <CompassMark size={520} strokeWidth={1.4} />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "72px 80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ color: "#FBF8F4" }}>
            <CompassMark size={56} strokeWidth={2.2} />
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "#FBF8F4",
            }}
          >
            Compass
          </div>
          <div style={{ flex: 1 }} />
          <div
            style={{
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#E5DBC8",
              opacity: 0.78,
            }}
          >
            For Chico.ai
          </div>
        </div>

        <div style={{ maxWidth: 880 }}>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 500,
              fontSize: 92,
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
              color: "#FBF8F4",
            }}
          >
            Making private AI use{" "}
            <span style={{ fontStyle: "italic", fontWeight: 600 }}>visible.</span>
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 26,
              lineHeight: 1.4,
              color: "#E5DBC8",
              maxWidth: 760,
              fontWeight: 400,
            }}
          >
            Peer-led workflow sharing — so the 460 can learn from the 40.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(251, 248, 244, 0.22)",
            paddingTop: 22,
          }}
        >
          <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <Chip>Active users share</Chip>
            <Dot />
            <Chip>Non-adopters discover</Chip>
            <Dot />
            <Chip>Filtered by role</Chip>
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#E5DBC8",
              opacity: 0.7,
            }}
          >
            Portfolio · Gordon Healis
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 16,
        letterSpacing: "0.04em",
        color: "#FBF8F4",
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
}

function Dot() {
  return (
    <div
      style={{
        width: 4,
        height: 4,
        borderRadius: 0,
        background: "#92400E",
        opacity: 0.9,
      }}
    />
  );
}
