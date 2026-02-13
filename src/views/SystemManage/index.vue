<template>
  <!-- 搜索和添加  start-->
  <div class="toolbar">
    <!-- @keyup.enter: 监听回车键释放事件，
       用户按下回车键时触发searchHandler搜索函数，
       增强用户体验 -->
    <el-input class="input" v-model="searchInfo" size="large" placeholder="请输入要搜索的信息">
      <template #prefix>
        <el-icon class="button-icon"><Search /></el-icon>
      </template>
    </el-input>
    <div class="button">
      <el-button @click="searchHandler" class="button-search" size="large" type="primary" plain>
        <el-icon class="button-icon"><Search /></el-icon>查询</el-button
      >
      <el-button @click="addHandler" class="button-add" size="large" type="primary" plain>
        <el-icon class="button-icon"><Plus /></el-icon>添加</el-button
      >
    </div>
  </div>
  <!-- 搜索和添加 end -->
  <!-- 表格 start -->
  <el-table :data="usersList.list" style="width: 100%" :header-cell-style="headerClass">
    <el-table-column prop="username" label="用户名称" />
    <el-table-column label="状态">
      <template #default="scope">
        <el-tag :type="scope.row.status === 'normal' ? 'success' : 'danger'">{{
          scope.row.status === 'normal' ? '正常' : '异常'
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="phone" label="手机号码" />
    <el-table-column prop="permission" label="权限" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" type="primary" text @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button size="small" type="danger" text @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 表格 end-->
  <!-- 分页start -->
  <div class="page">
    <span class="page-text"> 共{{ total }}条</span>
    <el-pagination
      @current-change="currentChange"
      layout="prev, pager, next,jumper"
      :default-page-size="defaultPageSize"
      :total="total"
    />
  </div>
  <!-- 分页end -->
  <!-- 添加的对话框 start-->
  <el-dialog v-model="dialogAddVisible" title="Tips" width="35%">
    <div class="dialog-body">
      <el-form :inline="true" :model="addformInfo">
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addformInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addformInfo.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addformInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="permission">
          <el-select v-model="addformInfo.permission" placeholder="请选择一个选项">
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="vip" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="addformInfo.status" size="large" fill="#409eff">
            <el-radio-button value="normal">正常</el-radio-button>
            <el-radio-button value="abnormal">异常</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取消</el-button>
        <el-button type="primary" @click="sureHandler"> 确定</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 添加的对话框 end -->
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
import api from '@/api/index.js'
//初始化总条数
const total = ref(0)
// 初始化分页显示数量
const defaultPageSize = 16
//保存当前页码
const currentPage = ref(0)
//搜索初始化
const searchInfo = ref('')
//"添加对话框"初始化
const dialogAddVisible = ref(false)
//"添加表单的数据"初始化
const addformInfo = reactive({
  username: '',
  password: '',
  phone: '',
  permission: '',
  status: '',
})
/* 设置表格头部样式：headerClass */
const headerClass = () => {
  return {
    background: '#E9F0FF',
    color: '#333',
    fontWeight: 700,
    fontSize: '14px',
    padding: '12px 0',
  }
}
//初始化table内容
const usersList = reactive({ list: [] })
// 获取用户列表
const getUserList = (page = 1) => {
  api
    .getuserList({ page })
    .then((res) => {
      /*       console.log(res.data) */
      if (res.data.status === 200) {
        // 将后端数据在前端展示
        usersList.list = res.data.result
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
//初始化获取页面数据
onMounted(() => {
  getUserList()
  api.getuserTotal().then((res) => {
    //打印user的总条数
    // console.log(res.data.result.total)
    total.value = res.data.result.total
  })
})

// 分页事件
const currentChange = (val) => {
  /* 打印当前点击的页码  console.log(val) */
  //保存当前页码
  currentPage.value = val
  getUserList(val)
}
//搜索按钮
const searchHandler = () => {
  //1.去除首尾空哥，并判断是否为空
  if (!searchInfo.value || searchInfo.value.trim() === '') {
    //如果是空，重新加载所有数据
    getUserList(1)
    return
  }
  api.getsearchUser({ search: searchInfo.value }).then((res) => {
    /*     console.log(res.data) */
    if (res.data.status === 200) {
      // 将搜索结果给到 usersList.list 展示
      usersList.list = res.data.result
    } else {
      usersList.list = []
    }
  })
}
//添加按钮
const addHandler = () => {
  dialogAddVisible.value = true
}
//确定事件
const sureHandler = () => {
  api
    .getaddUser({
      username: addformInfo.username,
      password: addformInfo.password,
      phone: addformInfo.phone,
      permission: addformInfo.permission,
      status: addformInfo.status,
    })
    .then((res) => {
      if (res.data.status === 200) {
        //关闭对话框
        dialogAddVisible.value = false
        //成功提示
        ElMessage.success(res.data.msg)
        //刷新页面
        getUserList(1)
      } else {
        //弹出错误弹窗并打印错误问题
        ElMessage.error(res.data.msg)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
//删除按钮
const handleDelete = (index, row) => {
  console.log(row)

  api
    .getdelUser(row)
    .then(() => {})
    .catch((error) => {
      console.log(error)
    })
}
</script>
<style scoped>
/* 让整张表格拥有圆角并裁剪内部溢出 */
:deep(.el-table) {
  border-radius: 20px !important;
  overflow: hidden; /* 关键：裁剪内部溢出的直角内容 */
}
:deep(.el-table__inner-wrapper::before) {
  display: none; /* 去掉底部的边框线 */
}
.page {
  padding: 12px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
/* toolbar样式 */
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px;
  background: #f6f9ff;
  border: 1px solid #e0e7ff;
  border-radius: 1rem 1rem 0 0;
}
.toolbar .button-icon {
  margin-right: 8px;
  font-size: large;
}
.toolbar .input {
  width: 320px;
}
</style>
