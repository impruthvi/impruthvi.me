import type { ComponentProps } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Root, RootContent } from "mdast";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";
import remarkGfm from "remark-gfm";
import { highlight } from "sugar-high";
import { Label } from "@/components/ui";
import { CodeBlock } from "@/components/code-block";

function heading(level: 2 | 3) {
  const Tag = `h${level}` as const;
  const size =
    level === 2
      ? "text-h3 leading-10 font-bold tracking-[-0.02em] pt-6"
      : "text-lead font-semibold tracking-[-0.02em] pt-4";
  return function Heading({ children, id }: ComponentProps<"h2">) {
    return (
      <Tag id={id} className={`scroll-mt-24 ${size}`}>
        {children}
      </Tag>
    );
  };
}

const components = {
  h1: heading(2),
  h2: heading(2),
  h3: heading(3),
  h4: heading(3),

  p: (props: ComponentProps<"p">) => (
    <p className="text-prose text-body" {...props} />
  ),

  a: (props: ComponentProps<"a">) => (
    <a
      className="decoration-accent underline decoration-2 underline-offset-4 transition-colors hover:text-ink"
      {...props}
    />
  ),

  strong: (props: ComponentProps<"strong">) => (
    <strong className="text-ink font-semibold" {...props} />
  ),

  ul: (props: ComponentProps<"ul">) => (
    <ul className="text-prose text-body flex list-disc flex-col gap-2 pl-5" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="text-prose text-body flex list-decimal flex-col gap-2 pl-5" {...props} />
  ),
  li: (props: ComponentProps<"li">) => <li className="pl-1" {...props} />,

  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="border-accent [&>p]:text-ink border-l-[3px] py-1 pl-7 [&>p]:font-serif [&>p]:text-[1.75rem] [&>p]:leading-10 [&>p]:italic"
      {...props}
    />
  ),

  hr: () => <hr className="border-rule my-4" />,

  // sugar-high tokenises to spans; the theme colours live in globals.css.
  code: ({ children, className = "", ...props }: ComponentProps<"code">) => {
    if (typeof children !== "string") return <code {...props}>{children}</code>;
    // Inline code has no newlines — leave it unhighlighted, just tinted.
    if (!children.includes("\n")) {
      return (
        <code
          className={`bg-wash border-rule rounded-sm border px-1.5 py-0.5 font-mono text-[0.9em] ${className}`}
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code
        className={`font-mono text-sm leading-[1.625rem] ${className}`}
        dangerouslySetInnerHTML={{ __html: highlight(children) }}
        {...props}
      />
    );
  },

  pre: CodeBlock,

  table: (props: ComponentProps<"table">) => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left" {...props} />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th className="border-ink label border-b py-2.5 pr-6" {...props} />
  ),
  td: (props: ComponentProps<"td">) => (
    <td className="border-rule text-prose border-b py-2.5 pr-6 text-base" {...props} />
  ),

  Label,
};

export async function Mdx({ source }: { source: string }) {
  return (await renderMdx(source)).content;
}

/** Derive navigation and rendered IDs from the same parsed document. */
export async function renderMdx(source: string) {
  const headings: { text: string; id: string }[] = [];
  function headingIds() {
    return (tree: Root) => {
      const slugger = new GithubSlugger();
      let hasMainHeading = false;
      function visit(node: Root | RootContent) {
        if (node.type === "heading") {
          const text = toString(node);
          const id = `section-${slugger.slug(text)}`;
          node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
          // Older posts use an h3 for the introduction before their h2 sections.
          // Include those opening headings without listing every subsection.
          if (node.depth <= 2 || (node.depth === 3 && !hasMainHeading)) {
            headings.push({ text, id });
          }
          if (node.depth <= 2) hasMainHeading = true;
        }
        if ("children" in node) node.children.forEach(visit);
      }
      visit(tree);
    };
  }
  const { content } = await compileMDX({
    source,
    components,
    options: { mdxOptions: { remarkPlugins: [remarkGfm, headingIds] } },
  });
  return { content, headings };
}
