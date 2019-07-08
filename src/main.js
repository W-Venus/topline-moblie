import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 测试引入是否成功
import { Button } from 'vant'

Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
