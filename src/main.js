import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less' //全局样式
import Vant from 'vant' //vant组件库
import 'vant/lib/index.css' //vant组件库样式
import 'amfe-flexible' //动态加载REM基准值
import './utils/dayjs' //引入dayjs


Vue.use(Vant) // 全局使用vant组件库

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
