/// To upload files

const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads')
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, `${data}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb)=>{//Picture's format
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
    }else {
        cb(null, false)
    }
}

const limits = { ///limit for pictures
    fileSize: 1024 * 1024 * 5
}

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits

})

