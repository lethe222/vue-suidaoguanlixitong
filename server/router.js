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
//文件上传/文件管理
const multer = require('multer')
const fs = require('fs')
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
  LIMIT 15 ：页显示多少个？限制只取 16条 
  OFFSET 的意思是“偏移量”或“跳过
  (page - 1) * 16 可以理解为(1 - 1) * 16 = 0
  */
  const sql = 'select * FROM project order by id desc limit 16 offset ' + (page - 1) * 16
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
/* 获得project总页数 */
router.get('/project/total', (req, res) => {
  const sql = 'select count(*) as total from project'
  SQLConnect(sql, null, (result) => {
    /* 判断是否有数据 */
    if (result.length > 0) {
      res.send({
        status: 200,
        result: { total: Number(result[0].total) },
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无数据',
      })
    }
  })
})
/* 隧道添加 */
router.get('/project/add', (req, res) => {
  const name = url.parse(req.url, true).query.name || ''
  const number = url.parse(req.url, true).query.number || ''
  const money = url.parse(req.url, true).query.money || ''
  const address = url.parse(req.url, true).query.address || ''
  const duration = url.parse(req.url, true).query.duration || ''
  const startTime = url.parse(req.url, true).query.startTime || ''
  const endTime = url.parse(req.url, true).query.endTime || ''
  const quantity = url.parse(req.url, true).query.quantity || ''
  const status = url.parse(req.url, true).query.status || ''
  const remark = url.parse(req.url, true).query.remark || ''
  const sql = 'insert into project values (null,?,?,?,?,?,?,?,?,?,?)'
  const arr = [name, number, money, address, duration, startTime, endTime, quantity, status, remark]
  SQLConnect(sql, arr, (result) => {
    /* 判断是否有影响行术 */
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '添加成功',
      })
    } else {
      res.send({
        status: 500,
        msg: '添加失败',
      })
    }
  })
})
/* 隧道信息删除 */
router.get('/project/del', (req, res) => {
  var id = url.parse(req.url, true).query.id
  const sql = 'DELETE FROM `project` WHERE id=? '
  SQLConnect(sql, id, (result) => {
    /* 判断是否有数据 */
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '删除成功',
      })
    } else {
      res.send({
        status: 500,
        msg: '删除失败',
      })
    }
  })
})
/* 隧道 预更新 */
router.get('/project/update/pre', (req, res) => {
  const id = url.parse(req.url, true).query.id
  const sql = 'select * from project where id=?'
  SQLConnect(sql, [id], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result: result[0],
      })
    } else {
      res.send({
        status: 500,
        msg: '预更新失败',
      })
    }
  })
})
/* 修改隧道 
restFull API
get
post
put
del
...
*/
router.put('/project/update/:id', (req, res) => {
  const id = req.params.id
  /*   console.log(id)
  console.log(req.body) */
  const { name, number, money, address, duration, startTime, endTime, quantity, status, remark } =
    req.body
  const sql =
    'update project set name=?,number=?,money=?,address=?,duration=?,startTime=?,endTime=?,quantity=?,status=?,remark=? where id=?'
  const arr = [
    name,
    number,
    money,
    address,
    duration,
    startTime,
    endTime,
    quantity,
    status,
    remark,
    id,
  ]
  SQLConnect(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '修改成功',
      })
    } else {
      res.send({ status: 500, msg: '修改失败' })
    }
  })
})
/* 隧道设计信息 tree列表 一级 */
router.get('/tunnel/list', (req, res) => {
  const sql = 'select * from tunnel'
  SQLConnect(sql, null, (result) => {
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
/* 隧道设计信息 tree列表 二级 */
router.get('/tunnel/list/child', (req, res) => {
  const cid = url.parse(req.url, true).query.cid
  const sql = 'select * from tunnelchild where cid=?'
  SQLConnect(sql, [cid], (result) => {
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
/*   隧道设计信息 内容*/
router.get('/tunnel/content', (req, res) => {
  const content = url.parse(req.url, true).query.content
  const sql = 'select *from tunnelcontent where content=?'
  SQLConnect(sql, [content], (result) => {
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
/* 文件上传 
http://localhost:3000/api/upload/
*/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})

var createFolder = function (folder) {
  try {
    fs.accessSync(folder)
  } catch (e) {
    fs.mkdirSync(folder)
  }
}

var uploadFolder = './upload/'
createFolder(uploadFolder)
var upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), function (req, res, next) {
  var file = req.file
  console.log('文件类型：%s', file.mimetype)
  console.log('原始文件名：%s', file.originalname)
  console.log('文件大小：%s', file.size)
  console.log('文件保存路径：%s', file.path)
  res.json({ res_code: '0', name: file.originalname, url: file.path })
})
/* 
更新隧道设计信息-content-url
*/
router.post('/tunnel/content/url', (req, res, next) => {
  // 从请求体(req.body)中获取id，因为是POST请求
  const id = req.body.id
  // 从请求体(req.body)中获取url，并命名为fileUrl以避免与顶部的url模块变量名冲突
  const fileUrl = req.body.fileUrl
  //数据库
  const sql = 'update tunnelcontent set fileUrl=? where id=?'
  SQLConnect(sql, [fileUrl, id], (result) => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '上传成功',
      })
    } else {
      res.send({ status: 500, msg: '上传失败' })
    }
  })
})
/* PDF预览 */
router.get('/tunnel/pdf', (req, res) => {
  const id = url.parse(req.url, true).query.id
  const sql = 'select *from tunnelcontent where id=?'
  SQLConnect(sql, [id], (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result: result[0],
      })
    } else {
      res.send({ status: 500, msg: '暂无pdf数据' })
    }
  })
})
/* 用户列表 */
router.get('/user/list', (req, res) => {
  /* 分页 */
  var page = url.parse(req.url, true).query.page || 1
  /*  ORDER BY id ASC：ASC就是从小到大排。
  LIMIT 15 ：页显示多少个？限制只取 16条 
  OFFSET 的意思是“偏移量”或“跳过
  (page - 1) * 16 可以理解为(1 - 1) * 16 = 0
  */
  const sql = 'select * FROM user order by id asc limit 16 offset ' + (page - 1) * 16
  SQLConnect(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result,
      })
    } else {
      res.send({ status: 500, msg: '暂无用户数据' })
    }
  })
})
/* 获得user总页数 */
router.get('/user/total', (req, res) => {
  const sql = 'select count(*) as total from user'
  SQLConnect(sql, null, (result) => {
    /* 判断是否有数据 */
    if (result.length > 0) {
      res.send({
        status: 200,
        result: { total: Number(result[0].total) },
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无数据',
      })
    }
  })
})
/* 用户模糊查询 */
router.get('/user/search', (req, res) => {
  //接受参数：查询内容
  const search = url.parse(req.url, true).query.search
  /* 模糊查询sql语句编写 
  concat(username,phone,permission)里边是要查询的内容*/
  const sql = "select * from user where concat(username,phone,permission) like '%" + search + "%'"
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
