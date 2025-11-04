
module.exports = {
    // 查询角色
    roleList: `SELECT * FROM role WHERE role_name LIKE ? AND role_state IN (?) AND is_delete = 1 ORDER BY role_updated_date desc LIMIT ? OFFSET ?`,
    // 查询总数
    totalCount: `SELECT COUNT(*) AS total FROM role WHERE role_name LIKE ? AND role_state IN (?) AND is_delete = 1`,
    // 新增角色
    addRole: `INSERT INTO role(role_name,role_menu,oprate_user) VALUES(?,?,?)`,
    // 编辑角色
    editRole: `UPDATE role SET role_name = ?, role_state = ?, role_menu = ?, oprate_user = ? WHERE role_id = ?`,
    // 同步角色名到用户表
    changeUserRole: `UPDATE user SET user_role = ? WHERE user_role = ?`,
    // 删除角色前查询是否有用户引用
    checkUserRole: `SELECT user_name FROM user WHERE user_role = ?`,
    // 删除角色
    deleteRole: `UPDATE role SET is_delete = 2 WHERE role_id = ?`,
    // 查询角色是否存在
    findExists: `SELECT role_id FROM role WHERE role_name = ? AND is_delete = 1`,

    userRole: `SELECT * FROM role WHERE role_name IN (?);`,
}
