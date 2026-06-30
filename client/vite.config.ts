import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5180,
    strictPort: false, // auto-bumps to next free port if 5180 is also busy
    proxy: { "/api": "http://localhost:4000" },
  },
});
