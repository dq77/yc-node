const mysql = require('../db/mysql')
const userService = require('../service/userService')


// 查询用户列表
exports.getUserList = function (req, res) {
    let { userName, userRole, groupInfo, account_state, is_grouper, page, pageSize } = req.query
    groupInfo = `%${groupInfo}%`
    userName = `%${userName}%`
    userRole = `%${userRole}%`
    account_state = account_state ? [account_state] : [1, 0]
    is_grouper = is_grouper ? [is_grouper] : [1, 0]
    mysql.query(userService.userList, [groupInfo, userName, userRole, account_state, is_grouper, pageSize - 0, (page - 1) * pageSize]).then((data) => {
        mysql.query(userService.totalCount, [groupInfo, userName, userRole, account_state, is_grouper]).then((total) => {
            const jsonData = JSON.parse(JSON.stringify(data))
            res.json({
                code: 0,
                total: total[0].total,
                data: jsonData,
            })
        })
    })
}

// 根据token获取当前用户信息
exports.getUserInfo = function (req, res) {
    mysql.query(userService.userInfo, req.auth.username).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}

// 新增用户
exports.addUser = function (req, res) {
    let { userName, password, group_info, roles, is_grouper } = req.body
    mysql.query(userService.findExists, [userName]).then((exists) => {
        const existsList = JSON.parse(JSON.stringify(exists))
        if(existsList.length) {
            res.json({
                code: 1,
                message: '用户名已存在',
            })
        } else {
            const oprateUser = req.auth.username
            mysql.query(userService.addUser, [userName, password, group_info, roles, oprateUser, is_grouper]).then((data) => {
                const jsonData = JSON.parse(JSON.stringify(data))
                res.json({
                    code: 0,
                    data: jsonData[0],
                })
            })
        }
    })
}

// 编辑用户
exports.editUser = function (req, res) {
    let { userName, group_info, roles, account_state, is_grouper, user_id } = req.body
    const oprateUser = req.auth.username
    mysql.query(userService.editUser, [userName, group_info, roles, account_state, is_grouper, oprateUser, user_id]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}

// 删除用户
exports.deleteUser = function (req, res) {
    let { id } = req.body
    mysql.query(userService.deleteUser, id).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}

// 修改密码
exports.password = function (req, res) {
    const userName = req.auth.username
    let { oldPassword, newPassword, user_id } = req.body
    mysql.query(userService.findExists, [userName, '']).then((users) => {
        const userList = JSON.parse(JSON.stringify(users))
        const user = userList[0]
        const userID = user_id || user.user_id
        if(user.user_password === oldPassword || user_id) {
            mysql.query(userService.changePassword, [newPassword, userID]).then((data) => {
                const jsonData = JSON.parse(JSON.stringify(data))
                res.json({
                    code: 0,
                    data: jsonData[0],
                })
            })
        } else {
            res.json({
                code: 1,
                message: '旧密码错误',
            })
        }
    })
}
