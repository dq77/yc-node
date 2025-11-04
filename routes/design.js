const express = require('express')

const designController = require('../controllers/designController')

const router = express.Router()

router.get('/list', designController.getDesignList)
module.exports = router
