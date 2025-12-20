import { defineStore } from 'pinia'
export const useLoginStore = defineStore('login', {
  //组合式api
  state: () => {
    return {
      token: '',
      // 权限
      permission: '',
      //用户名
      username: '',
    }
  },
  //配置持久化
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'login', //自定义的key值 存储到本地的key
        storage: localStorage, //选择存储方式:本地持久化
      },
    ],
  },
})
