import { ImageResponse } from "next/og";

export const alt = "Nesting: websites and apps built for the way your team actually works";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const frame = (pad: number, bg: string, r: number, child?: React.ReactNode) => (
    <div style={{ display: "flex", padding: pad, background: bg, borderRadius: r }}>{child}</div>
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 90px", background: "#fcfafa", color: "#1b1112" }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#d6231e", marginBottom: 28 }}>nesting</div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Websites and apps built for the way your team actually works.
          </div>
        </div>
        {frame(30, "#fdecea", 80, frame(28, "#fad3cf", 60, frame(26, "#ef8f88", 44, frame(60, "#d6231e", 30, <div style={{ width: 60, height: 60, background: "#fff", borderRadius: 16, display: "flex" }} />))))}
      </div>
    ),
    size,
  );
}
