
module.exports = {
    // 查询视频列表
    mediaList: `SELECT * FROM user_media WHERE app_name LIKE ? AND user_id = ? AND save_media IN (?) AND export_media IN (?) AND is_delete = 0 ORDER BY media_updated_date desc`,
    exportMedia: `UPDATE user_media SET export_media = 1 WHERE media_path IN (?)`,
    // saveMedia: `SELECT * FROM user_media WHERE media_path IN (?)`,
    saveMedia: `UPDATE user_media SET save_media = 1 WHERE media_path IN (?)`,
    addMedia: `INSERT INTO user_media(user_id,app_name,media_path,image_path,media_name) VALUES ?`,
    removeMedia: `UPDATE user_media SET is_delete = 1 WHERE media_path = ?`,
}
