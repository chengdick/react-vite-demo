import { Result, Spin } from "antd";
import React from "react";
const MODE = import.meta.env.MODE;
const modules = import.meta.glob("/src/views/**/index.tsx");
console.log("modules", modules);
console.log(111);
class AsyncComponent extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  componentDidCatch(error: any, info: any) {
    if (error && MODE != "development") {
      // window.location.reload()
    }
    console.log("error", error);
    console.log("info", info);
  }

  render() {
    const { componentName } = this.props;
    const CompontentsImport = modules[`/src/views/${componentName}/index.tsx`];
    if (!CompontentsImport) {
      console.error(`${componentName} is not found`);
      return (
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Result
            status="404"
            title="404"
            subTitle={`Sorry, ${componentName} is not found`}
          />
        </div>
      );
    }
    const Compontents = React.lazy(CompontentsImport as any);
    return (
      <React.Suspense
        fallback={
          <div
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spin tip="页面初始加载中..." />
          </div>
        }
      >
        <Compontents />
      </React.Suspense>
    );
  }
}
export { AsyncComponent };
