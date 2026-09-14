import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
