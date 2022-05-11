import react from "@vitejs/plugin-react";
import path from "path";
import { viteExternalsPlugin } from "vite-plugin-externals";
import htmlPlugin from "vite-plugin-html-config";
export const commonPlugin = (command: string) => {
  const common: Array<any> = [react()];
  let dev: Array<any> = [];
  let prod: Array<any> = [];
  if (command != "serve") {
    prod.push(
      viteExternalsPlugin({
        react: "React",
        "react-dom": "ReactDOM",
        axios: "axios",
      }),
      htmlPlugin({
        headScripts: [
          {
            src: "/EasyWasmPlayer.js",
          },
          {
            src: "//cdn.jsdelivr.net/npm/react@18.1.0/umd/react.production.min.js",
          },
          {
            src: "//cdn.jsdelivr.net/npm/react-dom@18.1.0/umd/react-dom.production.min.js",
          },
          {
            src: "//cdn.jsdelivr.net/npm/axios@0.27.2/dist/axios.min.js",
          },
        ],
      })
    );
  } else {
    console.log(11);
    dev.push(
      htmlPlugin({
        headScripts: [
          {
            src: "./vid/EasyWasmPlayer.js",
          },
        ],
      })
    );
  }

  return [...common, ...dev, ...prod];
};
