"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  // Rendered as null on the server and on the first client pass — reading the
  // real theme requires the DOM, and guessing causes a hydration mismatch.
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.theme = next ? "dark" : "light";
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
      className="text-muted hover:text-ink label transition-colors"
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
