<template>
  <div class="card">
    <div class="box">
      <el-icon class="box-icon" style="color: var(--el-color-primary)"><DataAnalysis /></el-icon>
      <span class="box-title">隧道数量：1000个</span>
    </div>
    <div class="box">
      <el-icon class="box-icon" style="color: var(--el-color-success)"><SuccessFilled /></el-icon>
      <span class="box-title">检验合格：805个</span>
    </div>
    <div class="box">
      <el-icon class="box-icon" style="color: var(--el-color-warning)"><Brush /></el-icon>
      <span class="box-title">正在施工：302个</span>
    </div>
    <div class="box">
      <el-icon class="box-icon" style="color: var(--el-color-info)"><Compass /></el-icon>
      <span class="box-title">地址预报：5000个</span>
    </div>
  </div>
  <div class="line" id="line"></div>
</template>
<script setup>
import { getCurrentInstance, onMounted } from 'vue'
import api from '@/api/index'
const { proxy } = getCurrentInstance()
onMounted(() => {
  // 请求折线图数据
  api
    .getLine()
    .then((res) => {
      console.log(res.data.result.lines)
      // 请求成功后渲染图表
      if (res.data.status === 200) {
        // 调用全局 $line 方法渲染 ECharts 图表，
        // 将服务器数据传递给eCharts.js
        proxy.$line('line', res.data.result.lines)
      }
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>
<style scoped>
.card {
  display: flex;
}
.box {
  /* 均分剩余空间 */
  flex: 1;
  height: 130px;
  margin: 20px;
  padding: 20px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
}
/* 清除左右box的外边距*/
.box:nth-child(1) {
  margin-left: 0;
}
.box:nth-child(4) {
  margin-right: 0;
}
.box-icon {
  font-size: 80px;
  padding-right: 20px;
}
.box-title {
  font-size: 20px;
}
.line {
  width: 100%;
  height: 300px;
  background-color: #fff;
}
</style>
