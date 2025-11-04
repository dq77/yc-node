const mysql = require('../db/mysql')
const designService = require('../service/designService')


// 查询设计列表
exports.getDesignList = function (req, res) {
    let { orderNum, customer, orderStatus, startTime, endTime, orderByColumn, ascOrDesc, page } = req.query
    orderStatus = orderStatus ? [orderStatus] : [2,3,4,5]
    let params = [`%${orderNum}%`, `%${customer}%`, orderStatus, startTime, endTime, orderByColumn]
    let sql = designService.designList + `${ascOrDesc} LIMIT 10 OFFSET ?`
    mysql.query(sql, [...params, (page - 1) * 10]).then((data) => {
        mysql.query(designService.totalCount, params).then((total) => {
            const jsonData = JSON.parse(JSON.stringify(data))
            res.json({
                code: 0,
                total: total[0].total,
                data: jsonData,
            })
        })
    })
}
