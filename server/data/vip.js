module.exports = {
  menus: [
    { path: '/', name: '首页', icon: 'House' },
    { path: '/project-info', name: '项目基础信息', icon: 'Connection' },
    { path: '/tunnel-info', name: '隧道设计信息', icon: 'MessageBox' },
    {
      path: '/build-manage',
      name: '施工监控检测',
      icon: 'ElementPlus',
      children: [
        {
          path: '/plan',
          name: '检测计划',
        },
        {
          path: '/section',
          name: '切面检测',
        },
      ],
    },
    { path: '/geological-info', name: '超前地址预报', icon: 'Reading' },
    { path: '/system-manage', name: '系统信息管理', icon: 'Guide' },
  ],
}
