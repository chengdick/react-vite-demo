import react from "@vitejs/plugin-react";
// import path from "path";
import { viteExternalsPlugin } from "vite-plugin-externals";
import htmlPlugin from "vite-plugin-html-config";
import viteReplaceCode from "./vite-replace-code";
import importCss from "./importCss";
import mdx from "vite-plugin-mdx";
import legacy from "@vitejs/plugin-legacy";
export const commonPlugin = (command: string) => {
  const common: Array<any> = [
    react(),
    mdx(),
    viteReplaceCode({ fileId: "@hanyk_rc-viewer" }),
    importCss({ antdLess: true }),
  ];
  let dev: Array<any> = [];
  let prod: Array<any> = [];
  if (command != "serve") {
    prod.push(
      // viteExternalsPlugin({
      //   react: "React",
      //   "react-dom": "ReactDOM",
      //   axios: "axios",
      // }),
      htmlPlugin({
        headScripts: [
          // {
          //   src: "/EasyWasmPlayer.js",
          // },
          // {
          //   src: "//unpkg.zhimg.com/react@18.1.0/umd/react.production.min.js",
          // },
          // {
          //   src: "//unpkg.zhimg.com/react-dom@18.1.0/umd/react-dom.production.min.js",
          // },
          // {
          //   src: "//unpkg.zhimg.com/axios@0.20.0/dist/axios.min.js",
          // },
        ],
      }),
      legacy({
        targets: ["defaults", "ie >= 11"],
      })
      // legacy({
      //   targets: ['ie >= 11'],
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      // })
    );
  } else {
    dev.push(
      htmlPlugin({
        headScripts: [
          {
            src: "/vid/EasyWasmPlayer.js",
          },
        ],
      })
    );
  }

  return [...common, ...dev, ...prod];
};
