/// <reference types="vite/client" />
declare const WasmPlayer: any;
declare module "@hanyk/rc-viewer";
declare module "react-virtualized";
declare module "react-resizable";
declare module "*.mdx" {
  const MDXComponent: (props: Record<string, unknown>) => JSX.Element;
  export default MDXComponent;
}
