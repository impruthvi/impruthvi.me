export interface OpenSourceItem {
  name: string;
  type: "package" | "contribution" | "maintainer";
  description: string;
  url: string;
  techStack: string[];
}

export const openSourceData: OpenSourceItem[] = [
  {
    name: "Cashier Dunning",
    type: "package",
    description:
      "Test Stripe billing lifecycles offline by replaying signed webhooks through Laravel applications, covering failures, retries, cancellations, and other difficult billing states.",
    url: "https://github.com/impruthvi/cashier-dunning",
    techStack: ["PHP", "Laravel", "Stripe"],
  },
  {
    name: "Laravel Boost",
    type: "contribution",
    description:
      "Contributed improvements to Laravel Boost, an official Laravel package, with changes merged into the upstream project.",
    url: "https://github.com/laravel/boost/pulls?q=is%3Apr+is%3Aclosed+author%3Aimpruthvi",
    techStack: ["PHP", "Laravel"],
  },
  {
    name: "Laravel React Starter Kit",
    type: "contribution",
    description:
      "Improved TypeScript form handling in the useForm hook, preventing missing fields and making form submissions more consistent.",
    url: "https://github.com/laravel/react-starter-kit/pull/46",
    techStack: ["TypeScript", "React", "Laravel"],
  },
  {
    name: "Laravel React Starter Kit",
    type: "contribution",
    description:
      "Built a mobile-responsive navigation drawer, improving navigation and usability across smaller screens.",
    url: "https://github.com/laravel/react-starter-kit/pull/57",
    techStack: ["React", "TypeScript", "Laravel"],
  },
  {
    name: "@impruthvi/nodemail",
    type: "package",
    description:
      "Built a TypeScript email library for Node.js with Laravel-inspired APIs, provider failover, queues, and template-based delivery.",
    url: "https://github.com/impruthvi/nodemail",
    techStack: ["TypeScript", "Node.js", "BullMQ"],
  },
  {
    name: "ShipFastLabs / Starter Kit",
    type: "maintainer",
    description:
      "Maintaining a Laravel SaaS foundation designed to accelerate the development of production-ready SaaS applications.",
    url: "https://shipfastlabs.com/",
    techStack: ["Laravel", "PHP"],
  },
  {
    name: "ShipFastLabs / parsel",
    type: "contribution",
    description:
      "Contributed to a PHP document parser for extracting text and structured data from PDFs, Office documents, and images locally.",
    url: "https://github.com/shipfastlabs/parsel",
    techStack: ["Laravel", "PHP"],
  },
];
