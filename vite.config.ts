import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";

// Homepage is a React app (Scroll Bulge). The other pages stay static HTML and
// are carried through the build as extra inputs so their links keep working.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { dedupe: ["react", "react-dom"] },
  optimizeDeps: { include: ["react", "react-dom", "react-router-dom", "framer-motion", "gsap", "gsap/SplitText", "gsap/ScrollTrigger", "gsap/Draggable", "gsap/InertiaPlugin"] },
  build: {
    rollupOptions: {
      input: { main: resolve(__dirname, "index.html") },
    },
  },
});
