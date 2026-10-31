import { ImageResponse } from "next/og";

/**
 * The share card for a guide page (what WhatsApp, X and LinkedIn show for the link): the guide's title set
 * like a printed OPD slip, in the site's palette. The home page has its own card in app/opengraph-image.tsx.
 */
export function guideCard({ kicker, title }: { kicker: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#1f7a5c",
          padding: 56,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#f4f1e8",
            color: "#17221d",
            padding: "52px 64px",
            borderRadius: 6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "sans-serif" }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 10,
                background: "#1f7a5c",
                color: "#f4f1e8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              OP
            </div>
            <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>OPflow</div>
            <div
              style={{
                display: "flex",
                marginLeft: "auto",
                fontSize: 22,
                letterSpacing: 4,
                color: "#4b574f",
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              {kicker}
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 70, lineHeight: 1.08, letterSpacing: -1 }}>{title}</div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "2px dashed #4b574f",
              paddingTop: 22,
              fontSize: 26,
              color: "#4b574f",
              fontFamily: "sans-serif",
            }}
          >
            <div style={{ display: "flex" }}>Know when the doctor will see you.</div>
            <div style={{ display: "flex" }}>opflow.in</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
