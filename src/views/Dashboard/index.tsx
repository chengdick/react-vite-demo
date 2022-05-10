import { Button, ConfigProvider, DatePicker, Result } from 'antd'
import { useState } from 'react'

import { Link } from 'react-router-dom'
const { RangePicker } = DatePicker
const Dashboard = () => {
  return (
    <div>
      <Button type="primary">11111</Button>
      <Button type="primary">
        <Link to="/dashboard">返回首页</Link>
      </Button>
      <RangePicker />
    </div>
  )
}

export default Dashboard
