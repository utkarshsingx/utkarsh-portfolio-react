import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Deploying to a GitHub Pages *project* page? set base to "/<repo-name>/".
  // A user page (utkarshsingx.github.io) or Netlify/Vercel keeps "/".
  base: "/",
  build: { outDir: "dist", sourcemap: false },
});
