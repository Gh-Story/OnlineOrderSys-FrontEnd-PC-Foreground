import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import charts from 'echarts'
import BaiduMap from 'vue-baidu-map'
import Router from 'vue-router'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'ENH3a3swkkDUDUNNHiWng9uBstizZGef'
})
axios.defaults.withCredentials = true
Vue.config.productionTip = false
Vue.prototype.$echarts=charts
Vue.use(ElementUI)
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}