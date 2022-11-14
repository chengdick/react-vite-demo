import React from "react";
import { Button } from "antd";
// import { Link } from "react-router-dom";
// const NotFound = () => {
//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "column",
//       }}
//     >
//       {/* <Button type="primary">
//         <Link to="/login">返回首页</Link>
//       </Button> */}
//     </div>
//   );
// };

// export default NotFound;

("use strict");
const _jsxFileName = "";
Object.defineProperty(exports, "__esModule", { value: true });
export default () =>
  React.createElement(
    "div",
    { __self: this, __source: { fileName: _jsxFileName, lineNumber: 2 } },
    React.createElement(
      Button,
      {
        type: "primary",
        __self: this,
        __source: { fileName: _jsxFileName, lineNumber: 3 },
      },
      "Primary"
    ),
    React.createElement(
      Button,
      { __self: this, __source: { fileName: _jsxFileName, lineNumber: 4 } },
      "Default"
    ),
    React.createElement(
      Button,
      {
        type: "dashed",
        __self: this,
        __source: { fileName: _jsxFileName, lineNumber: 5 },
      },
      "Dashed"
    ),
    React.createElement(
      Button,
      {
        type: "danger",
        __self: this,
        __source: { fileName: _jsxFileName, lineNumber: 6 },
      },
      "Danger"
    ),
    React.createElement(
      Button,
      {
        type: "link",
        __self: this,
        __source: { fileName: _jsxFileName, lineNumber: 7 },
      },
      "Link"
    )
  );
