<template>
  <div class="slider-nav" :style="{ width: menuStore.isCollapse ? '64px' : '210px' }">
    <div class="logo">{{ menuStore.isCollapse ? '隧道' : '隧道工程项目' }}</div>
    <el-menu
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="active"
      router
      class="el-menu-vaertical-demo"
      :collapse="menuStore.isCollapse"
    >
      <el-menu-item :index="item.path" v-for="(item, index) of menuStore.menus" :key="index">
        <!-- 动态渲染图标 -->
        <component :is="item.icon" class="menu-icon"></component>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/menuStore'
const route = useRoute()
const menuStore = useMenuStore()
// 菜单高亮 = 当前路由路径，自动跟随路由变化
const active = computed(() => route.path)
</script>
<style scoped>
.slider-nav {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 210px;
  background-color: #304156;
  transition: 0.3s ease-in;
}
.logo {
  width: 100%;
  height: 60px;
  background-color: #364e6d;
  line-height: 60px;
  color: #fff;
  font-size: 25px;
  /* 左右居中 */
  text-align: center;
}
.menu-icon {
  width: 18px;
  height: 18px;
  padding-right: 10px;
}
</style>
