# utkarsh-portfolio

A personal portfolio for **Utkarsh Singh** — React 19 + Vite + Tailwind CSS v4,
dark by default with a light theme, and every number on the page pulled from the
GitHub API rather than typed in.

---

## Run it

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm run preview` | Serve the built `dist/` on :4173 |
| `npm run typecheck` | `tsc -b --noEmit` |
| `npm run check:contrast` | WCAG gate over the real design tokens |
| `npm run refresh:stats` | Re-pull the GitHub figures |

## Where the content lives

Everything the page says is in two files. No copy is hard-coded in a component.

- **`src/data/profile.ts`** — name, bio, achievements, the five roles, the eight
  repos, the stack. Hand-maintained, with the source of each block noted at the
  top. Two fields are marked `UNVERIFIED` and should be confirmed before anyone
  quotes them: the education line (no institution is named anywhere public) and
  the contact address, which was taken from public commit authorship.
- **`src/data/github-stats.ts`** — **generated, do not edit.** Contribution
  totals, the 53-week series and the day-by-day calendar.

Refresh the numbers with either auth method:

```bash
gh auth login && npm run refresh:stats      # uses the gh CLI
GITHUB_TOKEN=ghp_xxx npm run refresh:stats  # or any token with public read
```

## Deploy

The build is a static `dist/` — it works anywhere.

```bash
npm run build
```

- **Netlify** — config is in `netlify.toml` (build `npm run build`, publish `dist`).
  This repo is deployed at **https://utkarshsingx-demo.netlify.app**.
- **Vercel** — detected automatically as Vite.
- **GitHub Pages, user site** (`utkarshsingx.github.io`): push `dist/` to the
  branch Pages serves. Leave `base: "/"` in `vite.config.ts`.
- **GitHub Pages, project site** (`/<repo>/`): set `base: "/<repo>/"` in
  `vite.config.ts` first, or every asset 404s.

> This repo does not touch either of the existing live sites —
> `utkarshsingx.github.io` (no-build static) or `utkarsh-singh-dev.netlify.app`.
> It is a third, independent build.

---

## Three things worth knowing before you edit

**1. The theme is nine lines, because `@theme` is not `@theme inline`.**
A plain `@theme` block emits every token as a real `:root` custom property and
compiles each utility to `var(--token)`. So the whole light theme is one
selector re-declaring those tokens — every `bg-surface`, `text-ink-2` and
`border-line` beneath it re-themes itself, opacity modifiers included.
`@theme inline` would substitute values into the utilities instead and make
this impossible. Font tokens are `--font-ui` / `--font-code` / `--font-quote`
rather than `--font-sans` / `--font-serif` / `--font-mono` on purpose: those
three are Tailwind v4 built-ins, and redeclaring them creates a
custom-property cycle that still renders a plausible fallback face — a bug you
cannot see.

**2. Colour is gated, not eyeballed.** `npm run check:contrast` parses
`src/index.css` and checks 40 foreground/background pairs across both themes —
one entry per ground a colour actually lands on. It keeps no copy of the hex
values, because a check that reads a copy of the thing it checks is not
checking the thing. Its first run failed every control border at 1.3:1, which
is why there are two hairline tones: `--color-line` for dividers (decorative,
exempt under WCAG 1.4.11) and `--color-control` for the boundary of an actual
control, which is gated at 3:1.

**3. The scroll reveal animates transform only, never opacity.** It is a CSS
`animation-timeline: view()` — a pure function of scroll position, so unlike an
IntersectionObserver there is no event left to miss on a deep anchor link or a
fast scroll. The first draft faded opacity 0 → 1; reading computed opacity back
out of a real browser showed all 18 reveals at 0 while off-screen, which is
correct for someone scrolling and blank for a full-page screenshot, an OG
capture or any automated reader. A rise is enough. Nothing on this page is ever
transparent.

### Also

- **The contribution heatmap** has two renderers. The local SVG is the default.
  `ghchart.rshah.org` is wired up behind `USE_GHCHART` in
  `src/components/charts/ContributionHeatmap.tsx` and is off because it draws
  empty days as white cells (wrong on a dark surface, and it ignores the theme
  toggle) and inherits GitHub's fixed 0–4 buckets, which saturate completely for
  an account averaging ~25 contributions a day. Flip the flag to use it; the
  local grid still catches a failure, a 1px placeholder or a slow response.
- **The nav's scroll state is a boolean with a dedupe guard and one rAF.**
  Storing a raw scroll offset hands React a new float every event and re-renders
  the tree for as long as the reader scrolls.
- **Write `backdrop-filter` unprefixed.** Hand-writing `-webkit-backdrop-filter`
  next to it made Lightning CSS collapse the pair and emit only the prefixed
  form, so the sticky nav had no blur at all and you could read straight
  through it.
