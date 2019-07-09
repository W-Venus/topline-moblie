import Vue from 'vue'
import Vuex from 'vuex'

// 引入localStorage方法
import { getUser, setUser } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化,从本地获取用户信息
    user: getUser()
  },
  mutations: {
    // 持久化存储到本地,防止刷新丢失状态信息
    saveItem (state, user) {
      state.user = user
      setUser(state.user)
    }
  },
  actions: {

  }
})
