import axios from 'axios'
// 配置基准路径
const request = axios.create({
  baseURL: 'http://toutiao.course.itcast.cn'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
