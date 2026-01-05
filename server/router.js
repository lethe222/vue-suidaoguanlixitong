const express = require('express')
const router = express.Router()
const url = require('url')
const SQLConnect = require('./SqlConnect.js')
const jwt = require('jsonwebtoken')
const adminData = require('./data/admin.js')
const vipData = require('./data/vip.js')
const echartData = require('./data/echart.js')
//导入密钥
const jwtSecret = require('./jwtSecret.js')

//添加接口
/* router.get('/list', (req, res) => {
  res.send({
    status: 200,
    messages: '测试服务器',
  })
}) */
/* 登陆接口 */
router.post('/login', (req, res) => {
  //接受客户端的参数：usename，password
  const { username, password } = req.body
  const sql = 'select * from user where username=? and password=?'
  SQLConnect(sql, [username, password], (result) => {
    if (result.length > 0) {
      /* 生成token */
      const token = jwt.sign(
        {
          id: result[0].id,
          username: result[0].username,
          permission: result[0].permission,
        },
        jwtSecret.secret,
      )

      res.send({
        status: 200,
        username: result[0].username,
        permission: result[0].permission,
        token,
      })
    } else {
      //没有查询到数据
      res.send({
        status: 500,
        msg: '用户名密码错误',
      })
    }
  })
})
/* 用户权限管理 */
router.get('/router', (req, res) => {
  const permission = url.parse(req.url, true).query.permission // 改为permission更清晰
  switch (permission) {
    case 'admin':
      res.send({
        status: 200,
        menuData: adminData,
      })
      break
    case 'vip':
      res.send({
        status: 200,
        menuData: vipData,
      })
      break
    default:
      res.send({
        status: 200,
        menuData: vipData,
      })
      break
  }
})
/* 获取所有图表数据（折线图、雷达图、饼状图） */
router.get('/echart', (req, res) => {
  res.send({
    status: 200,
    result: echartData,
  })
})
/* 隧道信息查询 */
router.get('/project/all', (req, res) => {
  /* 分页 */
  var page = url.parse(req.url, true).query.page || 1
  /*   ORDER BY id DESC：DESC就是从大到小排。
  LIMIT 15 ：页显示多少个？限制只取 15 条 
  OFFSET 的意思是“偏移量”或“跳过
  (page - 1) * 15可以理解为(1 - 1) * 15 = 0
  */
  const sql = 'select * FROM project order by id desc limit 15 offset ' + (page - 1) * 15
  SQLConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无信息',
      })
    }
  })
})
/* 隧道模糊查询 */
router.get('/project/search', (req, res) => {
  //接受参数：查询内容
  const search = url.parse(req.url, true).query.search
  /* 模糊查询sql语句编写 */
  const sql = "select * from project where concat(name,address,remark) like '%" + search + "%'"
  SQLConnect(sql, null, (result) => {
    /* 判断是否有数据 */
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无数据',
      })
    }
  })
})
/* 获得总页数 */
router.get('/project/total', (req, res) => {
  const sql = 'select count(*) from project where id'
  SQLConnect(sql, null, (result) => {
    /* 判断是否有数据 */
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无数据',
      })
    }
  })
})
module.exports = router
