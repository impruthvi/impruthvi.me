import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  postFrontmatterSchema,
  type PostFrontmatter,
} from "@/lib/schemas";

const rootDirectory = path.join(process.cwd(), "content", "posts");

export type Post = {
  metadata: PostFrontmatter & { slug: string };
  content: string;
};

export type PostMetadata = PostFrontmatter & { slug: string };

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
    const { data, content } = matter(fileContent);

    const result = postFrontmatterSchema.safeParse(data);
    if (!result.success) {
      console.error(`Invalid frontmatter for post "${slug}":`, result.error);
      return null;
    }

    return { metadata: { ...result.data, slug }, content };
  } catch (error) {
    console.error(`Error reading post "${slug}":`, error);
    return null;
  }
}

export async function getPosts(limit?: number): Promise<PostMetadata[]> {
  if (!fs.existsSync(rootDirectory)) return [];

  const files = fs
    .readdirSync(rootDirectory)
    .filter((file) => file.endsWith(".mdx"));

  const posts = files
    .map((file) => getPostMetadata(file))
    .filter((post): post is PostMetadata => post !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return limit ? posts.slice(0, limit) : posts;
}

export async function getFeaturedPosts(
  limit?: number
): Promise<PostMetadata[]> {
  const posts = await getPosts();
  const featured = posts.filter((post) => post.featured);
  return limit ? featured.slice(0, limit) : featured;
}

function getPostMetadata(filename: string): PostMetadata | null {
  const slug = filename.replace(/\.mdx$/, "");
  const filePath = path.join(rootDirectory, filename);
  const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
  const { data } = matter(fileContent);

  const result = postFrontmatterSchema.safeParse(data);
  if (!result.success) {
    console.error(`Invalid frontmatter for post "${slug}":`, result.error);
    return null;
  }

  return { ...result.data, slug };
}
