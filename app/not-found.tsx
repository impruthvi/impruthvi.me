import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="font-mono text-6xl font-bold text-laravel">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">Page not found</p>
      <Link
        href="/"
        className="mt-8 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
      >
        Back to home
      </Link>
    </section>
  )
}
