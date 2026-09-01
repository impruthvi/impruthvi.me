export const SITE = {
  name: "Pruthvisinh Rajput",
  title: "Pruthvisinh Rajput | Laravel & Node.js Engineer",
  description:
    "Laravel & Node.js engineer with 5+ years of experience. Shipped healthcare SaaS to 3,000+ patients. PR merged by Taylor Otwell. $500K+ in processed transactions.",
  url: "https://impruthvi.me",
  ogImage: "/images/og-default.png",
  author: "Pruthvisinh Rajput",
  email: "pruthvirajput97@gmail.com",
  location: "Ahmedabad, Gujarat",
  availability: "Software Engineer at Ricefwtech",
  social: {
    github: "https://github.com/impruthvi",
    linkedin: "https://www.linkedin.com/in/impruthvi/",
    twitter: "https://x.com/impruthvi13",
  },
} as const;

export const NAV_LINKS = [
  { href: "/case-studies", label: "Work" },
  { href: "/posts", label: "Blog" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;

export const HERO_METRICS = [
  {
    value: "5+",
    label: "Years Experience",
    subtext: "Production Laravel apps",
  },
  {
    value: "50,000+",
    label: "Users Served",
    subtext: "Across 10+ applications",
  },
  {
    value: "$500K+",
    label: "Transactions",
    subtext: "Stripe & Razorpay",
  },
  {
    value: "5+",
    label: "Laravel Org PRs",
    subtext: "Across laravel org repos",
  },
] as const;
