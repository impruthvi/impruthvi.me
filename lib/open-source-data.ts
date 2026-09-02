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
  homepage?: {
    repository?: string;
    title?: string;
    number?: number;
    mergedBy?: string;
    description: string;
  };
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
    homepage: {
      repository: "laravel / react-starter-kit",
      title: "Fix TypeScript form handling in useForm",
      number: 46,
      mergedBy: "Taylor Otwell",
      description: "Fixed TypeScript form handling and prevented missing field submissions.",
    },
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
    homepage: {
      description: "Responsive drawer for mobile navigation",
    },
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
    homepage: {
      title: "Laravel Boost",
      description: "Official Laravel package",
    },
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
    homepage: {
      description: "Email tooling for Node.js",
    },
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
    homepage: {
      description: "Maintainer of the production starter kit",
    },
  },
  {
    name: "ShipFastLabs / parsel",
    type: "contribution",
    description:
      "PHP library that parses PDFs, Office docs, and images locally, extracting plain text, structured data, and coordinates without sending files to an external service.",
    url: "https://github.com/shipfastlabs/parsel",
    badge: "Contributor",
    techStack: ["Laravel", "PHP"],
    homepage: {
      description: "Contributor to local document parsing in PHP",
    },
  },
];
