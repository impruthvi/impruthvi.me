"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

export function CodeBlock({ children, className = "", ...props }: ComponentProps<"pre">) {
  const code = useRef<HTMLPreElement>(null);
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");

  useEffect(() => {
    if (status !== "copied") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  async function copy() {
    if (!code.current) return;
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(code.current.textContent ?? "");
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-code-bg text-code-fg border-rule min-w-0 max-w-full border">
      <div className="border-rule flex justify-end border-b px-3">
        <button
          type="button"
          onClick={copy}
          disabled={status === "copying"}
          aria-label={status === "copied" ? "Code copied" : "Copy code"}
          className="label flex min-h-11 min-w-24 items-center justify-center gap-2 px-2 text-code-fg transition-colors hover:text-accent disabled:opacity-60"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            {status === "copied" ? (
              <path d="m5 12 4 4L19 6" />
            ) : (
              <>
                <rect x="8" y="8" width="12" height="12" rx="1" />
                <path d="M16 8V4H4v12h4" />
              </>
            )}
          </svg>
          {status === "copied" ? "Copied" : status === "copying" ? "Copying" : "Copy"}
        </button>
      </div>
      <pre
        {...props}
        ref={code}
        tabIndex={0}
        className={`max-w-full overflow-x-auto px-6 py-5 ${className}`}
      >
        {children}
      </pre>
      <p role="status" className={status === "error" ? "px-6 pb-4 text-sm leading-6" : "sr-only"}>
        {status === "copied"
          ? "Code copied to clipboard."
          : status === "error"
            ? "Couldn’t copy. Select the code and copy it manually, or try again."
            : ""}
      </p>
    </div>
  );
}
