import { z } from "zod/v4";

export const postFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  image: z.string().optional(),
  author: z.string().default("Pruthvisinh Rajput"),
  publishedAt: z.string(),
  featured: z.boolean().optional().default(false),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export const caseStudyMetricSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const caseStudyFrontmatterSchema = z.object({
  title: z.string(),
  tagline: z.string(),
  category: z.string(),
  period: z.string(),
  role: z.string(),
  metrics: z.array(caseStudyMetricSchema),
  techStack: z.array(z.string()),
  image: z.string().optional(),
  publishedAt: z.string(),
});

export type CaseStudyFrontmatter = z.infer<
  typeof caseStudyFrontmatterSchema
>;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
