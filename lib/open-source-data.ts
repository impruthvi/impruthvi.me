export interface OpenSourceItem {
  name: string;
  type: "package" | "contribution";
  description: string;
  url: string;
  docsUrl?: string;
  prUrl?: string;
  websiteUrl?: string;
  badge?: string;
  techStack: string[];
}

export const openSourceData: OpenSourceItem[] = [
  {
    name: "Laravel React Starter Kit: PR #46",
    type: "contribution",
    description:
      "Fixed TypeScript form handling bug in useForm hook, improving API consistency and preventing missing field submissions.",
    url: "https://github.com/laravel/react-starter-kit/pull/46",
    prUrl: "https://github.com/laravel/react-starter-kit/pull/46",
    badge: "Merged by @taylorotwell",
    techStack: ["TypeScript", "React", "Laravel"],
  },
  {
    name: "Mobile-Responsive Drawer: PR #57",
    type: "contribution",
    description:
      "Designed and implemented a responsive drawer component improving mobile navigation UX across Laravel starter kit.",
    url: "https://github.com/laravel/react-starter-kit/pull/57",
    prUrl: "https://github.com/laravel/react-starter-kit/pull/57",
    badge: "Positive review from @tnylea",
    techStack: ["React", "TypeScript", "Laravel"],
  },
  {
    name: "Laravel Boost: 4 PRs",
    type: "contribution",
    description:
      "4 pull requests merged into Laravel Boost, an official Laravel package under the laravel GitHub organisation.",
    url: "https://github.com/laravel/boost/pulls?q=is%3Apr+is%3Aclosed+author%3Aimpruthvi",
    prUrl: "https://github.com/laravel/boost/pulls?q=is%3Apr+is%3Aclosed+author%3Aimpruthvi",
    badge: "4 PRs Merged",
    techStack: ["PHP", "Laravel"],
  },
  {
    name: "@impruthvi/nodemail",
    type: "package",
    description:
      "Laravel-inspired email library for Node.js with full TypeScript support, multi-provider failover (SendGrid, AWS SES, Mailgun, Resend, Postmark), BullMQ queue integration, and template engines.",
    url: "https://github.com/impruthvi/nodemail",
    docsUrl: "https://nodemail.impruthvi.me",
    badge: "300+ weekly downloads",
    techStack: ["TypeScript", "Node.js", "BullMQ"],
  },
  {
    name: "ShipFastLabs / Starter Kit",
    type: "contribution",
    description:
      "Maintaining the ShipFastLabs Laravel starter kit: batteries-included boilerplate for shipping SaaS products fast.",
    url: "https://shipfastlabs.com/",
    websiteUrl: "https://shipfastlabs.com/",
    badge: "Maintainer",
    techStack: ["Laravel", "PHP"],
  },
  {
    name: "ShipFastLabs / parsel",
    type: "contribution",
    description:
      "PHP library that parses PDFs, Office docs, and images locally, extracting plain text, structured data, and coordinates without sending files to an external service.",
    url: "https://github.com/shipfastlabs/parsel",
    badge: "Contributor",
    techStack: ["Laravel", "PHP"],
  },
];
