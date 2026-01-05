import axios from '../utils/request.js'
import base from './base.js'
const api = {
  /* 登录 */
  getLogin(params) {
    return axios.post(base.baseUrl + base.login, params)
  },
  /* 用户权限 */
  getRouter(params) {
    return axios.get(base.baseUrl + base.router, {
      params,
    })
  },
  /* 获取所有图表数据（折线图、雷达图、饼状图） */
  getEchart() {
    return axios.get(base.baseUrl + base.echart)
  },
  /* 读取隧道信息 ,需要获取页码*/
  projectInfo(params) {
    return axios.get(base.baseUrl + base.projectInfo, {
      params,
    })
  },
  /* 模糊查询 */
  getSearch(params) {
    return axios.get(base.baseUrl + base.search, {
      params,
    })
  },
  /* 获取数据总条数 */
  getTotal() {
    return axios.get(base.baseUrl + base.total)
  },
}

export default api
