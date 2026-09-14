import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/content";
import { renderMdx } from "@/components/mdx";
import { ArticleToc } from "@/components/article-toc";
import { ArrowLeft, ArrowUpRight, Container, Label } from "@/components/ui";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/notes/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/notes/${post.slug}`,
      title: post.title,
      description: post.summary,
      publishedTime: post.publishedAt,
      images: post.image ? [{ url: post.image, alt: post.title }] : undefined,
    },
  };
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const posts = getPosts();
  const next = posts[(posts.findIndex((p) => p.slug === slug) + 1) % posts.length];
  const { content, headings } = await renderMdx(post.body);

  return (
    <>
      <Container className="pt-14 pb-10 lg:pt-16 lg:pb-12">
        <Link
          href="/notes"
          className="text-muted hover:text-ink flex items-center gap-2.5 transition-colors"
        >
          <ArrowLeft />
          <Label>All notes</Label>
        </Link>

        <h1 className="text-article-title mt-7 max-w-[65rem] font-black tracking-[-0.035em]">
          {post.title}
        </h1>

        {post.summary ? (
          <p className="text-muted text-body mt-6 max-w-[51rem] lg:text-lead">{post.summary}</p>
        ) : null}

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <Label>{post.publishedAt}</Label>
          <Label>{post.readingTime} read</Label>
          {post.author ? <Label>{post.author}</Label> : null}
        </div>
      </Container>

      {post.image ? (
        <Container className="pb-12">
          <div className="bg-wash relative aspect-video overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(min-width: 1440px) 1248px, (min-width: 1024px) calc(100vw - 192px), calc(100vw - 48px)"
              className="object-contain"
              // The poster sits just under the title, so it is the LCP element
              // on every article. Lazy loading it defers the largest paint.
              loading="eager"
            />
          </div>
        </Container>
      ) : null}

      <Container className="border-rule border-t py-12 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          {headings.length > 1 ? <ArticleToc key={post.slug} headings={headings} /> : null}

          <article className="mdx-content max-w-measure flex min-w-0 flex-1 flex-col gap-6">
            {content}
          </article>
        </div>
      </Container>

      <Container className="border-rule border-t py-14">
        <Link
          href={`/notes/${next.slug}`}
          className="group flex items-end justify-between gap-8"
        >
          <span className="flex min-w-0 flex-1 flex-col gap-3.5">
            <Label>Next note</Label>
            <span className="text-h3 max-w-[51rem] font-black tracking-[-0.03em] wrap-anywhere">
              {next.title}
            </span>
          </span>
          <ArrowUpRight className="size-7 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Container>
    </>
  );
}
