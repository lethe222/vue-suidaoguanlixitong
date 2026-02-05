<template>
  <iframe :src="pdfUrl" width="100%" height="100%"></iframe>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import api from '@/api/index.js'
const route = useRoute()
const pdfUrl = ref('')
onMounted(() => {
  api
    .getpdfPreView({
      id: route.params.id,
    })
    .then((res) => {
      console.log(res.data)
      if (res.data.status === 200) {
        pdfUrl.value = 'http://localhost:3000/' + res.data.result.fileUrl
      }
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>
