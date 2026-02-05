<template>
  <h3>PDF预览</h3>
  <VuePdf v-for="page in numOfPages" :key="page" :src="pdfUrl" :page="page" />
</template>
<script setup>
import { useRoute } from 'vue-router'
import api from '@/api/index.js'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm'
const route = useRoute()
const pdfUrl = ref('')
const numOfPages = ref(0)
onMounted(() => {
  api
    .getpdfPreView({
      id: route.params.id,
    })
    .then((res) => {
      console.log(res.data)
      if (res.data.status === 200) {
        pdfUrl.value = 'http://localhost:3000/' + res.data.result.fileUrl
        const loadingTask = createLoadingTask(pdfUrl.value)
        loadingTask.promise.then((pdf) => {
          numOfPages.value = pdf.numPages
        })
      }
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>
