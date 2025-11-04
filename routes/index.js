const express = require('express')
const userRouter = require('./user')
const loginRouter = require('./login')
const menuRouter = require('./menu')
const roleRouter = require('./role')
const orderRouter = require('./order')
const designRouter = require('./design')
const MediaRouter = require('./media')
const { jwtAuth, accountAuth } = require('../util/userJwt')

const router = express.Router()

router.use(jwtAuth)

// 权限校验中间件
router.use('/api', accountAuth)

router.use('/api/user', userRouter) // 注入用户路由模块
router.use('/api/menu', menuRouter) // 注入菜单路由模块
router.use('/api/role', roleRouter) // 注入角色路由模块
router.use('/api/order', orderRouter) // 注入订单路由模块
router.use('/api/design', designRouter) // 注入设计路由模块
router.use('/api/media', MediaRouter) // 注入视频路由模块
router.use('/api', loginRouter) // 注入登录路由模块

// 异常处理中间件
router.use((err, req, res, next) => {
    if (err && err.name === 'UnauthorizedError') {
        console.log(new Date().toLocaleString(), '鉴权拦截');
        // 抛出token过期异常
        res.status(200).json({
            code: 401,
            message: 'token失效，请重新登录',
            data: null,
        })
    } else {
        console.log(new Date().toLocaleString(), err);
        const { output } = err || {}
        // 错误码和错误信息
        const errCode = (output && output.statusCode) || 500
        const errMsg = (output && output.payload.error) || err.message
        res.status(errCode).json({
            code: errCode,
            message: errMsg,
        })
    }
})
module.exports = router
