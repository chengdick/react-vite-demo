interface importCssOptions {
  antdLess: boolean;
}
export default function importCss(options: importCssOptions) {
  const { antdLess } = options;
  return {
    name: "import-css",
    async transform(code, id) {
      let result = code;
      if (id.includes("main" && antdLess)) {
        result = `import "antd/dist/antd.variable.min.css";\n` + code;
      }
      return {
        code: result,
        map: null,
        warnings: null,
      };
    },
  };
}
