
module.exports = {
    // 查询菜单
    list: `SELECT * FROM menu WHERE menu_id = ? LIMIT 1`,
    // 设置菜单
    edit: `UPDATE menu SET content = ? WHERE menu_id = ?`
}
