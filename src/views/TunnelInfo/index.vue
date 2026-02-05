<template>
  <div class="tunnel-container">
    <div class="tunnel-list">
      <h3>隧道断面</h3>
      <!-- 懒加载子节点，需与 load 方法结合使用 -->
      <el-tree :load="loadNode" lazy :props="defaultProps" @node-click="handleNodeClick" />
    </div>
    <div class="tunnel-content">
      <el-table :data="tableData.data" style="width: 100%">
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="tunnelname" label="隧道名称" />
        <el-table-column prop="imagename" label="图片名称" />
        <el-table-column prop="num" label="代号" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              text
              @click="previewHandler(scope.$index, scope.row)"
              >预览</el-button
            >
            <el-button
              size="small"
              type="info"
              text
              @click="updateHandler(scope.$index, scope.row)"
            >
              上传
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 上传对话框  start-->
  <el-dialog center v-model="dialogUploadVisible" title="上传文件" width="500" destroy-on-close>
    <el-upload
      v-model:file-list="fileList"
      class="upload"
      drag
      action="http://localhost:3000/api/upload"
      :limit="1"
      :on-exceed="handleExceed"
      :on-success="handlePdfSuccess"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogUploadVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogUploadVisible = false"> 确定 </el-button>
      </div>
      <!-- 上传对话框  end-->
    </template>
  </el-dialog>
</template>
<script setup>
import api from '@/api/index.js'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
//获取路由实例
const router = useRouter()
// 定义上传文件列表
const fileList = ref([])
//初始化对话框按钮
const dialogUploadVisible = ref(false)
//存储当前行的id
const currentID = ref(0)
const tableData = reactive({
  data: [],
})
const defaultProps = {
  children: 'children',
  label: 'name',
}
const handleNodeClick = (data) => {
  /*   console.log(data) */
  /*   console.log('点击节点，准备请求参数 content =', data.content) */
  api
    .gettunnelContent({
      content: data.content,
    })
    .then((res) => {
      // console.log(res.data)
      if (res.data.status === 200) {
        tableData.data = res.data.result
        /*         console.log(res.data.result) */
      } else {
        tableData.data = []
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
const loadNode = (node, resolve) => {
  //一级节点

  if (node.level === 0) {
    console.log(node.level)
    api.gettunnelList().then((res) => {
      if (res.data.status === 200) {
        resolve(res.data.result)
      } else {
        resolve([])
      }
    })
  }
  //二级节点
  if (node.level === 1) {
    /*     console.log(node) */
    api
      .gettunnelListChild({
        //请求带有cid的参数
        cid: node.data.cid,
      })
      .then((res) => {
        if (res.data.status === 200) {
          resolve(res.data.result)
        } else {
          //返回空数组
          resolve([])
        }
      })
  }
  //大于二级节点
  if (node.level > 1) {
    //返回空数组
    resolve([])
  }
}

//预览
const previewHandler = (index, row) => {
  //跳转到pdf预览界面
  router.push({
    path: '/PDFViewer' + row.id,
  })
}
//上传
const updateHandler = (index, row) => {
  //点击上传按钮弹出对话框
  /*   console.log(row.id) */
  currentID.value = row.id
  dialogUploadVisible.value = true
}
//上传文件超出
const handleExceed = () => {
  console.log('上传文件超出')
}
//上传成功
const handlePdfSuccess = (response, uploadFile) => {
  /*   console.log(response, uploadFile) */
  console.log(response.url.substr(7))
  api
    .getuploadTunnelContent({
      id: currentID.value,
      //去除upload//，并将地址返回后端
      fileUrl: response.url.substr(7),
    })
    .then((res) => {
      console.log(res.data.msg)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
<style scoped>
.tunnel-container {
  display: flex;
}
.tunnel-list {
  width: 250px;
  background-color: #fff;
  padding: 10px;
  margin-right: 20px;
}
.tunnel-list h3 {
  font-size: 15px;
  font-weight: 700;
}
.tunnel-content {
  flex: 1;
}
</style>
