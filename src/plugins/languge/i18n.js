import { createI18n } from 'vue-i18n'
import en from './en.js'
import zh from './zh.js'
import ja from './ja.js'
const messages = {
  zh,
  en,
  ja,
}
const i18n = createI18n({
  legacy: false, //vue3组合式api专用
  locale: localStorage.getItem('lang'), //当前语言
  fallbackLocale: 'en', //备用语言，当前语言缺少翻译时回退到英文
  globalInjection: true, //全局使用

  messages,
})
export default i18n
