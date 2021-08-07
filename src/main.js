import Vue from 'vue'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import App from './App.vue'
import router from './router/index'
import store from './store'

import toast from 'components/common/toast'


Vue.config.productionTip = false

// 安装自定义toast插件
Vue.use(toast)

// 解决移动端300ms的延迟
FastClick.attach(document.body)

// 图片懒加载
Vue.use(VueLazyLoad)

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
