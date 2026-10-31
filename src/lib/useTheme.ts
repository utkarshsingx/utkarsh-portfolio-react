import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

function current(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" ? "light" : "dark";
}

/**
 * Reads the theme the inline script in index.html already resolved, so the
 * first render agrees with the painted DOM and nothing flashes.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document === "undefined" ? "dark" : current(),
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage disabled — the attribute is still correct for this visit */
    }
  }, [theme]);

  // Follow the OS only while the visitor has not made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (event: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("theme");
      } catch {
        /* ignore */
      }
      if (saved === "light" || saved === "dark") return;
      setTheme(event.matches ? "light" : "dark");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  return { theme, toggle };
}
