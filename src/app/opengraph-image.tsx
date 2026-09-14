import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The site-wide social card. Nested segments that ship their own
 * `opengraph-image` override this one, so it covers the homepage and the
 * static pages that have no artwork of their own.
 *
 * ImageResponse renders with its bundled font rather than the site's Archivo:
 * next/font does not expose a file path to read, and fetching the family at
 * build time would put Google Fonts on the critical path of every build.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          color: "#f2f0ec",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 20, height: 20, borderRadius: 999, background: "#ffc400" }} />
          <div style={{ fontSize: 26, letterSpacing: 2, color: "#8b8a87" }}>
            IMPRUTHVI.ME
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 82, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 38, color: "#c9c7c2", lineHeight: 1.35, maxWidth: 900 }}>
            Laravel &amp; Node.js engineer. Backend systems, SaaS architecture and
            open-source developer tools.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
            fontSize: 24,
            color: "#8b8a87",
            borderTop: "2px solid #26262b",
            paddingTop: 28,
          }}
        >
          <span>Case studies</span>
          <span>Field notes</span>
          <span>Open source</span>
        </div>
      </div>
    ),
    size,
  );
}
