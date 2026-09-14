import type { Metadata } from "next";
import { Archivo, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeScript } from "@/components/theme-script";
import { site } from "@/lib/site";
import "./globals.css";

// No `wdth` axis: carrying it made the latin subset 90,104 bytes against
// 34,928 without, and nothing in the codebase varies font width.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Italic only. Every `font-serif` in the codebase is paired with `italic`, so
// the upright face was downloaded on every page and never painted.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
});

// Only the title template, the RSS alternate and the Twitter card live here.
// Canonical and OpenGraph are deliberately absent: a root `openGraph.url` is
// inherited by every page that does not set its own, which had `/notes` and
// `/about` declaring themselves the homepage. Pages build theirs with
// `pageMetadata`, which derives canonical and og:url from one path.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seoTitle,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  twitter: { card: "summary_large_image" },
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Dark is the default; ThemeScript may swap this before paint.
      className={`dark ${archivo.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="bg-ground text-ink flex min-h-full flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
