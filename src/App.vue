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
/* 弹框标题 */
.el-dialog__header {
  border-bottom: 1px solid #dfe1e5;
}
.el-dialog__title {
  font-size: 16px !important;
  font-weight: bold !important;
}
.el-dialog__close {
  font-size: 25px !important;
}
</style>
