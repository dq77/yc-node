const mysql = require('../db/mysql')
const orderService = require('../service/orderService')


// 查询订单列表
exports.getOrderList = function (req, res) {
    let { orderNum, customer, orderStatus, startTime, endTime, orderByColumn, ascOrDesc, page } = req.query
    orderStatus = orderStatus ? [orderStatus] : [1, 2, 3, 4, 5]
    let params = [`%${orderNum}%`, `%${customer}%`, orderStatus, startTime, endTime, (page - 1) * 10]
    mysql.query(orderService.buildOrderListQuery(orderByColumn, ascOrDesc), params).then((data) => {
        mysql.query(orderService.totalCount, params).then((total) => {
            const jsonData = JSON.parse(JSON.stringify(data))
            res.json({
                code: 0,
                total: total[0].total,
                data: jsonData,
            })
        })
    })
}

// 查询订单详情
exports.getOrderDetail = function (req, res) {
    let { id } = req.query
    mysql.query(orderService.orderDetail, id).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}

// 上传文件
exports.uploadFile = function (req, res) {
    console.log(new Date().toLocaleString(), req.file);
    res.json({
        code: 0,
        data: req.file,
    })
}

// 保存订单图片
exports.savePics = function (req, res) {
    let { id, picList, designList } = req.body
    const picListStr = JSON.stringify(picList)
    const designListStr = JSON.stringify(designList)
    mysql.query(orderService.changePic, [picListStr, designListStr, id]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}

// 新建订单
exports.addOrder = function (req, res) {
    let { orderType, customer, orderSize, wantPic, remark, picList, designList, orderNum } = req.body
    const picListStr = JSON.stringify(picList)
    const designListStr = JSON.stringify(designList)
    mysql.query(orderService.addOrder, [orderType, customer, orderSize, wantPic, remark, picListStr, designListStr, orderNum, req.auth.username]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}

// 编辑订单基本信息
exports.orderBase = function (req, res) {
    let { orderType, customer, orderSize, wantPic, remark, id } = req.body
    mysql.query(orderService.editOrder, [orderType, customer, orderSize, wantPic, remark, id]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}

// 导入订单
exports.importOrder = function (req, res) {
    let { orders } = req.body
    const values = orders.map(order => [order.orderType, order.customer, order.orderSize, order.wantPic, order.remark, JSON.stringify(order.picList), JSON.stringify(order.designList), order.orderNum, req.auth.username]);
    mysql.query(orderService.importOrder, [values]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}

// 变更订单状态
exports.changeStatus = function (req, res) {
    let { status, id } = req.body
    mysql.query(orderService.changeStatus, [status, id]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        console.log(new Date().toLocaleString(), status, id, '状态');
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}

// 删除
exports.deleteOrder = function (req, res) {
    let { id } = req.body
    mysql.query(orderService.deleteOrder, id).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}

// 确认订单
exports.confirmOrder = function (req, res) {
    let { orderId, chooseIndex } = req.body
    mysql.query(orderService.confirmOrder, [chooseIndex, orderId]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        console.log(new Date().toLocaleString(), orderId, '确认');
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}

// 驳回订单
exports.rejectOrder = function (req, res) {
    let { orderId, chooseIndex, advice } = req.body
    mysql.query(orderService.rejectOrder, [chooseIndex, advice, orderId]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData[0],
        })
    })
}
