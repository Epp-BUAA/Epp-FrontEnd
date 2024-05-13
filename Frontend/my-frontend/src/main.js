import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'
import AnimatedNumber from 'animated-number-vue3'

const app = createApp(App)

app.use(router).use(store).use(AnimatedNumber)

app.mount('#app')
