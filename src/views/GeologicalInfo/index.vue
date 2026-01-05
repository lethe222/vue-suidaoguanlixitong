<template>
  <div class="about">
    <div class="map" id="map"></div>
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
        const { maps } = res.data.result
        // 渲染地图
        proxy.$beijing('map', maps)
      }
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>
<style scoped>
.map {
  border-radius: 1rem;
  margin: 10px 0;
  width: 100%;
  height: 350px;
  background-color: #fff;
}
</style>
