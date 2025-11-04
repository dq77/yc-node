
module.exports = {
    // 查询订单
    buildOrderListQuery: (orderByColumn, ascOrDesc) => {
        return `SELECT * FROM order_list WHERE order_num LIKE ? AND customer LIKE ? AND order_status IN (?) AND create_time BETWEEN ? AND ? AND is_delete = 1 ORDER BY ${orderByColumn} ${ascOrDesc} LIMIT 10 OFFSET ?`;
    },
    orderDetail: `SELECT * FROM order_list WHERE id = ?`,
    // 查询总数
    totalCount: `SELECT COUNT(*) AS total FROM order_list WHERE order_num LIKE ? AND customer LIKE ? AND order_status IN (?) AND create_time BETWEEN ? AND ? AND is_delete = 1`,
    // 保存订单图片
    changePic: `UPDATE order_list SET pic_list = ?, design_list = ? WHERE id = ?`,
    // 新增订单
    addOrder: `INSERT INTO order_list(order_type,customer,order_size,want_pic,remark,pic_list,design_list,order_num,creat_user_name) VALUES(?,?,?,?,?,?,?,?,?)`,
    // 编辑订单
    editOrder: `UPDATE order_list SET order_type = ?, customer = ?, order_size = ?, want_pic = ?, remark = ? WHERE id = ?`,
    // 批量导入
    importOrder: `INSERT INTO order_list(order_type,customer,order_size,want_pic,remark,pic_list,design_list,order_num,creat_user_name) VALUES ?`,
    // 变更订单状态
    changeStatus: `UPDATE order_list SET order_status = ? WHERE id = ?`,
    // 确认订单
    confirmOrder: `UPDATE order_list SET order_status = 5, choose_index = ? WHERE id = ?`,
    // 驳回订单
    rejectOrder: `UPDATE order_list SET order_status = 4, choose_index = ?, advice = ? WHERE id = ?`,
    // 删除订单
    deleteOrder: `UPDATE order_list SET is_delete = 2 WHERE id = ?`,
}
