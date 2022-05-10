import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { message, notification } from 'antd'
const request = axios.create({
  baseURL: '/',
  timeout: 30000,
  withCredentials: false,
})
// !统一错误处理
const err = (error: any) => {
  if (error.response) {
    const data = error.response.data

    switch (error.response.status) {
      case 403:
        notification.error({
          message: '系统提示',
          description: '拒绝访问',
          duration: 4,
        })
        break
      case 500:
        message.error(data.msg || data.message)
        break
      case 404:
        notification.error({
          message: '系统提示',
          description: '很抱歉，资源未找到!',
          duration: 4,
        })
        break
      case 504:
        notification.error({ message: '系统提示', description: '网络超时' })
        break
      case 401:
        notification.error({
          message: '系统提示',
          description: '未授权，请重新登录',
          duration: 4,
        })
        localStorage.clear()

        break
      default:
        message.error(data.msg || data.message)
        break
    }
  } else {
    notification.error({
      message: '系统提示',
      description: '网络错误，请稍后重试',
      duration: 4,
    })
  }

  return Promise.reject(error)
}

// ?设置请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // ?get请求添加时间戳
    if (config.method?.toLocaleUpperCase() === 'GET') {
      const _t: string = new Date() + ''
      config.params = {
        _t: Date.parse(_t) / 1000,
        ...config.params,
      }
    }

    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

// ?设置请求响应拦截器
request.interceptors.response.use((response: AxiosResponse) => {
  if (response.data.success) {
    return response.data
  } else {
    message.error(response.data.msg || response.data.message)
  }
}, err)
export default request
