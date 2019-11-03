import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
//导入axios
import axios from 'axios'
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
//axios请求拦截器 是为了复用代码，每个ajax都要设置的头信息提取到拦截器当中（通过token拿数据 发向服务器）
axios.interceptors.request.use(function(config){
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config;
},function(error){
  console.log(error)
})
Vue.prototype.$http=axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
