/**
 * Structured data, rendered as a script tag in the page body per the Next.js
 * JSON-LD guide. `JSON.stringify` does not sanitise strings bound for a script
 * body, so `<` is replaced with its unicode escape to close the XSS hole that
 * content-derived titles would otherwise open.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
