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
  /* 添加隧道 */
  getaddProject(params) {
    return axios.get(base.baseUrl + base.addProject, { params })
  },
  /* 删除隧道 */
  getdelProject(params) {
    return axios.get(base.baseUrl + base.delProject, { params })
  },
  /*隧道预更新 */
  getPreproject(params) {
    return axios.get(base.baseUrl + base.preProject, { params })
  },
  /* 编辑/更新隧道 */
  getupdataProjec(id, params) {
    return axios.put(base.baseUrl + base.updataProject + id, params)
  },
  //隧道设计信息-tree-一级
  gettunnelList() {
    return axios.get(base.baseUrl + base.tunnelList)
  },
  //隧道设计信息-tree-二级
  gettunnelListChild(params) {
    return axios.get(base.baseUrl + base.tunnelListChild, { params })
  },
  //隧道设计信息 内容
  gettunnelContent(params) {
    return axios.get(base.baseUrl + base.tunnelContent, { params })
  },
  //隧道设计信息-content-上传
  getuploadTunnelContent(params) {
    return axios.post(base.baseUrl + base.uploadTunnelContent, params)
  },
  //pdf预览
  getpdfPreView(params) {
    return axios.get(base.baseUrl + base.pdfPreView, { params })
  },
  //获取用户列表
  getuserList(params) {
    return axios.get(base.baseUrl + base.userList, { params })
  },
  //user表的总条数
  getuserTotal() {
    return axios.get(base.baseUrl + base.userTotal)
  },
  //搜索用户
  getsearchUser(params) {
    return axios.get(base.baseUrl + base.searchUser, { params })
  },
  //用户添加
  getaddUser(params) {
    return axios.get(base.baseUrl + base.addUser, { params })
  },
  //用户更新
  getupdateUser(params) {
    return axios.put(base.baseUrl + base.updateUser, params)
  },
  //用户删除
  getdelUser(params) {
    return axios.get(base.baseUrl + base.delUser, { params })
  },
  //用户预更新
  getpreviewUser(params) {
    return axios.get(base.baseUrl + base.previewUser, { params })
  },
}

export default api
