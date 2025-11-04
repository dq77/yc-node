
module.exports = {
    // 查询订单
    designList: `SELECT * FROM order_list WHERE order_num LIKE ? AND customer LIKE ? AND order_status IN (?) AND create_time BETWEEN ? AND ? AND is_delete = 1 ORDER BY ?? `,
    // 查询总数
    totalCount: `SELECT COUNT(*) AS total FROM order_list WHERE order_num LIKE ? AND customer LIKE ? AND order_status IN (?) AND create_time BETWEEN ? AND ? AND is_delete = 1`,
    
}
