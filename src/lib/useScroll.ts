import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `threshold`.
 *
 * Scroll fires once per frame at best and far more often on a trackpad. A
 * handler that stores a raw offset hands React a different float every event
 * and re-renders the whole tree for as long as the reader scrolls. Two things
 * stop that: the state is a BOOLEAN (so travel inside one region costs
 * nothing) and the setter bails when the value is unchanged. One rAF guard
 * coalesces a burst of events into a single measurement per frame.
 */
export function useScrolledPast(threshold = 24) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const next = window.scrollY > threshold;
      setPast((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure(); // honour a restored scroll position on load
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return past;
}

/**
 * The id of the section currently under the nav. IntersectionObserver rather
 * than a scroll handler, and the setter dedupes, so an unchanged id cannot
 * re-render the page.
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const next = visible.target.id;
        setActive((prev) => (prev === next ? prev : next));
      },
      // A band across the upper-middle of the viewport: the section the reader
      // is actually looking at, not whichever one merely touches the edge.
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
