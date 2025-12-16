<template>
  <div class="layout-container">
    <SliderNav />
    <div class="right-container" :style="{ marginLeft: menuStore.isCollapse ? '64px' : '210px' }">
      <TopNav />
      <div class="content">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>
<script setup>
import SliderNav from '../components/SliderNav/index.vue'
import TopNav from '../components/TopNav/index.vue'
import { useMenuStore } from '@/stores/menuStore'
import { onMounted } from 'vue'
import { useLoginStore } from '@/stores/loginStore'
import api from '@/api/index.js'
const menuStore = useMenuStore()
const loginStore = useLoginStore()
/* 用户权限获取 */
onMounted(() => {
  api
    .getRouter({
      user: loginStore.permission,
    })
    .then((res) => {
      /*       console.log(res.data.menuData.menus) // 打印返回的menuData数据 */
      if (res.data.status === 200) {
        menuStore.menus = res.data.menuData.menus // 修正：使用 menuData 而不是 data
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>
<style scoped>
.right-container {
  margin-left: 210px;
  transition: 0.3s ease-in;
}
.content {
  padding-left: 10px;
  padding-top: 10px;
}
</style>
