import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getPost, getPosts } from "@/lib/content";
import { site } from "@/lib/site";

export const alt = "Field note";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

/** The poster, letterboxed onto the brand background so the 16:9 artwork keeps
    its proportions inside a 1.91:1 card. Posts whose poster is a WebP fall back
    to the title card: the image renderer decodes PNG and JPEG only. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);

  let poster: string | undefined;
  const embeddable = post?.image?.match(/\.(png|jpe?g)$/i);
  if (post?.image && embeddable) {
    const file = await readFile(path.join(process.cwd(), "public", post.image));
    const mime = embeddable[1].toLowerCase() === "png" ? "image/png" : "image/jpeg";
    poster = `data:${mime};base64,${file.toString("base64")}`;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0b0b0c",
          color: "#f2f0ec",
        }}
      >
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            width={1200}
            height={512}
            style={{ width: 1200, height: 512, objectFit: "contain" }}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              padding: "0 80px",
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.1,
            }}
          >
            {post?.title ?? "Field notes"}
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #26262b",
            padding: "0 80px",
            // Fixed, so the fallback title block takes the remaining space
            // instead of splitting the card in half with the footer.
            height: 118,
            fontSize: 26,
            color: "#8b8a87",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 16, height: 16, borderRadius: 999, background: "#ffc400" }} />
            <span>{site.name}</span>
          </div>
          <span>{post?.publishedAt ?? ""}</span>
        </div>
      </div>
    ),
    size,
  );
}
