const mysql = require('../db/mysql')
const mediaService = require('../service/mediaService')


// 查询视频列表
exports.getMediaList = function (req, res) {
    let { appName, userId, historyMedia, exportMedia } = req.query

    historyMedia = historyMedia ? [historyMedia - 0] : [1, 0]
    exportMedia = exportMedia ? [exportMedia - 0] : [1, 0]
    mysql.query(mediaService.mediaList, [appName, userId, historyMedia, exportMedia]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData,
        })
    })
}

// 批量入库视频
exports.addMedia = function (req, res) {
    let { mediaList } = req.body
    const insertList = mediaList.map(item => {
        return [item.userId, item.appName, item.mediaPath, item.imagePath, item.mediaName ]
    })
    mysql.query(mediaService.addMedia, [insertList]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData,
        })
    })
}

// 批量导出视频
exports.exportMedia = function (req, res) {
    let { mediaPathList } = req.body
    mysql.query(mediaService.exportMedia, [mediaPathList]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData,
        })
    })
}

// 批量保存视频
exports.saveMedia = function (req, res) {
    let { mediaPathList } = req.body
    console.log(mediaPathList)
    mysql.query(mediaService.saveMedia, [mediaPathList]).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData,
        })
    })
}

// 删除视频
exports.removeMedia = function (req, res) {
    let { mediaPath } = req.body
    mysql.query(mediaService.removeMedia, mediaPath).then((data) => {
        const jsonData = JSON.parse(JSON.stringify(data))
        res.json({
            code: 0,
            data: jsonData,
        })
    })
}

