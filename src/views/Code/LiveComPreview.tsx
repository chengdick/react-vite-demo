import React, { Component } from "react";
import { transform as _transform } from "sucrase";
const opts: any = { transforms: ["jsx", "imports"] };

const bounary = (Element: any) => {
  return class ErrorBoundary extends Component {
    render() {
      return typeof Element === "function" ? (
        <Element />
      ) : React.isValidElement(Element) ? (
        Element
      ) : null;
    }
  };
};

const evalCode = (code: any, scope: any) => {
  const codeTrimmed = code.trim().replace(/;$/, "");
  const transformed = _transform(`return (${codeTrimmed})`, opts).code.trim();
  const scopeKeys = Object.keys(scope);
  const scopeValues = scopeKeys.map((key) => scope[key]);
  return new Function(...scopeKeys, transformed)(...scopeValues);
};

function LiveComPreview({ code, scope }: any) {
  const Element = bounary(evalCode(code, scope));
  return Element ? <Element /> : null;
}

export { LiveComPreview, evalCode };
