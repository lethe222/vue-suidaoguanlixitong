/* 存放所有网络请求地址 */
const base = {
  baseUrl: 'http://localhost:3000', //公共地址
  login: '/api/login', //登录接口
  router: '/api/router', //用户权限
  echart: '/api/echart', //所有图表数据（折线/雷达/饼状）
  projectInfo: '/api/project/all', //隧道信息获取（数据库）
  search: '/api/project/search', //搜索地址
  total: '/api/project/total', //总页地址
  addProject: '/api/project/add', //添加隧道
  delProject: '/api/project/del', //删除隧道
  preProject: '/api/project/update/pre', //预更新数据
  updataProject: '/api/project/update/', //编辑隧道（隧道更新）
  tunnelList: '/api/tunnel/list', //隧道设计信息-tree-一级
  tunnelListChild: '/api/tunnel/list/child', //隧道设计信息-tree-二级
  tunnelContent: '/api/tunnel/content', //隧道设计信息 内容
  uploadTunnelContent: '/api/tunnel/content/url', //隧道设计信息-content-上传
  pdfPreView: '/api/tunnel/pdf', //pdf预览
  userList: '/api/user/list', //用户列表
  userTotal: '/api/user/total', //user的总页地址
  searchUser: '/api/user/search', //用户搜索
  addUser: '/api/user/add', //用户添加
  updateUser: '/api/user/update', //用户更新
  delUser: '/api/user/del', //用户删除
  previewUser: '/api/user/preview', //用户预更新
}
export default base
