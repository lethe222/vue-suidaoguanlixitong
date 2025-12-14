<template>
  <RouterView />
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style>
/* 公共css */
body,
html,
#app {
  height: 100%;
}
/* .el-menu 去掉右侧边框*/
.el-menu {
  border-right: 0 !important;
}
</style>
