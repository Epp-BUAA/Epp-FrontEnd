// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/bulma.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$backend_url = 'http://114.116.214.56:8000/api'
// Vue.prototype.$backend_url = 'http://yangyyy.yicp.fun/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
