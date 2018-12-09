const path = require('path')
const configs = require('../configs')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, res, next) => {
        next(null, 'fileupload/')
    },
    filename: (req, file, next) => {
        next(null, Date.now() + '_' + file.originalname)
    }
})


const upload = multer({
    storage: storage,
    limits: {fileSize: configs.MAX_IMAGE_SIZE},
    fileFilter: (req, file, cb) => {
        checkTypeImage(file, cb)
    }
}).single('image')


const checkTypeImage = (file, cb) => {
    const fileTypes = /jpeg|png|jpg/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    if (extName) {
        return cb(null, true)
    } else {
        cb({message: 'ERROR: Image type error !'})
    }
}

const uploadFile = (req, res) => {
    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}

module.exports = {
    uploadFile
}