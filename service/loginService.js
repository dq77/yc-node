
module.exports = {
    // 登录
    login: 'SELECT * FROM `user` WHERE `user_name` = ? AND `user_password` = ? AND user_status = 1 LIMIT 1',
}
