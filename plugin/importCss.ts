interface importCssOptions {
  antdLess: boolean;
}
export default function importCss(options: importCssOptions) {
  const { antdLess } = options;
  return {
    name: "import-css",
    transform(code, id) {
      let result = code;
      // console.log(antdLess);
      // console.log(id, "====");
      if (id.includes("main")) {
        // result = `import "antd/dist/antd.variable.min.css";\n` + code;
        // console.log(code.split(";"));
        result = [
          code
            .split(";")
            .slice(0, code.split(";").length - 2)
            .join("\n"),
          `import "antd/dist/antd.min.css";\n`,
          code
            .split(";")
            .slice(code.split(";").length - 2, code.split(";").length)
            .join("\n"),
        ].join("\n");
        // console.log(result);
      }

      return {
        code: result,
        map: null,
        warnings: null,
      };
    },
  };
}
