import * as React from "react";
import { Playground, setup } from "code-kitchen";
import * as antd from "antd";
import "code-kitchen/styles.css";
// import * as privateLib from "my-private-lib";

// function PrivateLib() {
//   return <div>11</div>;
// }

const dependencies = {
  react: React,
  antd: antd,
};

const customRequire = (key: string) => {
  const res = (dependencies as any)[key];

  if (res) {
    return res;
  }

  throw new Error("DEP: " + key + " not found");
};

// Two files for the demo playground
const files = [
  {
    code: `
import { Button } from "antd";
import "./styles.css";

export default function Demo() {
  return <Button>Button</Button>;
}
  `,
    filename: "App.jsx",
  },
  {
    code: `button { width: 200px; }`,
    filename: "styles.css",
  },
];

export default () => {
  const ref = React.useRef(null);

  return (
    <div>
      <Playground
        style={{ height: 500 }}
        initialFiles={files}
        require={customRequire}
      />
      <antd.Button
        onClick={() => {
          console.log(ref, "lll");
        }}
      >
        保存
      </antd.Button>
    </div>
  );
};
