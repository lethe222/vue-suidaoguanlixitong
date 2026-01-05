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
  <div class="charts">
    <div class="radar" id="radar"></div>
    <div class="piechart" id="piechart"></div>
    <div class="barchart" id="barchart"></div>
  </div>
</template>
<script setup>
import { getCurrentInstance, onMounted } from 'vue'
import api from '@/api/index'
const { proxy } = getCurrentInstance()
onMounted(() => {
  // 请求所有图表数据
  api
    .getEchart()
    .then((res) => {
      /*       console.log(res.data.result) */
      // 请求成功后分别渲染各图表
      if (res.data.status === 200) {
        const { lines, radars, piecharts, barcharts } = res.data.result
        // 渲染折线图
        proxy.$line('line', lines)
        // 渲染雷达图
        proxy.$radar('radar', radars)
        // 渲染饼状图
        proxy.$piechart('piechart', piecharts)
        // 渲染柱状图
        proxy.$barchart('barchart', barcharts)
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
  margin: 10px;
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
  border-radius: 1rem;
  margin: 10px 0;
  width: 100%;
  height: 350px;
  background-color: #fff;
}
.charts {
  display: flex;
}
.charts div {
  border-radius: 1rem;
  margin: 10px 0;
  flex: 1;
  height: 450px;
  margin: 10px;
  padding: 10px;
  background-color: #fff;
}
/* 清除左右box的外边距*/
.charts div:nth-child(1) {
  margin-left: 0;
}
.charts div:nth-child(3) {
  margin-right: 0;
}
</style>
