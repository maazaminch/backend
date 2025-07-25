
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname) //+ '-' + uniqueSuffix -> u can use this inside if suffix used

    }
})

const upload = multer({ storage: storage }) //in Es6 u can use storage, instead of storage: storage

module.exports = upload; 