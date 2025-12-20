<template>
  <div class="slider-nav" :style="{ width: menuStore.isCollapse ? '64px' : '210px' }">
    <div v-show="myToggle" class="logo">{{ menuStore.isCollapse ? '隧道' : '隧道工程项目' }}</div>
    <el-menu
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-active="active"
      router
      class="el-menu-vaertical-demo"
      :collapse="menuStore.isCollapse"
    >
      <!-- 循环生成视图，不会增加页面结构 -->
      <template v-for="(item, index) of menuStore.menus" :key="index">
        <!--   有二级菜单渲染这个 -->
        <el-sub-menu v-if="item.children" :index="item.path">
          <template #title>
            <component :is="item.icon" class="menu-icon"></component>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(childItem, childIndex) of item.children"
            :key="childIndex"
            :index="childItem.path"
          >
            <span>{{ childItem.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <!--  无二级菜单渲染这个-->
        <el-menu-item v-else :index="item.path">
          <!-- 动态渲染图标 -->
          <component :is="item.icon" class="menu-icon"></component>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
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
/* 接收父传子 */
const props = defineProps({
  myToggle: {
    type: Boolean,
    default: false,
  },
})
</script>
<style scoped>
.slider-nav {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 210px;
  background-color: #304156;
  transition: width 0.3s ease-in;
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
  transition: all 0.3s ease-in;
  overflow: hidden; /* 防止文字溢出 */
  white-space: nowrap; /* 文字不换行 */
}

/* 禁用 Element Plus 的所有内置过渡动画 */
:deep(.el-menu-item),
:deep(.el-menu-item *) {
  transition: none !important;
}

.menu-icon {
  width: 18px !important;
  height: 18px !important;
  margin-right: 10px;
  flex-shrink: 0; /* 防止图标被压缩 */
}

/* 文字样式 */
:deep(.el-menu-item span) {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  opacity: 1;
  width: auto;
  transition:
    opacity 0.3s ease-in,
    width 0.3s ease-in;
}

/* 折叠时：文字淡出 */
:deep(.el-menu--collapse .el-menu-item span) {
  opacity: 0;
  width: 0;
  margin: 0;
  padding: 0;
}

/* 折叠时：移除图标右边距 */
:deep(.el-menu--collapse .menu-icon) {
  margin-right: 0;
}
</style>
