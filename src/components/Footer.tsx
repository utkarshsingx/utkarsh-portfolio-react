import { profile } from "../data/profile";
import { statsWindow } from "../data/github-stats";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-code text-[10.5px] tracking-[0.14em] uppercase text-ink-3">
          {profile.name} · {new Date().getFullYear()} · Figures pulled {statsWindow.pulledOn}
        </p>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {[
            ["GitHub", profile.links.github],
            ["LinkedIn", profile.links.linkedin],
            ["Writing", profile.links.writing],
            ["Field report", profile.links.fieldReport],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-code text-[10.5px] tracking-[0.14em] uppercase text-ink-3 transition-colors hover:text-accent"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
