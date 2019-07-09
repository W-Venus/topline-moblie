// 封装axios
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
// 如果响应结果对象中有 data，则直接返回这个 data 数据
// 如果响应结果对象中没有 data，则不作任何处理，直接原样返回这个数据
request.interceptors.response.use(function (response) {
  return response.data.data || response.data
}, function (error) {
  return Promise.reject(error)
})

// 导出
export default request
