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
        <el-button class="button-add" size="large" type="primary" plain @click="addHandler">
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
      <el-table-column
        :remark="editformInfo.remark"
        show-overflow-tooltip
        prop="remark"
        label="备注"
      >
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
      <span class="page-text"> 共{{ total }}条</span>
      <el-pagination
        @current-change="currentChange"
        layout="prev, pager, next,jumper"
        :default-page-size="defaultPageSize"
        :total="total"
      />
    </div>
    <!-- 分页end -->
    <!--添加按钮- 对话框start -->
    <el-dialog v-model="dialogAddVisible" title="添加隧道信息" width="40%">
      <div class="dialog-body">
        <el-form :inline="true" :model="addformInfo">
          <el-form-item label="项目名称">
            <el-input v-model="addformInfo.name" placeholder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item label="项目编码">
            <el-input v-model="addformInfo.number" placeholder="请输入项目编码"></el-input>
          </el-form-item>
          <el-form-item label="项目金额">
            <el-input
              v-model="addformInfo.money"
              placeholder="请输入项目金额"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目地址">
            <el-input v-model="addformInfo.address" placeholder="请输入项目地址"></el-input>
          </el-form-item>
          <el-form-item label="项目工期">
            <el-input
              v-model="addformInfo.duration"
              placeholder="请输入工期(月)"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="开工时间">
            <!--  value-format="x"将时间转为时间戳 -->
            <el-date-picker
              v-model="addformInfo.startTime"
              type="date"
              placeholder="请输入开工时间"
              value-format="x"
            />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="addformInfo.endTime"
              type="date"
              placeholder="请输入结束时间"
              value-format="x"
            />
          </el-form-item>
          <el-form-item label="隧道数量">
            <el-input
              v-model="addformInfo.quantity"
              placeholder="请输入隧道数量"
              type="number"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目状态">
            <el-select v-model="addformInfo.status" placeholder="请输入项目状态">
              <el-option label="已完成" value="0" />
              <el-option label="施工中" value="1" />
            </el-select>
          </el-form-item>

          <div class="dialog-remark">
            <el-form-item class="remark-item" label="备注">
              <!-- @onDataEvent="getDataHandler" 接收回调数据 -->
              <tingmceEditor :options="options" @onDataEvent="getInfoEditorHandler" />
            </el-form-item>
          </div>
        </el-form>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogAddVisible = false">取消</el-button>
          <el-button type="primary" @click="sureHandler"> 确定</el-button>
        </div>
      </template>
    </el-dialog>
    <!--添加按钮-  对话框end -->
    <!--编辑按钮- 对话框start -->
    <!--     destroy-on-close关闭对话框时完全销毁对话框 -->
    <el-dialog destroy-on-close v-model="dialogEditVisible" title="编辑隧道信息" width="40%">
      <div class="dialog-body">
        <el-form :inline="true" :model="editformInfo">
          <el-form-item label="项目名称">
            <el-input v-model="editformInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="项目编码">
            <el-input v-model="editformInfo.number"></el-input>
          </el-form-item>
          <el-form-item label="项目金额">
            <el-input v-model="editformInfo.money" type="number"></el-input>
          </el-form-item>
          <el-form-item label="项目地址">
            <el-input v-model="editformInfo.address"></el-input>
          </el-form-item>
          <el-form-item label="项目工期">
            <el-input v-model="editformInfo.duration" type="number"></el-input>
          </el-form-item>
          <el-form-item label="开工时间">
            <!--  value-format="x"将时间转为时间戳 -->
            <el-date-picker v-model="editformInfo.startTime" type="date" value-format="x" />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker v-model="editformInfo.endTime" type="date" value-format="x" />
          </el-form-item>
          <el-form-item label="隧道数量">
            <el-input v-model="editformInfo.quantity" type="number"></el-input>
          </el-form-item>
          <el-form-item label="项目状态">
            <el-select v-model="editformInfo.status">
              <el-option label="已完成" value="0" />
              <el-option label="施工中" value="1" />
            </el-select>
          </el-form-item>

          <div class="dialog-remark">
            <el-form-item class="remark-item" label="备注">
              <!-- @onDataEvent="getDataHandler" 接收回调数据 -->
              <tingmceEditor
                :editorID="editorID"
                :options="options"
                :remark="editformInfo.remark"
                @onDataEvent="getInfoEditorHandler"
              />
            </el-form-item>
          </div>
        </el-form>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取消</el-button>
          <el-button type="primary" @click="sureEditHandler"> 确定</el-button>
        </div>
      </template>
    </el-dialog>
    <!--编辑按钮- 对话框end-->
  </div>
</template>

<script setup>
import api from '@/api/index'
import { onMounted, reactive, ref } from 'vue'
import { dateFormater } from '@/utils/utils'
/* tingmce引入 */
import tingmceEditor from '@/components/tingmceEditor.vue'
//定义修改数据的唯一ID
const editorID = ref(0)
/* 记录当前页码 */
const currentPage = ref(1)
/* 添加表单数据 */
const addformInfo = reactive({
  name: '',
  number: '',
  money: '',
  address: '',
  duration: '',
  startTime: '',
  endTime: '',
  quantity: '',
  status: '',
  remark: '',
})
/* 修改表单数据 */
const editformInfo = reactive({
  name: '',
  number: '',
  money: '',
  address: '',
  duration: '',
  startTime: '',
  endTime: '',
  quantity: '',
  status: '',
  remark: '',
})
/* 添加对话框控制器 */
const dialogAddVisible = ref(false)
//编辑对话框控制器
const dialogEditVisible = ref(false)
/* 初始化分页计数 */
const total = ref(0)
/* 初始化分页显示数量*/
const defaultPageSize = 16
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
/* 初始化获取页面数据 */
onMounted(() => {
  api.getTotal().then((res) => {
    /*  打印总条数   console.log(res.data.result.total) */
    if (res.data.status === 200) {
      total.value = res.data.result.total
    } else {
      total.value = 0
    }
  })
})
/* 初始获取总条数 */
onMounted(() => {
  http(currentPage.value)
})
/*搜索初始化状态  */
const searchInfo = ref('')
/* 搜索按钮 */
const searchHandler = () => {
  // 1. 去除首尾空格，并判断是否为空
  if (!searchInfo.value || searchInfo.value.trim() === '') {
    return
  }
  api.getSearch({ search: searchInfo.value }).then((res) => {
    /*     console.log(res.data) */
    if (res.data.status === 200) {
      projectInfo.list = res.data.result
    } else {
      projectInfo.list = []
    }
  })
}
/* 分页事件 */
const currentChange = (val) => {
  /* 打印当前点击的页码  console.log(val) */
  //保存当前页码
  currentPage.value = val
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
  // console.log(index, row)
  editorID.value = row.id
  api
    .getPreproject({ id: row.id })
    .then((res) => {
      if (res.data.status === 200) {
        // console.log(res.data.result)
        editformInfo.name = res.data.result.name
        editformInfo.number = res.data.result.number
        editformInfo.money = res.data.result.money
        editformInfo.address = res.data.result.address
        editformInfo.duration = res.data.result.duration
        //修改日期格式
        editformInfo.startTime = Number(res.data.result.startTime)
        editformInfo.endTime = Number(res.data.result.endTime)
        editformInfo.quantity = res.data.result.quantity
        editformInfo.status = res.data.result.status
        editformInfo.remark = res.data.result.remark
        // 在数据加载完成后再打开对话框，防止出现空值
        dialogEditVisible.value = true
      } else {
        ElMessage.error(res.data.msg)
      }
    })

    .catch((error) => {
      console.log(error)
    })
}
//修改提交富文本编辑器数据
const getInfoEditorHandler = (data) => {
  /*   console.log(data) */
  //接受tinymce子级传递的值
  editformInfo.remark = data
}
//编辑按钮-对话框确定事件
const sureEditHandler = () => {
  api
    .getupdataProjec(editorID.value, {
      name: editformInfo.name,
      number: editformInfo.number,
      money: editformInfo.money,
      address: editformInfo.address,
      duration: editformInfo.duration,
      startTime: editformInfo.startTime,
      endTime: editformInfo.endTime,
      quantity: editformInfo.quantity,
      status: editformInfo.status,
      remark: editformInfo.remark,
    })
    .then((res) => {
      if (res.data.status === 200) {
        //去掉对话框
        dialogEditVisible.value = false
        //刷新页面
        http(currentPage.value)
      } else {
        ElMessage.error(res.data.msg)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
//删除按钮
const handleDelete = (index, row) => {
  /*   console.log(row.id) */
  ElMessageBox.confirm('确认删除吗', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      api.getdelProject({ id: row.id }).then((res) => {
        if (res.data.status === 200) {
          console.log(res.data)
          /* 调用成功tips */
          ElMessage({
            type: 'success',
            message: res.data.msg,
          })
          /* 刷新ui */
          http(currentPage.value)
        } else {
          /* 调用失败tips */
          ElMessage({
            type: 'error',
            message: res.data.msg,
          })
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
/* 添加按钮-对话框弹出事件 */
const addHandler = () => {
  dialogAddVisible.value = true
}
/* 添加按钮-对话框确定事件 */
const sureHandler = () => {
  api
    .getaddProject({
      name: addformInfo.name,
      number: addformInfo.number,
      money: addformInfo.money,
      address: addformInfo.address,
      duration: addformInfo.duration,
      startTime: addformInfo.startTime,
      endTime: addformInfo.endTime,
      quantity: addformInfo.quantity,
      status: addformInfo.status,
      remark: addformInfo.remark,
    })
    .then((res) => {
      if (res.data.status === 200) {
        console.log(res.data)
        //去掉对话框
        dialogAddVisible.value = false
        //刷新页面
        http(currentPage.value)
        console.log(addformInfo)
      } else {
        ElMessage.error(res.data.msg)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

/*  tingmce富文本编辑器*/
//定义富文本编辑器的宽高
const options = {
  width: '100%',
  height: '200px',
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
.page-text {
  padding: 0 20px;
}
/* 移除分页背景色 */
:deep(.el-pagination .btn-prev),
:deep(.el-pagination .btn-next),
:deep(.el-pagination .el-pager li) {
  background-color: #ffffff00;
}
/* 处理备注独占一行 */
:deep(.remark-item) {
  display: block;
  width: 100%;
}

:deep(.remark-item .el-form-item__content) {
  width: 100% !important;
}
</style>
