import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import { solidStart } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    solidStart({
      ssr: false
    }),
    tailwindcss(),
    nitro({
      preset: "static",
      prerender: {
        routes: ["/", "/docs", "/help"]
      }
    })
  ]
});
