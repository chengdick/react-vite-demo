import { Button, ConfigProvider, DatePicker, Result } from "antd";
import { useState } from "react";
// import RcViewer from "@hanyk/rc-viewer";
import { Link } from "react-router-dom";
import img from "@/assets/image/xingshi.png";
import { Column, Table } from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once
const { RangePicker } = DatePicker;
// console.log(RcViewer, "lll");
import Hello from "../../hello.mdx";
const Dashboard = () => {
  const list = [
    { name: "Brian Vaughn", description: "Software engineer" },
    // And so on...
  ];
  return (
    <div>
      <Hello />
      {/* <Button type="primary">11111</Button>
      <Button type="primary">
        <Link to="/dashboard">返回首页</Link>
      </Button>
      <RangePicker />*/}
      {/* <RcViewer options={{}}>
        <img src={img} alt="Picture 3"></img>
      </RcViewer> */}

      {/* <Table
        width={300}
        height={300}
        headerHeight={20}
        rowHeight={30}
        rowCount={list.length}
        rowGetter={({ index }: any) => list[index]}
      >
        <Column label="Name" dataKey="name" width={100} />
        <Column width={200} label="Description" dataKey="description" />
      </Table> */}
    </div>
  );
};

export default Dashboard;
