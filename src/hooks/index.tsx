import { useEffect, useState } from "react";

interface DragMenuProps {
  initWidth?: number;
  parentClass?: string;
  initStyle?: string;
  direction?: string;
}

const useSiderDragWidth = ({
  initWidth = 220,
  parentClass = ".ant-layout-sider",
  initStyle = ` 
  position: absolute; width: 2px;
  height: 100%;
  right: 0;
  cursor: col-resize;
  z-index: 112;
  top: 0;`,
  direction = "right",
}: DragMenuProps) => {
  const [width, setWidth] = useState(initWidth);
  useEffect(() => {
    let w: any = null;
    if (document.querySelector(parentClass)) {
      let node = document.createElement("div");
      node.setAttribute(
        "style",
        `
       ${initStyle}
        `
      );

      node.onmousedown = function (e: MouseEvent) {
        w = e.clientX;
        console.log(e);
        e.preventDefault();
        document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
      };
      document.querySelector(parentClass)?.appendChild(node);
    }
    let event = null;
    function mouseMove(e: MouseEvent) {
      event = e || window.event;
      if (direction === "right") {
        setWidth(event.clientX + initWidth - w);
      } else {
        setWidth(initWidth - (event.clientX + initWidth - w) + initWidth);
      }
    }
    //终止事件
    function mouseUp() {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }, []);

  return { width };
};

export { useSiderDragWidth };
