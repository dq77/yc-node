
module.exports = {
    // 查询用户
    userList: `SELECT user_id, user_name, account_state, user_role, update_time, group_info, is_grouper, oprate_user FROM user WHERE group_info LIKE ? AND user_name LIKE ? AND user_role LIKE ? AND account_state IN (?) AND is_grouper IN (?) AND user_status = 1 ORDER BY update_time desc LIMIT ? OFFSET ?`,
    // 查询总数
    totalCount: `SELECT COUNT(*) AS total FROM user WHERE group_info LIKE ? AND user_name LIKE ? AND user_role LIKE ? AND account_state IN (?) AND is_grouper IN (?) AND user_status = 1`,
    // 根据Token获取用户信息
    userInfo: 'SELECT user_id, user_name, user_role, group_info, is_grouper FROM user WHERE user_name = ? AND user_status = 1 AND account_state = 1 LIMIT 1',
    // 新增用户
    addUser: `INSERT INTO user(user_name,user_password,group_info,user_role,oprate_user, is_grouper) VALUES(?,?,?,?,?,?)`,
    // 编辑用户
    editUser: `UPDATE user SET user_name = ?, group_info = ?, user_role = ?, account_state = ?, is_grouper = ?, oprate_user = ? WHERE user_id = ?`,
    // 删除用户
    deleteUser: `UPDATE user SET user_status = 2 WHERE user_id = ?`,
    // 查询用户是否存在
    findExists: `SELECT user_id, user_password FROM user WHERE (user_name = ?) AND user_status = 1`,
    // 更改密码
    changePassword: `UPDATE user SET user_password = ? WHERE user_id = ?`,
}
