import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fff6e5",
          backgroundImage: "radial-gradient(rgba(26,22,48,0.14) 2px, transparent 2.5px)",
          backgroundSize: "26px 26px",
          border: "12px solid #1a1630",
          color: "#1a1630",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, letterSpacing: 6, color: "#4d4868" }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "4px solid #1a1630",
              background: "#ffcf33",
              boxShadow: "5px 5px 0 #1a1630",
              alignItems: "center",
              justifyContent: "center",
              color: "#1a1630",
              fontSize: 22,
              letterSpacing: 0,
              fontWeight: 700,
            }}
          >
            {site.shortName}
          </div>
          {site.name.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3, maxWidth: 980 }}>{site.hero.headline}</div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#4d4868" }}>{site.titles.join("  ·  ")}</div>
        </div>
      </div>
    ),
    size,
  );
}
