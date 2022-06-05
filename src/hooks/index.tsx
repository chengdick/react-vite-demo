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

const useResizableColumns = (columnslist?: ResizableProps[]) => {
  const [columns, setColumns] = React.useState<ResizableProps[]>([]);
  const startX = useRef<any>(0);
  useEffect(() => {
    if (columnslist?.length) {
      setComColumnslist(columnslist);
    }
  }, []);

  const setComColumnslist = (columnslist: any) => {
    let columns = columnslist?.map((col: any, index: any) => ({
      ...col,
      onHeaderCell: !col.onHeaderCell
        ? (column: any) => ({
            width: column.width,
            onResize: handleResize(index),
          })
        : col.onHeaderCell,
    }));
    columns && setColumns(columns);
  };

  const handleResize =
    (index: any) =>
    (e: any, { size }: any) => {
      console.log(e.clientX - startX.current, "size");
      // e.c
      startTransition(() => {
        setColumns((columns: any) => {
          const nextColumns = [...columns];
          nextColumns[index] = {
            ...nextColumns[index],
            width: columns[index].width + (e.clientX - startX.current),
          };
          return nextColumns;
        });
      });
    };

  const handleColResizeStart = (e: any, { size }: any) => {
    console.log(e.clientX, "size");
    startX.current = e.clientX;
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
        // onResize={onResize}
        onResizeStart={handleColResizeStart}
        onResizeStop={onResize}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <th {...restProps} />
      </Resizable>
    );
  };
  console.log(columns, "prop2222s");
  const components = useRef({
    header: {
      cell: ResizableTitle,
    },
  });

  const setResizableColumns = (columnslist: any) => {
    setComColumnslist(columnslist);
  };

  return { components: components, columns, setResizableColumns };
};

export { useSiderDragWidth, useResizableColumns };
