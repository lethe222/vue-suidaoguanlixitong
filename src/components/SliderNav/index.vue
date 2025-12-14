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
      <el-menu-item index="/">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/project-info">
        <el-icon><Connection /></el-icon>
        <span>项目基础信息</span>
      </el-menu-item>
      <el-menu-item index="/tunnel-info">
        <el-icon><MessageBox /></el-icon>
        <span>隧道设计信息</span>
      </el-menu-item>
      <el-menu-item index="/work-manage">
        <el-icon><FolderChecked /></el-icon>
        <span>工作监督管理</span>
      </el-menu-item>
      <el-menu-item index="/build-manage">
        <el-icon><ElementPlus /></el-icon>
        <span>施工监控检测</span>
      </el-menu-item>
      <el-menu-item index="/geological-info">
        <el-icon><Reading /></el-icon>
        <span>超前地址预报</span>
      </el-menu-item>
      <el-menu-item index="/system-manage">
        <el-icon><Guide /></el-icon>
        <span>系统信息管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useMenuStore } from '@/stores/menuStore'
const menuStore = useMenuStore()
const active = ref('/')
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
</style>
