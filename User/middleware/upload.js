const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + file.originalname)
    }
  })
  const upload = multer({ storage: storage ,
    limits: {
        fileSize: 1024 * 1024 * 5
    }, 
    fileFilter: function (req, file, cd) {
        if (file.mimetype==="image/png" || file.mimetype==="image/jpeg" || file.mimetype==="image/jpg") {
            cd(null, true)
        } else {
            cd(null, false)
        }
    }
    })

    module.exports = upload 