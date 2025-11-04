const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

process.env.TZ = 'Asia/Shanghai';

const app = express()
// 解析application/x-www-form-urlencoded数据格式
app.use(bodyParser.urlencoded({ extended: true }))
// 解析json格式
app.use(bodyParser.json())
// 解析text-plain 数据格式
app.use(bodyParser.text())
// 跨域
app.use(cors())
// 中间件
const myLogger = function (req, res, next) {
    console.log('logged')
    next()
}
// app.use(myLogger)
app.use('/', routes)

// 访问静态文件
app.use(express.static('public'))

//删除
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.listen(4002, () => {
    console.log(new Date().toLocaleString(), 'server is running');
})
