// 封装对登录状态的校验
// 引入store
import store from '@/store'
// 引入router
import router from '@/router'
// 引入vant
import { Dialog } from 'vant'

const { user } = store.state

export default () => {
  // 如果登录,返回true
  if (user) {
    return true
  }
  // 如果没有登录,提示操作
  Dialog.confirm({
    title: '登录操作',
    message: '该操作需要登录,确认登录吗?'
  }).then(() => {
    // 确认登录,跳转至登录页
    router.push({
      name: 'login',
      query: { // router.currentRoute 用来在非组件模块中获取当前页面的路由对象
        redirect: router.currentRoute.fullPath
      }
    })
  }).catch(() => {
    // 取消登录,什么都不做
  })
}
