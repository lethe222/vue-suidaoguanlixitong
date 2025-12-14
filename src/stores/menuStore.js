import { defineStore } from 'pinia'
export const useMenuStore = defineStore('', {
  state: () => {
    return {
      isCollapse: false,
    }
  },
})
