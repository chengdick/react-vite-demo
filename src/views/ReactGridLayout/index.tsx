import GridLayout, {
  Responsive as ResponsiveGridLayout,
} from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./index.less";

// const ResponsiveGridLayout = WidthProvider(Responsive);
const Grid = () => {
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 5 },
  ];
  var layouts = { lg: layout, md: layout, sm: layout, xs: layout };
  return (
    <div>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
      >
        <div className="bor-red" key="a">
          a
        </div>
        <div className="bor-red" key="b">
          b
        </div>
        <div className="bor-red" key="c">
          c
        </div>
      </GridLayout>
      <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
        <div
          className="bor-red"
          key="a"
          data-grid={{ x: 0, y: 0, w: 1, h: 2, static: true }}
        >
          a
        </div>
        <div
          className="bor-red"
          key="b"
          data-grid={{ x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 }}
        >
          b
        </div>
        <div className="bor-red" key="c" data-grid={{ x: 4, y: 0, w: 1, h: 2 }}>
          c
        </div>
      </GridLayout>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        rowHeight={30}
        width={1200}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      >
        <div key="a" className="bor-red">
          1
        </div>
        <div key="b" className="bor-red">
          2
        </div>
        <div key="c" className="bor-red">
          3
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};
export default Grid;
