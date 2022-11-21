import React from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./index.less";
import { Table } from "antd";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号",
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号",
  },
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
  },
];
export default class DragFromOutsideLayout extends React.Component {
  static defaultProps = {
    className: "layout",
    // rowHeight: 600,
    onLayoutChange: function () {},
    cols: { lg: 12 },
  };

  state = {
    // currentBreakpoint: "lg",
    compactType: "vertical",
    // mounted: false,
    layouts: { lg: [] },
    data: {},
  };

  componentDidMount() {
    // this.setState({ mounted: true });
  }

  generateDOM() {
    return _.map(this.state.layouts.lg, function (l: any, i) {
      return <div key={i}>111</div>;
    });
  }

  // onBreakpointChange = (breakpoint: any) => {
  //   this.setState({
  //     currentBreakpoint: breakpoint,
  //   });
  // };

  // onCompactTypeChange = () => {
  //   const { compactType: oldCompactType } = this.state;
  //   const compactType =
  //     oldCompactType === "horizontal"
  //       ? "vertical"
  //       : oldCompactType === "vertical"
  //       ? null
  //       : "horizontal";
  //   this.setState({ compactType });
  // };

  // onLayoutChange = (layout, layouts) => {
  //   // this.props.onLayoutChange(layout, layouts);
  // };

  // onNewLayout = () => {
  //   this.setState({
  //     layouts: { lg: generateLayout() },
  //   });
  // };

  onDrop = (layout: any, layoutItem: any, _event: any) => {
    this.setState({
      layouts: {
        lg: layout,
      },
    });
    // console.log(layout, "===");
    // console.log(layoutItem, "===");
    // console.log(_event, "===");
    // alert(
    //   `Dropped element props:\n${JSON.stringify(
    //     layoutItem,
    //     ["x", "y", "w", "h"],
    //     2
    //   )}`
    // );
  };

  render() {
    // console.log(this.state.layouts, "===122");
    return (
      <div>
        <div
          className="droppable-element"
          draggable={true}
          unselectable="on"
          // this is a hack for firefox
          // Firefox requires some kind of initialization
          // which we can do by adding this attribute
          // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
          onDragStart={(e) => e.dataTransfer.setData("table", "")}
        >
          Droppable Element (Drag me!)
        </div>

        <ResponsiveReactGridLayout
          {...this.props}
          layouts={this.state.layouts}
          // onBreakpointChange={this.onBreakpointChange}
          // onLayoutChange={this.onLayoutChange}
          onDrop={this.onDrop}
          // WidthProvider option
          // measureBeforeMount={false}
          // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
          // and set `measureBeforeMount={true}`.
          // useCSSTransforms={this.state.mounted}
          compactType={this.state.compactType}
          preventCollision={!this.state.compactType}
          isDroppable={true}
        >
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}
