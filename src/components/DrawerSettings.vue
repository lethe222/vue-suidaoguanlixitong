<template>
  <div class="setting">
    <el-button type="primary" @click="drawer = true">
      <el-icon class="setting-icon"><Setting /></el-icon>
    </el-button>
    <el-drawer v-model="drawer" title="系统设置" size="20%">
      <div class="drawer">
        <div class="drawer-item">
          <span>logo显示/隐藏</span>
          <el-switch v-model="logoToggle" />
        </div>
        <div class="drawer-item">
          <span>logo显示/隐藏</span>
          <el-switch v-model="logoToggle" />
        </div>
        <div class="drawer-item">
          <span>logo显示/隐藏</span>
          <el-switch v-model="logoToggle" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const drawer = ref(false)
const logoToggle = ref(false)
</script>
<style scoped>
.setting {
  position: fixed;
  right: 30px;
  bottom: 100px;
  z-index: 100;
  border-radius: 50%;
}
.setting :deep(.el-button) {
  border-radius: 50%;
  width: 50px;
  height: 50px;
  background-color: rgba(240, 248, 255, 0);
}
.setting-icon {
  font-size: 24px;
  color: #409eff;
}
.drawer-item {
  display: flex;
  /* 两端对齐 */
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
</style>
