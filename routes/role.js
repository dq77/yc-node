const express = require('express')

const roleController = require('../controllers/roleController')

const upload = require('../util/upload')

const router = express.Router()

router.post('/upload', upload, (req, res, next) => {
    res.send('上传成功')
})

router.get('/list', roleController.getRoleList)
router.post('/add', roleController.addRole)
router.post('/edit', roleController.editRole)
router.post('/delete', roleController.deleteRole)
router.post('/userRole', roleController.userRole)
module.exports = router
