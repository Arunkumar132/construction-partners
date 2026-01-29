import { defineConfig } from "vite"; // <-- use 'vite', not 'vitest/config'
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  
  // Important for Netlify: set relative paths for assets
  base: "./",

  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },

  // Only needed if you still want testing
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
