// vite.config.ts
import { defineConfig } from "file:///F:/FE/ai-gou-wu-admin/node_modules/vite/dist/node/index.js";
import react from "file:///F:/FE/ai-gou-wu-admin/node_modules/@vitejs/plugin-react/dist/index.mjs";
import reactNodeKey from "file:///F:/FE/ai-gou-wu-admin/node_modules/react-node-key/vite/index.js";
import { fileURLToPath } from "node:url";
var __vite_injected_original_import_meta_url = "file:///F:/FE/ai-gou-wu-admin/vite.config.ts";
var hash = Math.floor(Math.random() * 9e4) + 1e4;
var vite_config_default = defineConfig({
  base: "./",
  plugins: [react(), reactNodeKey()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
        // 不可以省略rewrite
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
    // extensions: [".js", ".ts"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "[name]" + hash + ".js",
        chunkFileNames: "[name]" + hash + ".js",
        assetFileNames: "[name]" + hash + ".[ext]"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxGRVxcXFxhaS1nb3Utd3UtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXEZFXFxcXGFpLWdvdS13dS1hZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovRkUvYWktZ291LXd1LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgcmVhY3ROb2RlS2V5IGZyb20gXCJyZWFjdC1ub2RlLWtleS92aXRlXCI7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwibm9kZTp1cmxcIjtcclxuXHJcbmNvbnN0IGhhc2ggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5MDAwMCkgKyAxMDAwMDtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgYmFzZTogXCIuL1wiLFxyXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCByZWFjdE5vZGVLZXkoKV0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwb3J0OiA1MTczLFxyXG4gICAgcHJveHk6IHtcclxuICAgICAgXCIvYXBpXCI6IHtcclxuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovLzEyNy4wLjAuMTozMDAwXCIsXHJcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCBcIlwiKSwgLy8gXHU0RTBEXHU1M0VGXHU0RUU1XHU3NzAxXHU3NTY1cmV3cml0ZVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcclxuICAgIH0sXHJcbiAgICAvLyBleHRlbnNpb25zOiBbXCIuanNcIiwgXCIudHNcIl0sXHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc2Nzczoge1xyXG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgJGluamVjdGVkQ29sb3I6IG9yYW5nZTtgLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcIltuYW1lXVwiICsgaGFzaCArIFwiLmpzXCIsXHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwiW25hbWVdXCIgKyBoYXNoICsgXCIuanNcIixcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogXCJbbmFtZV1cIiArIGhhc2ggKyBcIi5bZXh0XVwiLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UCxTQUFTLG9CQUFvQjtBQUNwUixPQUFPLFdBQVc7QUFDbEIsT0FBTyxrQkFBa0I7QUFDekIsU0FBUyxxQkFBcUI7QUFIeUgsSUFBTSwyQ0FBMkM7QUFLeE0sSUFBTSxPQUFPLEtBQUssTUFBTSxLQUFLLE9BQU8sSUFBSSxHQUFLLElBQUk7QUFHakQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTTtBQUFBLEVBQ04sU0FBUyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7QUFBQSxFQUNqQyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUE7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUE7QUFBQSxFQUVGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixnQkFBZ0IsV0FBVyxPQUFPO0FBQUEsUUFDbEMsZ0JBQWdCLFdBQVcsT0FBTztBQUFBLFFBQ2xDLGdCQUFnQixXQUFXLE9BQU87QUFBQSxNQUNwQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
