const express = require('express')

const userController = require('../controllers/userController')

const router = express.Router()


router.get('/info', userController.getUserInfo)
router.get('/list', userController.getUserList)
router.post('/add', userController.addUser)
router.post('/edit', userController.editUser)
router.post('/delete', userController.deleteUser)
router.post('/password', userController.password)
module.exports = router
