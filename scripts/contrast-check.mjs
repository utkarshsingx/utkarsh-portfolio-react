#!/usr/bin/env node
/**
 * WCAG contrast gate over the real design tokens.
 *
 * Colour is the one design decision that can be checked arithmetically, so it
 * is checked here rather than by looking at screenshots. Eyes judge colour
 * relative to its surroundings; the ratio is absolute, and the failures
 * cluster exactly where visual review is weakest — tinted grounds and
 * non-text elements like control borders.
 *
 * The gate PARSES src/index.css. It deliberately keeps no copy of the hex
 * values: a check that reads a copy of the thing it checks is not checking
 * the thing.
 *
 *   npm run check:contrast
 */
import { readFileSync } from "node:fs";

const CSS = readFileSync(new URL("../src/index.css", import.meta.url), "utf8");

/** Pulls `--token: value;` pairs out of the block that `header` opens. */
function parseBlock(header) {
  const start = CSS.indexOf(header);
  if (start === -1) throw new Error(`contrast gate cannot find the "${header}" block in index.css`);
  const open = CSS.indexOf("{", start);
  let depth = 0;
  let end = open;
  for (let i = open; i < CSS.length; i++) {
    if (CSS[i] === "{") depth++;
    else if (CSS[i] === "}" && --depth === 0) {
      end = i;
      break;
    }
  }
  const body = CSS.slice(open + 1, end);
  const tokens = {};
  for (const [, name, value] of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    tokens[name] = value.trim();
  }
  return tokens;
}

const dark = parseBlock("@theme {");
const lightOverride = parseBlock(':root[data-theme="light"] {');
const light = { ...dark, ...lightOverride };

/* -- colour maths ---------------------------------------------------------- */

function rgba(input) {
  // Already-flattened colours pass straight through, so a pair may mix a hex
  // token with a composited ground.
  if (typeof input === "object" && input !== null) return input;
  const v = input.trim();
  const m = /^#([0-9a-f]{3,8})$/i.exec(v);
  if (!m) throw new Error(`contrast gate cannot parse the colour "${v}"`);
  let h = m[1];
  if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join("");
  const n = (i) => parseInt(h.slice(i, i + 2), 16);
  return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
}

/** Flattens a translucent colour onto its ground — the ratio of what is
    actually rendered, not of the declared value. */
function over(fg, bg) {
  const f = rgba(fg);
  const b = rgba(bg);
  return {
    r: f.r * f.a + b.r * (1 - f.a),
    g: f.g * f.a + b.g * (1 - f.a),
    b: f.b * f.a + b.b * (1 - f.a),
    a: 1,
  };
}

const channel = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
};

const luminance = (c) => 0.2126 * channel(c.r) + 0.7152 * channel(c.g) + 0.0722 * channel(c.b);

function ratio(fg, bg) {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/* -- the pairs ------------------------------------------------------------- */

/**
 * One entry per ground a colour actually lands on. 4.5 for body text, 3.0 for
 * state indicators, data marks and control borders (WCAG 1.4.11).
 *
 * `--color-line` and `--color-line-2` are decorative — section dividers, the
 * hero grid, container edges — and 1.4.11 exempts decoration. Holding them to
 * 3:1 would force a much louder page for no accessibility gain, so they are
 * not listed. `--color-control` IS listed: it draws the boundary of the
 * secondary buttons and the theme toggle, where the border is the only visual
 * indication that the thing is a control. That split exists because the first
 * run of this gate failed every control border at 1.3:1 — the one defect a
 * screenshot review would never have surfaced.
 */
const GROUNDS = ["--color-bg", "--color-surface", "--color-surface-2"];

function pairsFor(tokens, mode) {
  const rows = [];
  const add = (label, fg, bg, min) => rows.push({ label: `${mode} · ${label}`, fg, bg, min });

  for (const ground of GROUNDS) {
    const g = tokens[ground];
    const on = ground.replace("--color-", "");
    add(`ink on ${on}`, tokens["--color-ink"], g, 4.5);
    add(`ink-2 on ${on}`, tokens["--color-ink-2"], g, 4.5);
    add(`ink-3 on ${on}`, tokens["--color-ink-3"], g, 4.5);
    add(`accent text on ${on}`, tokens["--color-accent"], g, 4.5);
    add(`control border on ${on}`, over(tokens["--color-control"], g), g, 3.0);
  }

  // Glass surfaces: the nav is `surface` at 72% over whatever scrolls beneath,
  // and the worst case is the page background.
  const glass = over(
    tokens["--color-surface"] + (tokens["--color-surface"].length === 7 ? "b8" : ""),
    tokens["--color-bg"],
  );
  add("ink on glass nav", tokens["--color-ink"], glass, 4.5);
  add("ink-3 on glass nav", tokens["--color-ink-3"], glass, 4.5);

  // Text set inside a filled accent button.
  add("accent-ink on accent", tokens["--color-accent-ink"], tokens["--color-accent"], 4.5);

  // Live-status dot and the accent bar fill are marks, not text.
  add("pulse dot on bg", tokens["--color-pulse"], tokens["--color-bg"], 3.0);
  add("accent bar mark on bg", tokens["--color-accent"], tokens["--color-bg"], 3.0);

  return rows;
}

const rows = [...pairsFor(dark, "dark"), ...pairsFor(light, "light")];

let failed = 0;
const lines = rows.map((row) => {
  const fg = typeof row.fg === "string" ? over(row.fg, row.bg) : row.fg;
  const bg = typeof row.bg === "string" ? rgba(row.bg) : row.bg;
  const r = ratio(fg, bg);
  const ok = r >= row.min;
  if (!ok) failed++;
  return `${ok ? "pass" : "FAIL"}  ${r.toFixed(2).padStart(6)}:1  (min ${row.min.toFixed(1)})  ${row.label}`;
});

console.log(lines.join("\n"));
console.log(
  `\n${rows.length} pairs checked across 2 themes — ${rows.length - failed} pass, ${failed} fail`,
);

if (failed > 0) {
  console.error("\ncontrast gate FAILED — fix the tokens in src/index.css before shipping.");
  process.exit(1);
}
