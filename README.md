## 项目所需要使用到的技术栈

### 核心技术栈

**基本框架**：Vue 3.5.22
**构建工具**：Vite 7.1.10
**包管理器**：pnpm
**语言**：JavaScript (支持 TypeScript)

### 主要依赖

1. **路由管理**：Vue Router 4.6.3
2. **状态管理**：Pinia 3.0.3
3. **网络请求**：Axios 1.12.2
4. **UI组件库**：Element Plus 2.11.5
5. **图表库**：ECharts 6.0.0
6. **国际化**：Vue I18n 12.0.0-alpha.3
7. **仓库持久化存储**：pinia-plugin-persist
8. **代码格式化**：Prettier 3.6.2
9. **ElementPlus字体图标**：element-plus/icons-vue

### 跨域的解决方案

一.前台
1.jsonp
2.Proxy(开发环境生效)
二.后台
1.cors解决跨域

### JSON Web Token 入门教程

https://ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html

### 参考的网站

1. https://xvmb20251217143847970.worktile.com/preference-setting/language
2. https://sa60sybrr0.feishu.cn/next/messenger/
3. https://ai.feishu.cn/drive/ai-notes/ 4.https://ones.cn/project/#/workspace/team/4YDes243/filter/view/ft-t-001

### 设计规范

大圆角：2rem;
小圆角：0.5rem;

### 编辑功能，数据回显

1. 拿到当前表格中的数据，重新赋值到编辑对话框中
2. 通过网络请求获取新的对应此条数据（预更新）
