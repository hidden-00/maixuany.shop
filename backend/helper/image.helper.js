const path = require('path');
const fs = require('fs');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const otherHelper = require('./others.helper');
const httpStatus = require('http-status');

const maxFileSize = process.env.maxFileSize || 1000000000;

const CLIENT_ID = '6d2b23112775eb5';
const CLIENT_SECRET = '0e19833ee6026640df95f7c0fb705ffc03543271';

let mimeType = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/svg': 'svg',
    'image/svg+xml': 'svg+xml',
    'image/gif': 'gif',
};

// Hàm xử lý upload ảnh lên Imgur

const uploadToImgur = (destinationPath, dataField) => {
    const temp = maxFileSize / (1024 * 1024);
    var storage = multer.diskStorage({
        destination: destinationPath,
        filename: async (req, file, cb) => {
            const randomString = await otherHelper.generateRandomHexString(15);
            cb(null, randomString + '-' + file.originalname);
        },
    });
    const uploader = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
            const isValid = !!mimeType[file.mimetype]; //check if the valid mime type is submitted
            let error = isValid ? null : new Error('Only images files  allowed!');
            callback(error, isValid);
        },
        limits: { fileSize: maxFileSize },
    });

    var upload = uploader.single(dataField);

    return (fileUpload = (req, res, next) => {
        upload(req, res, async function (error) {
            if (error) {
                //instanceof multer.MulterError
                if (error.code == 'LIMIT_FILE_SIZE') {
                    return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, error, null, `FileSize must be greater than ${temp}MB`, null);
                } else {
                    return otherHelper.sendResponse(res, httpStatus.NOT_ACCEPTABLE, false, error, null, `${error}`, null);
                }
            } else {
                try {
                    const image = fs.readFileSync(req.file.path);
                    const form = new FormData();
                    form.append('image', image, { filename: req.file.originalname });

                    const imgurResponse = await axios.post('https://api.imgur.com/3/upload', form, {
                        headers: {
                            ...form.getHeaders(),
                            'Authorization': `Client-ID ${CLIENT_ID}`, // Thay thế bằng Client ID của bạn
                        }
                    });
                    console.log(imgurResponse.data.data.link);
                    // Xóa file temp sau khi đã upload lên Imgur
                    fs.unlinkSync(req.file.path);
                    next();
                } catch (err) {
                    next(err);
                }
            }
        })
    })
}


module.exports = uploadToImgur