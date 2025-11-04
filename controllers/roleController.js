const mysql = require('../db/mysql')
const roleService = require('../service/roleService')


// 查询角色列表
exports.getRoleList = function (req, res) {
    let { roleName, roleState, page, pageSize } = req.query

    roleName = `%${roleName}%`
    roleState = roleState ? [roleState] : [1, 0]
    mysql.query(roleService.roleList, [roleName, roleState, pageSize - 0, (page - 1) * pageSize]).then((data) => {
        mysql.query(roleService.totalCount, [roleName, roleState]).then((total) => {
            const jsonData = JSON.parse(JSON.stringify(data))
            res.json({
                code: 0,
                total: total[0].total,
                data: jsonData,
            })
        })
    })
}

// 新增角色
exports.addRole = function (req, res) {
    let { roleName, menu } = req.body
    mysql.query(roleService.findExists, roleName).then((exists) => {
        const existsList = JSON.parse(JSON.stringify(exists))
        if(existsList.length) {
            res.json({
                code: 1,
                message: '角色名称已存在',
            })
        } else {
            const oprateUser = req.auth.username
            const menuStr = JSON.stringify(menu)
            mysql.query(roleService.addRole, [roleName, menuStr, oprateUser]).then((data) => {
                const jsonData = JSON.parse(JSON.stringify(data))
                res.json({
                    code: 0,
                    data: jsonData[0],
                })
            })
        }
    })
}

// 编辑角色
exports.editRole = function (req, res) {
    let { roleName, role_state, menu, id, oldRoleName } = req.body
    const oprateUser = req.auth.username
    const menuStr = JSON.stringify(menu)
    if(oldRoleName) {
        mysql.query(roleService.changeUserRole, [roleName, oldRoleName])
    }
    mysql.query(roleService.editRole, [roleName, role_state, menuStr, oprateUser, id]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}

// 删除角色
exports.deleteRole = function (req, res) {
    let { id, role_name } = req.body
    mysql.query(roleService.checkUserRole, role_name).then((exists) => {
        const existsList = JSON.parse(JSON.stringify(exists))
        if(existsList.length) {
            res.json({
                code: 1,
                message: '存在用户引用该角色',
            })
        } else {
            mysql.query(roleService.deleteRole, id).then((data) => {
                const jsonData = JSON.parse(JSON.stringify(data))
                res.json({
                    code: 0,
                    data: jsonData[0],
                })
            })
        }
    })
}

// 获取登录用户拥有的所有角色及对应的菜单权限
exports.userRole = function (req, res) {
    let { roles } = req.body
    mysql.query(roleService.userRole, [roles]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData,
        })
    })
}
