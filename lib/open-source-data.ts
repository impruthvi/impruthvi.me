export interface OpenSourceItem {
  name: string;
  type: "package" | "contribution";
  description: string;
  url: string;
  docsUrl?: string;
  prUrl?: string;
  badge?: string;
  techStack: string[];
}

export const openSourceData: OpenSourceItem[] = [
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
    name: "Laravel React Starter Kit — PR #46",
    type: "contribution",
    description:
      "Fixed TypeScript form handling bug in useForm hook — improved API consistency and prevented missing field submissions.",
    url: "https://github.com/laravel/react-starter-kit/pull/46",
    prUrl: "https://github.com/laravel/react-starter-kit/pull/46",
    badge: "Merged by @taylorotwell",
    techStack: ["TypeScript", "React", "Laravel"],
  },
  {
    name: "Mobile-Responsive Drawer — PR #57",
    type: "contribution",
    description:
      "Designed and implemented a responsive drawer component improving mobile navigation UX across Laravel starter kit.",
    url: "https://github.com/laravel/react-starter-kit/pull/57",
    prUrl: "https://github.com/laravel/react-starter-kit/pull/57",
    badge: "Positive review from @tnylea",
    techStack: ["React", "TypeScript", "Laravel"],
  },
];
