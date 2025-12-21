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
</template>
<script></script>
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
</style>
