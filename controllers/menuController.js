const mysql = require('../db/mysql')
const menuService = require('../service/menuService')


exports.list = function (req, res) {
    mysql.query(menuService.list, 1).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0].content,
        })
    })
}

exports.edit = function (req, res) {
    const content = JSON.stringify(req.body.tree)
    mysql.query(menuService.edit, [content, 1]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}
