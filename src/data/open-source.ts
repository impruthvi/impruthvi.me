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
    // Laravel has issues and pull requests disabled on this repo, so /pull/46
    // now 404s. The merge commit is permanent and carries the authorship.
    url: "https://github.com/laravel/react-starter-kit/commit/799c3c2774e58d5728c6e8e44a9d881e28f2893a",
    techStack: ["TypeScript", "React", "Laravel"],
  },
  {
    name: "laramail",
    type: "package",
    description:
      "Built a TypeScript email library for Node.js with Laravel-inspired APIs, provider failover, queues, and template-based delivery.",
    url: "https://github.com/impruthvi/laramail",
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
