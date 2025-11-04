const express = require('express')

const mediaController = require('../controllers/mediaController')

const router = express.Router()

router.get('/list', mediaController.getMediaList)
router.post('/export', mediaController.exportMedia)
router.post('/save', mediaController.saveMedia)
router.post('/add', mediaController.addMedia)
router.post('/remove', mediaController.removeMedia)
module.exports = router
