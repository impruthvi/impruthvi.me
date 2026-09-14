"use client";

import { useEffect, useState } from "react";

export function ThemeToggle({ className = "text-muted hover:text-ink" }: { className?: string }) {
  // Rendered as null on the server and on the first client pass — reading the
  // real theme requires the DOM, and guessing causes a hydration mismatch.
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // The theme still works when browser storage is unavailable.
    }
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        isDark === null
          ? "Toggle theme"
          : `Switch to ${isDark ? "light" : "dark"} theme`
      }
      className={`label min-h-11 transition-colors ${className}`}
    >
      {isDark === null ? (
        <span className="inline-block w-8" aria-hidden />
      ) : isDark ? (
        "Light"
      ) : (
        "Dark"
      )}
    </button>
  );
}
