import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import remarkGfm from 'remark-gfm'
import { CopyButton } from './copy-button'

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (typeof node === 'object' && node !== null && 'props' in node) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return extractText((node as any).props.children)
  }
  return ''
}

function Code({ children, ...props }: React.ComponentProps<'code'>) {
  const isInline = !props.className
  if (isInline) {
    return (
      <code className="rounded bg-muted px-1.5 py-0.5 text-sm" {...props}>
        {children}
      </code>
    )
  }

  const html = highlight(String(children))
  return <code dangerouslySetInnerHTML={{ __html: html }} {...props} />
}

const components = {
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2
      className="mt-10 mb-4 font-mono text-xl font-bold tracking-tight"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3
      className="mt-8 mb-3 font-mono text-lg font-semibold tracking-tight"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="mb-4 leading-relaxed text-muted-foreground" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul className="mb-4 list-disc space-y-1 pl-6 text-muted-foreground" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="mb-4 list-decimal space-y-1 pl-6 text-muted-foreground" {...props} />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a
      className="text-foreground underline underline-offset-4 transition-colors hover:text-laravel"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className="mb-4 border-l-2 border-laravel pl-4 italic text-muted-foreground"
      {...props}
    />
  ),
  pre: ({ children, ...props }: React.ComponentProps<'pre'>) => {
    const text = extractText(children)
    return (
      <div className="group relative mb-4">
        <pre
          className="overflow-x-auto rounded-lg bg-muted p-4 text-sm"
          {...props}
        >
          {children}
        </pre>
        {text && <CopyButton text={text} />}
      </div>
    )
  },
  code: Code,
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  hr: () => <hr className="my-8 border-border/50" />,
  table: (props: React.ComponentProps<'table'>) => (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: React.ComponentProps<'thead'>) => (
    <thead className="border-b border-border" {...props} />
  ),
  tbody: (props: React.ComponentProps<'tbody'>) => (
    <tbody {...props} />
  ),
  tr: (props: React.ComponentProps<'tr'>) => (
    <tr className="border-b border-border/50 transition-colors hover:bg-muted/30" {...props} />
  ),
  th: (props: React.ComponentProps<'th'>) => (
    <th
      className="px-4 py-2 text-left font-mono font-semibold text-foreground"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<'td'>) => (
    <td className="px-4 py-2 text-muted-foreground" {...props} />
  ),
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose-custom">
      <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </div>
  )
}
