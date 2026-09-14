import type { NextConfig } from "next";

/**
 * Posts that were consolidated or removed. Each entry is redirected from both
 * its `/notes/` URL and its pre-rewrite `/posts/` one, listed ahead of the
 * generic `/posts/:slug` rule so an old link resolves in a single hop instead
 * of chaining through a slug that no longer exists.
 */
const retiredPosts: Record<string, string> = {
  // Folded into the post it already told readers to go and read instead.
  "i-built-laravel-style-mail-for-nodejs": "/notes/i-got-tired-of-janky-nodemailer-mocks",
  // Framework introductions with nothing first-hand in them. No equivalent
  // article to inherit the link, so they land on the index rather than home.
  "introduction-to-nextjs": "/notes",
  "introduction-to-mdx": "/notes",
};

const nextConfig: NextConfig = {
  // Files in public/ ship `max-age=0, must-revalidate` by default, and Vercel's
  // image optimizer passes that through to the optimized output, so every
  // repeat view revalidated every poster. The images are content-addressed by
  // filename and replaced rather than edited, so a year is safe.
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          { key: "cache-control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      ...Object.entries(retiredPosts).flatMap(([slug, destination]) => [
        { source: `/notes/${slug}`, destination, permanent: true },
        { source: `/posts/${slug}`, destination, permanent: true },
      ]),
      { source: "/posts", destination: "/notes", permanent: true },
      { source: "/posts/:slug", destination: "/notes/:slug", permanent: true },
      // Google drops the fragment, so `/#work` resolved to the homepage and the
      // old index lost its target. `/work` is a real page now.
      { source: "/case-studies", destination: "/work", permanent: true },
      { source: "/case-studies/:slug", destination: "/work/:slug", permanent: true },
      { source: "/resume", destination: "/about", permanent: true },
      { source: "/resume.pdf", destination: "/Pruthvisinh_Rajput.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
