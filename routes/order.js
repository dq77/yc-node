const express = require('express')

const orderController = require('../controllers/orderController')

const upload = require('../util/upload')

const router = express.Router()

router.get('/list', orderController.getOrderList)
router.get('/detail', orderController.getOrderDetail)
router.post('/uploadFile', upload, orderController.uploadFile)
router.post('/savePics', orderController.savePics)
router.post('/addOrder', orderController.addOrder)
router.post('/orderBase', orderController.orderBase)
router.post('/importOrder', orderController.importOrder)
router.post('/changeStatus', orderController.changeStatus)
router.post('/delete', orderController.deleteOrder)
router.post('/confirm', orderController.confirmOrder)
router.post('/reject', orderController.rejectOrder)
module.exports = router
