/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />

import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vitest/config"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths({ root: ".." }), react()],
  test: {
    environment: "jsdom",
    deps: {
      inline: ["framer-motion", ""],
    },
    globals: true,
    mockReset: true,
    clearMocks: true,
    root: "./tests",
    setupFiles: ["./setup.tsx"],
  },
  root: "./tests",
})
