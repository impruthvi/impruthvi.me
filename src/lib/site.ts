export const site = {
  name: "Pruthvisinh Rajput",
  role: "Software Developer",
  // The www host is canonical. Vercel 301s the apex, the vercel.app domains and
  // http to it, so anything this constant feeds — canonicals, og:url, sitemap,
  // robots, RSS — has to be www or it advertises a redirect.
  url: "https://www.impruthvi.me",
  /** Search-facing positioning. More specific than `role`, which is the label
      printed on the page, because a title tag has to carry the technology. */
  seoTitle: "Pruthvisinh Rajput | Laravel & Node.js Engineer",
  location: "Ahmedabad, IN",
  timezone: "UTC+5:30",
  email: "pruthvirajput97@gmail.com",
  description:
    "Software developer building Laravel, Node.js and React applications, from healthcare and property platforms to open-source developer tools.",
  availability: "Software Engineer at Ricefwtech",
  socials: [
    { label: "GitHub", href: "https://github.com/impruthvi" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/impruthvi" },
    { label: "Resume (PDF)", href: "/Pruthvisinh_Rajput.pdf" },
  ],
  nav: [
    { label: "Work", href: "/" },
    { label: "Notes", href: "/notes" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
