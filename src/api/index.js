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
}

export default api
