var express = require('express');
const uploadToImgur = require('../helper/image.helper');
var router = express.Router();

router.post('/', uploadToImgur('temp', 'image'), (req, res)=>{
    res.send(req);
})

module.exports = router;
