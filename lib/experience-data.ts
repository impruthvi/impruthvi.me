export interface ExperienceItem {
  company: string;
  position: string;
  location: string;
  date: string;
  highlights: string[];
  techStack: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    company: "Vivansh Infotech",
    position: "Software Developer",
    location: "Ahmedabad, Gujarat",
    date: "Jun 2025 – Present",
    highlights: [
      "Building Laravel + Inertia.js + React applications with Laravel Sanctum authentication and Redis-cached queue workers, reducing average feature delivery time by 30%.",
      "Integrated CRM and messaging platform APIs; optimized slow endpoints from ~700ms to ~420ms using query profiling, eager loading, and Redis caching.",
      "Owning end-to-end feature delivery — from requirement analysis through production deployment — with 95%+ test coverage via PHPUnit and Pest.",
      "Building real-time notification systems with CI/CD pipelines using GitHub Actions for automated deployment.",
    ],
    techStack: [
      "Laravel",
      "Inertia.js",
      "React",
      "Redis",
      "GitHub Actions",
      "PHPUnit",
      "Pest",
    ],
  },
  {
    company: "Yudiz Solutions Limited",
    position: "Web Developer",
    location: "Ahmedabad, Gujarat",
    date: "Jan 2022 – May 2025",
    highlights: [
      "Engineered 10+ Laravel applications serving 50,000+ users with React/Vue frontends; eliminated N+1 query patterns using Eloquent eager loading and MySQL indexing, achieving sub-200ms response times.",
      "Architected cloud-native deployments on AWS (EC2, S3, RDS, Lambda) with auto-scaling, Laravel Horizon, and Supervisor-managed queue workers — maintained 99.9% uptime.",
      "Built payment processing systems integrating Stripe and Razorpay, handling $500K+ in transactions with zero downtime using idempotent Queue workers and webhook signature verification.",
      "Led code reviews, enforced SOLID principles, and drove TDD adoption — lifted test coverage from ~60% to 95% across production apps.",
    ],
    techStack: [
      "Laravel",
      "React",
      "Vue.js",
      "MySQL",
      "AWS",
      "Docker",
      "Stripe",
      "Razorpay",
    ],
  },
  {
    company: "Adore India",
    position: "Software Engineer Intern",
    location: "Kolkata, West Bengal",
    date: "May 2021 – Aug 2021",
    highlights: [
      "Delivered 4 production-ready features using Laravel REST APIs, Eloquent ORM, and Blade templating.",
      "Participated in API design reviews and database schema planning for scalable web application development.",
    ],
    techStack: ["Laravel", "PHP", "MySQL", "REST APIs"],
  },
];
