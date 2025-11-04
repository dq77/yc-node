const fs = require('fs')
const path = require('path')
const multer = require('multer')
const uuid = require('uuid')

const memoryDest = path.join(__dirname, '../public/images')

const storage = multer.diskStorage({
    // 文件存储位置
    destination: (req, file, cb) => {
        const date = new Date().toISOString().split('T')[0]; // 生成格式如 "2023-01-26"
        const uploadPath = path.join(memoryDest, date);

        // 检查文件夹是否存在，不存在需要创建
        const isExit = fs.existsSync(uploadPath)
        if (!isExit) {
            fs.mkdirSync(uploadPath)
        }
        cb(null, uploadPath)
    },
    // 文件名
    filename: (req, file, cb) => {
        // 生成唯一文件名
        const uid = uuid.v1()
        // 文件扩展名
        const ext = path.extname(file.originalname)
        cb(null, uid + ext)
    },
})

function fileFilter(req, file, cb) {
    if (!file) {
        cb(null, false)
    } else {
        cb(null, true)
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024,
    },
}).single('file') // 上传时的fieldname必须为file

module.exports = upload
