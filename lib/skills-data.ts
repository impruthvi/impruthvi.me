export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Core Stack",
    skills: [
      "PHP",
      "Laravel",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "REST APIs",
      "Eloquent ORM",
    ],
  },
  {
    category: "Frontend",
    skills: [
      "React.js",
      "Inertia.js",
      "Vue.js",
      "Livewire",
      "Tailwind CSS",
      "Next.js",
      "TypeScript",
      "JavaScript",
    ],
  },
  {
    category: "Infrastructure",
    skills: [
      "AWS (EC2, S3, RDS, Lambda)",
      "Docker",
      "Nginx",
      "Supervisor",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    category: "Testing (95% coverage)",
    skills: ["PHPUnit", "Pest", "Cypress", "Jest", "TDD"],
  },
  {
    category: "Integrations",
    skills: [
      "Stripe",
      "Razorpay",
      "CRM APIs",
      "Socket.io",
      "Open Banking",
      "Webhooks",
    ],
  },
];
