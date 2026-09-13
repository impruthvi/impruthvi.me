/**
 * Runs before paint so a stored light preference never flashes dark first.
 * Dark is the default, so we only ever have to *remove* the class.
 */
const script = `
try {
  if (localStorage.theme === "light") document.documentElement.classList.remove("dark");
} catch {}
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
