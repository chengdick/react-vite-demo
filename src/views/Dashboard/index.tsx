import { Button, ConfigProvider, DatePicker, Result } from "antd";
import { useState } from "react";
import RcViewer from "@hanyk/rc-viewer";
import { Link } from "react-router-dom";
import img from "@/assets/image/xingshi.png";
const { RangePicker } = DatePicker;
console.log(RcViewer, "lll");
const Dashboard = () => {
  return (
    <div>
      <Button type="primary">11111</Button>
      <Button type="primary">
        <Link to="/dashboard">返回首页</Link>
      </Button>
      <RangePicker />
      <RcViewer options={{}}>
        <img src={img} alt="Picture 3"></img>
      </RcViewer>
      <RcViewer />
    </div>
  );
};

export default Dashboard;
