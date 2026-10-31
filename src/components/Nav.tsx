import { useTheme } from "../lib/useTheme";
import { useActiveSection, useScrolledPast } from "../lib/useScroll";
import { profile } from "../data/profile";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "github", label: "GitHub" },
  { id: "path", label: "Path" },
  { id: "contact", label: "Contact" },
] as const;

const IDS = SECTIONS.map((s) => s.id);

export default function Nav() {
  const { theme, toggle } = useTheme();
  const lifted = useScrolledPast(24);
  const active = useActiveSection(IDS);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-code focus:text-xs focus:uppercase focus:text-accent-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ease-[var(--ease-out-soft)] ${
          lifted ? "glass border-b border-line" : "border-b border-transparent"
        }`}
        style={{ height: "var(--nav-h)" }}
      >
        <nav className="shell flex h-full items-center justify-between gap-4">
          <a
            href="#top"
            className="hidden font-code text-[12px] tracking-[0.14em] uppercase transition-colors hover:text-accent min-[480px]:block"
          >
            Utkarsh<span className="text-accent">.</span>Singh
          </a>

          <div className="flex items-center gap-0.5 sm:gap-1">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`rounded-md px-2 py-1.5 font-code text-[10px] tracking-[0.12em] uppercase transition-colors sm:px-3 sm:text-[11px] sm:tracking-[0.14em] ${
                  active === s.id ? "text-accent" : "text-ink-3 hover:text-ink"
                }`}
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-md px-3 py-1.5 font-code text-[11px] tracking-[0.14em] uppercase text-ink-3 transition-colors hover:text-ink sm:block"
            >
              GitHub
            </a>
            <button
              type="button"
              onClick={toggle}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="grid size-9 place-items-center rounded-md border border-control text-ink-2 transition-colors hover:border-accent/60 hover:text-accent"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.4 8.4 0 1 0 10.2 10.2Z" />
    </svg>
  );
}
