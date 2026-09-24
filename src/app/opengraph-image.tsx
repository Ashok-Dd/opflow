import { ImageResponse } from "next/og";

export const alt = "OPflow: know when the doctor will see you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Share card for WhatsApp, X, LinkedIn etc. Drawn in the site's own palette.
export default function Image() {
  const people = Array.from({ length: 32 }, (_, i) => i);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b3a2e",
          color: "#f4f1e8",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 34, fontFamily: "sans-serif" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "#f4f1e8",
              color: "#0b3a2e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            OP
          </div>
          OPflow
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1.05 }}>
          <span>Know when the doctor</span>
          <span style={{ color: "#5cc27f", fontStyle: "italic" }}>will see you.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", gap: 44 }}>
            {[0, 1, 2, 3].map((w) => (
              <div key={w} style={{ display: "flex", gap: 10 }}>
                {people.slice(w * 8, w * 8 + 8).map((p) => (
                  <div key={p} style={{ width: 16, height: 26, borderRadius: "8px 8px 2px 2px", background: "#5cc27f" }} />
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#dcece1", fontFamily: "sans-serif" }}>
            Hour-long OPD windows · live token queue · pay online
          </div>
        </div>
      </div>
    ),
    size,
  );
}
