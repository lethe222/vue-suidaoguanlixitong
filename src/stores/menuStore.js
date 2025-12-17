import { defineStore } from 'pinia'
export const useMenuStore = defineStore('menuStore', {
  state: () => {
    return {
      isCollapse: false,
      //面包屑导航
      breadcrumb: '首页',
      menus: [],
    }
  },
  //state数据配置持久化
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'menus_v1', // 添加版本号，改数据结构时可以改版本
        storage: localStorage,
      },
    ],
  },
})
