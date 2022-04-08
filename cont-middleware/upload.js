const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        // const parts = file.mimetype.split("/");
        cb(null, `${file.originalname}`)
        // cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
});

const upload = multer({storage});

module.exports = upload;