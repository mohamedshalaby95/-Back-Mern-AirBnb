const multer = require('multer')
const path = require('path')

module.exports = multer.diskStorage({
  destination: 'uploads/',
  limits: {
    fileSize: 25 * 1024 * 1024, // 25 MB
  },
  filename(req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    )
  },
  filetype(req, file, cb) {
    cb(null, path.extname(file.originalname))
  },
})
