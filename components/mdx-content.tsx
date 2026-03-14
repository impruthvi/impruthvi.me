import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'

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
  pre: (props: React.ComponentProps<'pre'>) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-muted p-4 text-sm"
      {...props}
    />
  ),
  code: Code,
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  hr: () => <hr className="my-8 border-border/50" />,
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose-custom">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
