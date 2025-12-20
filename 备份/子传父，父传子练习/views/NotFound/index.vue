<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <!-- 404 大标题 -->
      <div class="error-code">404</div>

      <!-- 错误提示信息 -->
      <div class="error-title">页面未找到</div>
      <div class="error-desc">抱歉，您访问的页面不存在或已被移除</div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <el-button type="primary" size="large" @click="goHome">
          <el-icon style="margin-right: 5px"><House /></el-icon>
          返回首页
        </el-button>
        <el-button size="large" @click="goBack">
          <el-icon style="margin-right: 5px"><Back /></el-icon>
          返回上一页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { House, Back, QuestionFilled } from '@element-plus/icons-vue'

const router = useRouter()

// 返回首页
const goHome = () => {
  router.push('/')
}

// 返回上一页
const goBack = () => {
  router.back()
}
</script>

<style scoped>
.not-found-container {
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
  position: relative;
  overflow: hidden;
}

.not-found-content {
  text-align: center;
  z-index: 2;
  position: relative;
  padding: 40px;
}

/* 404 数字样式 */
.error-code {
  font-size: 180px;
  font-weight: bold;
  color: #304156;
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
  animation: bounce 2s ease-in-out infinite;
}

/* 错误标题 */
.error-title {
  font-size: 32px;
  color: #304156;
  font-weight: 600;
  margin-bottom: 15px;
}

/* 错误描述 */
.error-desc {
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
}

/* 按钮容器 */
.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

/* 弹跳动画 */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-code {
    font-size: 120px;
  }

  .error-title {
    font-size: 24px;
  }

  .error-desc {
    font-size: 14px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
  }

  .action-buttons :deep(.el-button) {
    width: 200px;
  }
}

/* Element Plus 按钮样式覆盖 */
:deep(.el-button--primary) {
  background-color: #304156;
  border-color: #304156;
}

:deep(.el-button--primary:hover) {
  background-color: #364e6d;
  border-color: #364e6d;
}
</style>
