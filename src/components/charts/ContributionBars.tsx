import { useId, useState } from "react";
import { weeks } from "../../data/github-stats";

/**
 * Contributions per week over the trailing year.
 *
 * One series, so there is no legend — the caption names what is plotted. Only
 * the peak week carries a direct label; the rest are left to the axis and the
 * hover tooltip, because a number on every bar goes unread.
 */
const BAND = 20; // horizontal slot per week
const BAR = 16; // mark width — leaves a 4px surface gap between neighbours
const RADIUS = 4; // rounded at the data end, square at the baseline
const PLOT_H = 196;
const AXIS_H = 26;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Rounded top, square bottom — `rx` on a <rect> would round all four corners. */
function barPath(x: number, y: number, w: number, h: number) {
  if (h <= 0) return "";
  const r = Math.min(RADIUS, h / 2, w / 2);
  return `M${x},${y + h}L${x},${y + r}Q${x},${y} ${x + r},${y}L${x + w - r},${y}Q${x + w},${y} ${x + w},${y + r}L${x + w},${y + h}Z`;
}

export default function ContributionBars() {
  const [hover, setHover] = useState<number | null>(null);
  const titleId = useId();

  const max = Math.max(...weeks.map((w) => w.total));
  const ceiling = Math.ceil(max / 200) * 200 || 200;
  const peak = weeks.reduce((best, w, i) => (w.total > weeks[best].total ? i : best), 0);

  const width = weeks.length * BAND;
  const height = PLOT_H + AXIS_H;
  const ticks = Array.from({ length: ceiling / 200 + 1 }, (_, i) => i * 200);

  // Label the first week of each month, thinned to every other month so the
  // labels cannot collide at narrow widths.
  const months = weeks
    .map((w, i) => ({ i, date: new Date(w.firstDay) }))
    .filter(
      ({ i, date }) =>
        i > 0 && date.getUTCMonth() !== new Date(weeks[i - 1].firstDay).getUTCMonth(),
    )
    .filter((_, idx) => idx % 2 === 0);

  const pctX = (i: number) => (((i + 0.5) * BAND) / width) * 100;
  const pctY = (value: number) => ((PLOT_H - (value / ceiling) * PLOT_H) / height) * 100;

  return (
    <figure className="m-0">
      <figcaption className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <span className="font-code text-[10.5px] tracking-[0.16em] uppercase text-ink-3">
          Contributions per week · trailing 12 months
        </span>
        <span className="font-code text-[10.5px] tracking-[0.16em] uppercase text-ink-3">
          n = {weeks.length} weeks
        </span>
      </figcaption>

      {/* pl-9 is the y-axis gutter: the tick labels live in it, so they never
          sit on top of the leftmost bars. */}
      <div className="relative pl-9">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block h-[clamp(150px,22vw,216px)] w-full"
          preserveAspectRatio="none"
          role="img"
          aria-labelledby={titleId}
          onMouseLeave={() => setHover(null)}
        >
          <title id={titleId}>
            Weekly GitHub contributions over the trailing twelve months, from{" "}
            {weeks[0].firstDay} to {weeks[weeks.length - 1].firstDay}. Peak week beginning{" "}
            {weeks[peak].firstDay} with {weeks[peak].total} contributions.
          </title>

          {/* Recessive hairline gridlines — solid, never dashed. */}
          {ticks.map((t) => (
            <line
              key={t}
              x1={0}
              x2={width}
              y1={PLOT_H - (t / ceiling) * PLOT_H}
              y2={PLOT_H - (t / ceiling) * PLOT_H}
              stroke="var(--color-line-2)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {weeks.map((w, i) => {
            const h = (w.total / ceiling) * PLOT_H;
            return (
              <g key={w.firstDay}>
                <path
                  d={barPath(i * BAND + (BAND - BAR) / 2, PLOT_H - h, BAR, h)}
                  fill="var(--color-accent)"
                  opacity={hover === null ? 0.82 : hover === i ? 1 : 0.28}
                  style={{ transition: "opacity 160ms ease" }}
                />
                {/* Hit target spans the whole band and full plot height, so a
                    1-contribution week is as easy to hover as a 784 one. */}
                <rect
                  x={i * BAND}
                  y={0}
                  width={BAND}
                  height={PLOT_H}
                  fill="transparent"
                  onMouseEnter={() => setHover(i)}
                />
              </g>
            );
          })}

          <line
            x1={0}
            x2={width}
            y1={PLOT_H}
            y2={PLOT_H}
            stroke="var(--color-line)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Axis text lives in HTML so preserveAspectRatio="none" cannot stretch it. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {ticks.slice(1).map((t) => (
            <span
              key={t}
              className="tnum absolute left-0 -translate-y-1/2 font-code text-[9.5px] text-ink-3"
              style={{ top: `${pctY(t)}%`, marginLeft: "-2.25rem" }}
            >
              {t >= 1000 ? `${t / 1000}K` : t}
            </span>
          ))}
          {months.map((m) => (
            <span
              key={m.i}
              className="absolute bottom-0 -translate-x-1/2 font-code text-[9.5px] text-ink-3"
              style={{ left: `${pctX(m.i)}%` }}
            >
              {MONTHS[m.date.getUTCMonth()]}
            </span>
          ))}
          <span
            className="tnum absolute -translate-x-1/2 -translate-y-[130%] font-code text-[10px] text-accent"
            style={{ left: `${pctX(peak)}%`, top: `${pctY(weeks[peak].total)}%` }}
          >
            {weeks[peak].total}
          </span>
        </div>

        {hover !== null ? (
          <div
            className="glass pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[150%] whitespace-nowrap rounded-md border border-line px-2.5 py-1.5"
            style={{ left: `${pctX(hover)}%`, top: `${pctY(weeks[hover].total)}%` }}
          >
            <span className="tnum font-code text-[11px] text-ink">{weeks[hover].total}</span>
            <span className="font-code text-[11px] text-ink-3">
              {" · week of "}
              {formatWeek(weeks[hover].firstDay)}
            </span>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <p className="max-w-[70ch] text-[0.875rem] leading-relaxed text-ink-3">
          The shape is the honest part — a flat autumn while interning, a ramp through spring as
          scope grew, a spike around a platform migration, then a sustained cadence while running
          three products at once.
        </p>
        <span className="font-code text-[10px] tracking-[0.14em] uppercase text-ink-3">
          Source · GitHub GraphQL
        </span>
      </div>
    </figure>
  );
}

function formatWeek(iso: string) {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;
}
