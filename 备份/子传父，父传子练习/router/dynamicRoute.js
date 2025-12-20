const manage = {
  // 工作监督管理
  path: '/work-manage',
  name: 'workManage',
  component: () => import('../views/WorkManage/index.vue'),
  meta: {
    requiresAuth: true,
    key: '工作监督管理',
  },
}
export default manage
