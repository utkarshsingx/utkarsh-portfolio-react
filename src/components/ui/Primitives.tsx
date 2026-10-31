import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`font-code text-[11px] tracking-[0.18em] uppercase text-ink-3 ${className}`}
    >
      {children}
    </p>
  );
}

export function Section({
  id,
  index,
  eyebrow,
  title,
  lede,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line py-20 sm:py-28">
      <div className="shell">
        <header className="reveal max-w-3xl">
          <div className="flex items-baseline gap-3">
            <span className="font-code text-[11px] tracking-[0.18em] text-accent">{index}</span>
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h2 className="mt-5 text-[clamp(1.75rem,4.2vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.02em]">
            {title}
          </h2>
          {lede ? (
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-ink-2">{lede}</p>
          ) : null}
        </header>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}

export function Card({
  children,
  className = "",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-line bg-surface/60 p-6 transition duration-300 ease-[var(--ease-out-soft)] ${
        interactive
          ? "hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface motion-reduce:hover:translate-y-0"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line-2 bg-surface-2/70 px-2.5 py-1 font-code text-[10.5px] tracking-[0.08em] uppercase text-ink-2">
      {children}
    </span>
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`size-[1em] shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" />
    </svg>
  );
}
