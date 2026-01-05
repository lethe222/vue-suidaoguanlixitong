<template>
  <div class="about">
    <!-- 搜索和添加 start -->
    <div class="search">
      <!-- @keyup.enter: 监听回车键释放事件，
       用户按下回车键时触发searchHandler搜索函数，
       增强用户体验 -->
      <el-input
        class="input"
        v-model="searchInfo"
        size="large"
        placeholder="请输入要搜索的信息"
        @keyup.enter="searchHandler"
      >
        <template #prefix>
          <el-icon class="button-icon"><Search /></el-icon>
        </template>
      </el-input>
      <div class="button">
        <el-button @click="searchHandler" class="button-search" size="large" type="primary" plain>
          <el-icon class="button-icon"><Search /></el-icon>查询
        </el-button>
        <el-button class="button-add" size="large" type="primary" plain>
          <el-icon class="button-icon"><Plus /></el-icon>添加
        </el-button>
      </div>
    </div>
    <!-- 搜索和添加 end -->

    <!-- 表格数据 start -->
    <el-table :data="projectInfo.list" :header-cell-style="headerClass" style="width: 100%">
      <el-table-column prop="name" label="项目名称" width="180" />
      <el-table-column prop="number" label="项目编码" width="100" />
      <el-table-column prop="money" label="项目金额" width="100" />
      <el-table-column prop="address" label="项目地址" width="100" />
      <el-table-column prop="duration" label="工期(月)" width="100" />
      <!-- 转成数字时间戳再格式化，防止字符串被当作无效日期 -->
      <el-table-column
        :formatter="(value) => dateFormater(Number(value.startTime))"
        prop="startTime"
        label="开工时间"
        width="150"
      />
      <el-table-column
        :formatter="(value) => dateFormater(Number(value.endTime))"
        prop="endTime"
        label="结束时间"
        width="150"
      />
      <el-table-column prop="quantity" label="隧道数量" width="90" />

      <el-table-column prop="status" label="项目状态" width="120">
        <template #default="scope">
          <el-tag :type="scope.row.status === '1' ? 'danger' : 'success'">{{
            scope.row.status === '1' ? '施工中' : '已完成'
          }}</el-tag>
        </template>
      </el-table-column>
      <!--  show-overflow-tooltip一行展示，不换行-->
      <el-table-column show-overflow-tooltip prop="remark" label="备注">
        <template #default="{ row }">
          <div v-html="row.remark"></div>
        </template>
      </el-table-column>
      <el-table-column width="140" label="操作">
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
    <!-- 表格数据 end -->
    <!-- 分页start -->
    <div class="page">
      <el-pagination @current-change="currentChange" layout="prev, pager, next" :total="1000" />
    </div>

    <!-- 分页end -->
  </div>
</template>
<script setup>
import api from '@/api/index'
import { onMounted, reactive, ref } from 'vue'
import { dateFormater } from '@/utils/utils'
const projectInfo = reactive({
  list: [],
})
/* 网络请求 */
const http = (page) => {
  api
    .projectInfo({ page })
    .then((res) => {
      /*       console.log(res.data) */
      if (res.data.status === 200) {
        projectInfo.list = res.data.result
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
onMounted(() => {
  http(1)
})

/*搜索初始化状态  */
const searchInfo = ref('')
/* 搜索按钮 */
const searchHandler = () => {
  console.log(searchInfo.value)
  api.getSearch({ search: searchInfo.value }).then((res) => {
    console.log(res.data)
    if (res.data.status === 200) {
      projectInfo.list = res.data.result
    } else {
      projectInfo.list = []
    }
  })
}
/* 分页事件 */
const currentChange = (val) => {
  console.log(val)
  http(val)
}

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
/* 编辑/删除 */
const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}
</script>

<style scoped>
.about {
  border-radius: 12px;
}

/* 让整张表格拥有圆角并裁剪内部溢出 */
:deep(.el-table) {
  border-radius: 0 0 1rem 1rem;
  overflow: hidden;
}
/* 修改 el-input 的圆角 */
:deep(.input .el-input__wrapper) {
  border-radius: 0.5rem;
}
.search {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: #f6f9ff;
  border: 1px solid #e0e7ff;
  border-radius: 1rem 1rem 0 0;
  border-bottom: 0px solid #e0e7ff;
}
.button-icon {
  margin-right: 4px;
  font-size: large;
}

.search .input {
  width: 320px;
}

.search .button {
  display: flex;
  gap: 0px; /* 按钮之间的间距 */
}
.page {
  padding: 12px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
/* 移除分页背景色 */
:deep(.el-pagination .btn-prev),
:deep(.el-pagination .btn-next),
:deep(.el-pagination .el-pager li) {
  background-color: #ffffff00;
}
</style>
