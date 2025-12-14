<template>
  <div class="nav">
    <div class="toggle-menu">
      <div class="toggle-menu-toggle">
        <el-icon v-if="menuStore.isCollapse" class="menu-icon" @click="openMenu(false)"
          ><Expand
        /></el-icon>
        <el-icon v-else class="menu-icon" @click="closeMenu(true)"><Fold /></el-icon>
      </div>
    </div>
    <div class="toggle-menu-breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item>当前</el-breadcrumb-item>
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ loginStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/userCenter">
              <el-dropdown-item>个人中心 </el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="logoutHandler">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useLoginStore } from '@/stores/loginStore.js'
import { useMenuStore } from '@/stores/menuStore'
import { useRouter } from 'vue-router'
const router = useRouter()
const menuStore = useMenuStore()
const loginStore = useLoginStore()

/* 退出登录按钮 */
const logoutHandler = () => {
  //存储信息清空 并且 回到登录页
  loginStore.token = ''
  //权限清空
  loginStore.permission = ''
  loginStore.username = ''
  localStorage.removeItem('login') // 清除持久化数据
  router.push('/LoginInfo')
}
/* 关闭左侧菜单栏 */
const closeMenu = (flag) => {
  menuStore.isCollapse = flag
}
/* 打开左侧菜单栏 */
const openMenu = (flag) => {
  menuStore.isCollapse = flag
}
</script>
<style scoped>
.nav {
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%);
  position: relative;
}
.toggle-menu {
  padding-top: 17.5px;
  padding-left: 10px;
}
.toggle-menu-toggle {
  float: left;
}
.menu-icon {
  font-size: 25px;
}
.toggle-menu-breadcrumb {
  float: left;
  width: 500px;
  line-height: 60px;
  margin-top: 6px;
  margin-left: 20px;
}
.user {
  position: absolute;
  right: 20px;
  /* 垂直居中 */
  top: 50%;
  transform: translateY(-50%);
}
</style>
