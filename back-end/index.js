const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const config = require('config-lite')(__dirname)
const routes = require('./routes')
const pkg = require('./package')
//引入multer
// const multer = require('multer')

const app = express()
const cors = require('cors')

app.use(express.static(path.join(__dirname, 'static')))

app.use(cors())

//注册一个对象，dest里放的是上传的文件存储的位置，可以在当前目录下，建立一个static目录，上传的文件都放在这里
// const upload = multer({dest: './static/'})

//使用中间件，没有挂载路径，应用的每个请求都会执行该中间件。any表示接受一切，具体参考文档。
// app.use(upload.any())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))
// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}))

// 路由
routes(app)

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})
