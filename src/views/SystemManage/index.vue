<template>
  <el-table :data="usersList.list" style="width: 100%" :header-cell-style="headerClass">
    <el-table-column prop="username" label="用户名称" />
    <el-table-column label="状态">
      <template #default="scope">
        <el-tag :type="scope.row.status === '1' ? 'success' : 'danger'">{{
          scope.row.status === '1' ? '正常' : '异常'
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
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
import api from '@/api/index.js'
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
onMounted(() => {
  api
    .getuserList()
    .then((res) => {
      console.log(res.data)
      if (res.data.status === 200) {
        usersList.list = res.data.result
      }
    })
    .catch((error) => {
      console.log(error)
    })
})
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
</style>
