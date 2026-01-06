import './assets/init.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPersist from 'pinia-plugin-persist'
import elementIcon from './plugins/icons'
import eCharts from './plugins/eCharts'

// 引入 Element Plus
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.use(ElementPlus, { locale: zhCn })
app.use(elementIcon)
app.use(eCharts)

app.mount('#app')
