import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactNodeKey from "react-node-key/vite";
import { fileURLToPath } from "node:url";

const hash = Math.floor(Math.random() * 90000) + 10000;

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), reactNodeKey()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 不可以省略rewrite
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    // extensions: [".js", ".ts"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "[name]" + hash + ".js",
        chunkFileNames: "[name]" + hash + ".js",
        assetFileNames: "[name]" + hash + ".[ext]",
      },
    },
  },
});
