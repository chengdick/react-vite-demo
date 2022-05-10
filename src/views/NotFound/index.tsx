import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Button type="primary">
        <Link to="/login">返回首页</Link>
      </Button>
    </div>
  )
}

export default NotFound
