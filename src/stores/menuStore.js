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
  //配置持久化
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'menus', //自定义的key值 存储到本地的key
        storage: localStorage, //选择存储方式:本地持久化
      },
    ],
  },
})
