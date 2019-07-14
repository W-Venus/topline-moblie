import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 开发阶段导入所有组件和样式
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入amfe-flexible
import 'amfe-flexible'
// 加载过滤器文件
import relativetime from './filters/relative-time'

Vue.use(Vant)
// 封装一个定时器
Vue.prototype.$sleep = time => {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
}

// 注册过滤器
Vue.filter('relativeTime', relativetime)
// 按需导入组件
// import { Button } from 'vant'

// Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
