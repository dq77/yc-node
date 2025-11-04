const express = require('express')

const menuController = require('../controllers/menuController')


const router = express.Router()

router.get('/list', menuController.list)
router.post('/edit', menuController.edit)
module.exports = router
