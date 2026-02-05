import './assets/init.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import piniaPersist from 'pinia-plugin-persist'
import elementIcon from './plugins/icons'
import eCharts from './plugins/eCharts'

// 引入 Element Plus语言
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import ja from 'element-plus/dist/locale/ja.mjs'
import 'element-plus/dist/index.css'
//引入i18n
import i18n from './plugins/languge/i18n'
//引入pdf插件
import VuePdf from 'vue3-pdfjs'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
//使用pdf插件
app.use(VuePdf)
//配置语言包对象
const langMap = {
  zh: zhCn,
  en: en,
  ja: ja,
}

//如果拿到 null ，后面的程序可能会出错或者不知道该显示什么语言。
const currentLang = localStorage.getItem('lang') || 'zh'
app.use(ElementPlus, {
  locale: langMap[currentLang] || zhCn,
})
app.use(elementIcon)
app.use(eCharts)
app.use(i18n)
app.mount('#app')
