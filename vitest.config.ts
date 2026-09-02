import { defineConfig } from "vitest/config"
import path from "node:path"

// No @vitejs/plugin-react -- it pulls a @babel/core version that conflicts
// with shadcn's own Babel peer deps. Vite's built-in esbuild JSX transform
// (driven by tsconfig's "jsx": "react-jsx") is enough for these tests; we
// don't need Fast Refresh or Babel-only transforms (e.g. emotion) here.
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["**/node_modules/**", "**/.next/**", "tests/e2e/**"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
