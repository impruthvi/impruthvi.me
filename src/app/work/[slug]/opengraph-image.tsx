import { ImageResponse } from "next/og";
import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { site } from "@/lib/site";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }));
}

/** Case studies have no artwork, so the card is typographic: the title, the
    tagline, and the headline metric that already leads the page. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug);
  const metric = study?.metrics[0];

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
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 26, color: "#8b8a87" }}>
          <div style={{ width: 16, height: 16, borderRadius: 999, background: "#ffc400" }} />
          <span>CASE STUDY</span>
          {study?.category ? <span>/ {study.category}</span> : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {study?.title ?? "Case study"}
          </div>
          <div style={{ fontSize: 32, color: "#c9c7c2", lineHeight: 1.35, maxWidth: 940 }}>
            {study?.tagline ?? ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: "2px solid #26262b",
            paddingTop: 28,
          }}
        >
          {metric ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ fontSize: 52, fontWeight: 700, color: "#ffc400", letterSpacing: -1 }}>
                {metric.value}
              </span>
              <span style={{ fontSize: 24, color: "#8b8a87" }}>{metric.label}</span>
            </div>
          ) : (
            <span />
          )}
          <span style={{ fontSize: 26, color: "#8b8a87" }}>{site.name}</span>
        </div>
      </div>
    ),
    size,
  );
}
