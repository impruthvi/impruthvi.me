import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  caseStudyFrontmatterSchema,
  type CaseStudyFrontmatter,
} from "@/lib/schemas";

const rootDirectory = path.join(process.cwd(), "content", "case-studies");

export type CaseStudy = {
  metadata: CaseStudyFrontmatter & { slug: string };
  content: string;
};

export type CaseStudyMetadata = CaseStudyFrontmatter & { slug: string };

export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
    const { data, content } = matter(fileContent);

    const result = caseStudyFrontmatterSchema.safeParse(data);
    if (!result.success) {
      console.error(
        `Invalid frontmatter for case study "${slug}":`,
        result.error
      );
      return null;
    }

    return { metadata: { ...result.data, slug }, content };
  } catch (error) {
    console.error(`Error reading case study "${slug}":`, error);
    return null;
  }
}

export async function getCaseStudies(
  limit?: number
): Promise<CaseStudyMetadata[]> {
  if (!fs.existsSync(rootDirectory)) return [];

  const files = fs
    .readdirSync(rootDirectory)
    .filter((file) => file.endsWith(".mdx"));

  const studies = files
    .map((file) => getCaseStudyMetadata(file))
    .filter((study): study is CaseStudyMetadata => study !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return limit ? studies.slice(0, limit) : studies;
}

function getCaseStudyMetadata(filename: string): CaseStudyMetadata | null {
  const slug = filename.replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, filename);
  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
  const { data } = matter(fileContent);

  const result = caseStudyFrontmatterSchema.safeParse(data);
  if (!result.success) {
    console.error(
      `Invalid frontmatter for case study "${slug}":`,
      result.error
    );
    return null;
  }

  return { ...result.data, slug };
}
