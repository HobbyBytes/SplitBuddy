import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/

type ViteConfigInput = {
  mode: string;
  command: string;
};

export default (args: ViteConfigInput) => {
  const generateScopedName =
    args.mode === "production"
      ? "[name]_[local]__[hash:base64:5]"
      : "[local]_[hash:base64:2]";

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName,
      },
    },
  });
};
