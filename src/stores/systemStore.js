import { defineStore } from 'pinia'
export const useSystemStore = defineStore('system', {
  state: () => {
    return {
      toggleStore: true,
    }
  },
  //state数据配置持久化
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'toggleStore_temp',
        storage: localStorage,
      },
    ],
  },
})
