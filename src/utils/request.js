// 封装axios
import axios from 'axios'
// 加载store
import store from '@/store'
// 加载json-bigint
import JSONbig from 'json-bigint'
import router from '@/router'

// 创建一个新的请求对象
const refreshTokenRequest = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 配置基准路径
const request = axios.create({
  // baseURL: 'http://toutiao.course.itcast.cn' // 本地接口
  baseURL: 'http://ttapi.research.itcast.cn/' // 在线接口
})

// 配置处理超过安全整数范围的数据
request.defaults.transformResponse = [function (data) {
  try {
  // 如果是 json 格式字符串，那就转换并返回给后续使用
    return JSONbig.parse(data)
  } catch (err) {
  // 报错就意味着 data 不是 json 格式字符串，这里就直接原样返回给后续使用
    return data
  }
}]

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 获取vuex容器中的用户信息
  const { user } = store.state
  // 判断,如果用户登录了,统一给接口添加token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
// 如果响应结果对象中有 data，则直接返回这个 data 数据
// 如果响应结果对象中没有 data，则不作任何处理，直接原样返回这个数据
request.interceptors.response.use(function (response) {
  return response.data.data || response.data
}, async (error) => {
  // 如果有返回值,且状态码是401,说明token过期或无效
  if (error.response && error.response.status === 401) {
    // 获取用户信息,用来判断是否登录,也就是是否拥有token 和 refresh_token
    const user = store.state.user
    if (!user) {
      // 没有登录,跳转至登录页
      return router.push({ name: 'login' })
    }
    try {
      // 如果登录了,说明有token,请求刷新token
      const res = await refreshTokenRequest({
        method: 'put',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 刷新token成功后
      store.commit('saveItem', {
        token: res.data.data.token, // 重新获取的访问token
        refresh_token: user.refresh_token // 原来的刷新token
      })
      // 使用之前的请求对象把原来因为401停止的请求再继续发出去
      return request(error.config)
    } catch (err) {
      // 刷新失败,跳转至登录页
      return router.push({ name: 'login' })
    }
  }
  return Promise.reject(error)
})

// 导出
export default request
