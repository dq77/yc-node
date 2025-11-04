const { expressjwt: jwt } = require('express-jwt')
const userService = require('../service/userService')
const mysql = require('../db/mysql')

const secret = 'diaoqi'

// 验证token过期
const jwtAuth = jwt({
    secret, // 密钥
    algorithms: ['HS256'], // 签名算法
}).unless({
    path: ['/api/login', '/api/register', /^\/images\/.*/, /^\/statics\/.*/], // unless 设置jwt认证白名单
})

const accountAuth = async (req, res, next) => {
    // 排除不需要权限校验的路径
    const excludePaths = ['/login', '/register']
    const shouldExclude = excludePaths.some(path => {
      return typeof path === 'string' ? path === req.path : path.test(req.path)
    })
    if (shouldExclude) {
      return next()
    }
    const { username } = req.auth
    const data = await mysql.query(userService.userInfo, username)
    const jsonData = JSON.parse(JSON.stringify(data))
    const user = jsonData[0]
    if (!user) {
        return res.json({ message: '账号异常，请联系系统管理员处理', code: 401 });
    }
    next()
}

module.exports = { jwtAuth, accountAuth }
