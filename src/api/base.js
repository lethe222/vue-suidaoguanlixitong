/* 
存放所有网络请求地址 */
const base = {
  baseUrl: 'http://localhost:3000', //公共地址
  login: '/api/login', //登录接口
  router: '/api/router', //用户权限
  echart: '/api/echart', //所有图表数据（折线/雷达/饼状）
}
export default base
