<template>
  <div class="setting">
    <el-tooltip content="logo设置" placement="left" effect="dark">
      <el-button type="primary" @click="drawer = true">
        <el-icon class="setting-icon"><Setting /></el-icon>
      </el-button>
    </el-tooltip>
    <el-drawer v-model="drawer" title="系统设置" size="20%">
      <div class="drawer">
        <div class="drawer-item">
          <span>logo显示/隐藏</span>
          <el-switch v-model="systemStore.toggleStore" />
        </div>
        <div class="drawer-item">
          <span>logo显示/隐藏</span>
          <el-switch v-model="systemStore.toggleStore" />
        </div>
        <div class="drawer-item">
          <span>logo显示/隐藏</span>
          <el-switch v-model="systemStore.toggleStore" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useSystemStore } from '@/stores/systemStore'
const systemStore = useSystemStore()
const drawer = ref(false)
const emit = defineEmits(['onToggleEvent'])
</script>
<style scoped>
.setting {
  position: fixed;
  right: 10px;
  bottom: 100px;
  z-index: 100;
}
.setting :deep(.el-button) {
  border-radius: 50%;
  width: 36px;
  height: 36px;
  background-color: rgba(240, 248, 255, 0);
  /* 基于盒模型布局，受物理像素限制 */
  border: none;
  /* 基于图形渲染，支持亚像素精度 */
  box-shadow: 0 0 0 2px #40a0ff;
}
.setting-icon {
  font-size: 30px;
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
