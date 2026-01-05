/* 
存放所有网络请求地址 */
const base = {
  baseUrl: 'http://localhost:3000', //公共地址
  login: '/api/login', //登录接口
  router: '/api/router', //用户权限
  echart: '/api/echart', //所有图表数据（折线/雷达/饼状）
  projectInfo: '/api/project/all', //隧道信息获取（数据库）
  search: '/api/project/search', //搜索地址
  total: '/api/project/total', //总页地址
}
export default base
