# impruthvi.me

An editorial portfolio built with Bun, Next.js App Router, React and Tailwind CSS. Dark is the default theme; the light theme preference persists in the browser.

## Run locally

```bash
bun install --frozen-lockfile
bun dev
```

Open http://localhost:3000. To check the production build:

```bash
bun test
bun run build
bun run start
```

## Content

- `content/posts/*.mdx` supplies `/notes` and `/notes/[slug]`.
- `content/case-studies/*.mdx` supplies the home work index and `/work/[slug]`.
- `src/data/` holds experience, skills, education and open-source work.
- `src/lib/site.ts` holds contact details, navigation and social links.
- `public/images/` holds article images and the portrait. The résumé is `public/Pruthvisinh_Rajput.pdf`.

Use the existing MDX files as frontmatter examples. Post fields include `title`, `summary`, `publishedAt` (a quoted ISO date), `image` and `author`. Case studies use `title`, `tagline`, `period`, `role`, `category`, `techStack`, `metrics` and an optional `url`. Only add metrics backed by the actual project.

The filename determines the URL slug. Content is compiled at build time, so publishing an edit requires a new build. MDX is executable project source and must only come from trusted authors. The renderer supports GitHub-flavored Markdown and derives table-of-contents links from the same parsed headings used to render the article.

## Existing URLs

`next.config.ts` permanently redirects `/posts/*` to `/notes/*`, `/case-studies/*` to `/work/*`, the old index pages to their replacements, and `/resume` to `/about`. `/resume.pdf` redirects to the restored PDF. Preserve or extend these mappings when changing slugs.

`/rss.xml`, `/privacy`, `/robots.txt` and `/sitemap.xml` remain available. RSS keeps the original `/posts/` GUIDs so existing subscribers do not receive duplicate entries; article links use `/notes/`.

Before changing Next.js code, read the relevant installed guides in `node_modules/next/dist/docs/`, as required by `AGENTS.md`.
