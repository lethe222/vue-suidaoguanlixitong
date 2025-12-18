<template>
  <div class="layout-container">
    <DrawerSettings />
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
import { useRouter } from 'vue-router'
import manageRoute from '@/router/dynamicRoute'
import DrawerSettings from '@/components/DrawerSettings.vue'

const menuStore = useMenuStore()
const loginStore = useLoginStore()
const router = useRouter()

/* 用户权限获取 */
onMounted(() => {
  api
    .getRouter({
      user: loginStore.permission,
    })
    .then((res) => {
      if (res.data.status === 200) {
        /* 将服务器返回的菜单数据存储到 menuStore */
        menuStore.menus = res.data.menuData.menus

        /* 判断当前用户权限 */
        if (loginStore.permission === 'admin') {
          /* 添加嵌套路由 - 只有管理员才能访问工作监督管理模块 */
          router.addRoute('Layout', manageRoute)
        }
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
