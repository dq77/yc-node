const mysql = require('../db/mysql')
const loginService = require('../service/loginService')
const jwt = require('jsonwebtoken')


exports.login = function (req, res) {
    
    mysql.query(loginService.login, [req.body.username, req.body.password]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        if (jsonData.length) {
            if(jsonData[0].account_state == 0) {
                res.json({
                    message: '账号异常，请联系系统管理员处理',
                    code: 1,
                })
                return
            }
            const { username } = req.body
            const token = jwt.sign(
                {
                    username,
                },
                'diaoqi',
                {
                    // 过期时间
                    expiresIn: 60 * 60 * 24,
                }
            )
            console.log(new Date().toLocaleString(), req.body.username, '登录');
            res.json({
                message: '登录成功',
                data: {
                    jwtToken: token,
                    userInfo: jsonData[0],

                },
                code: 0,
            })
        } else {
            console.log(new Date().toLocaleString(), req.body.username, req.body.password, '攻击');
            res.json({
                message: '用户名或密码错误',
                code: 1,
            })
        }
    })
}
