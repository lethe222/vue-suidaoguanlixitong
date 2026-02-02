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
        <el-table-column prop="num" label="数字" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" text @click="previewHandler">预览</el-button>
            <el-button size="small" type="info" text @click=""> 上传 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script setup>
import api from '@/api/index.js'
import { reactive, ref } from 'vue'
const tableData = reactive({
  data: [],
})
const defaultProps = {
  children: 'children',
  label: 'name',
}
const handleNodeClick = (data) => {
  // console.log(data)
  api
    .gettunnelContent({
      content: data.content,
    })
    .then((res) => {
      // console.log(res.data)
      if (res.data.status === 200) {
        tableData.data = res.data.result
        /*       console.log(res.data.result) */
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
const loadNode = (node, resolve) => {
  //一级节点

  if (node.level === 0) {
    /*     console.log(node.level) */
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
const previewHandler = () => {}
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
