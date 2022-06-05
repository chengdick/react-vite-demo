import React from "react";
import { useEffect, useState, useRef, startTransition } from "react";
import { Resizable } from "react-resizable";
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
    let onmousedownWidth: any = null;
    let offsetWidth: any = null;
    if (document.querySelector(parentClass)) {
      let node = document.createElement("div");
      node.setAttribute(
        "style",
        `
       ${initStyle}
        `
      );

      node.onmousedown = function (e: MouseEvent) {
        console.log(e, "e");
        onmousedownWidth = e.clientX;
        offsetWidth = (document.querySelector(parentClass) as HTMLElement)
          ?.offsetWidth;
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
        setWidth(event.clientX + offsetWidth - onmousedownWidth);
      } else {
        setWidth(
          offsetWidth -
            (event.clientX + offsetWidth - onmousedownWidth) +
            offsetWidth
        );
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

interface ResizableProps {
  width?: number;
}

const useResizableColumns = (columnslist: ResizableProps[]) => {
  const [columns, setColumns] = React.useState<ResizableProps[]>([]);
  useEffect(() => {
    let columns = columnslist.map((col, index) => ({
      ...col,
      onHeaderCell: (column: any) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
    }));
    setColumns(columns);
  }, [columnslist]);

  const handleResize =
    (index: any) =>
    (e: any, { size }: any) => {
      startTransition(() => {
        setColumns((columns) => {
          const nextColumns = [...columns];
          nextColumns[index] = {
            ...nextColumns[index],
            width: size.width,
          };
          return nextColumns;
        });
      });
    };

  const ResizableTitle = (props: any) => {
    const { onResize, width, ...restProps } = props;

    if (!width) {
      return <th {...restProps} />;
    }

    return (
      <Resizable
        width={width}
        height={0}
        handle={
          <span
            className="react-resizable-handle"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        }
        onResize={onResize}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <th {...restProps} />
      </Resizable>
    );
  };

  const components = useRef({
    header: {
      cell: ResizableTitle,
    },
  });

  return { components: components.current, columns, setColumns };
};

export { useSiderDragWidth, useResizableColumns };
