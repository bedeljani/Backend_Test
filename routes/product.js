'use strict'

const express = require('express')
const router  = express.Router()
const Product = require('../controllers/productController')
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({ storage : storage }).array('files',5);


router.get('/', Product.index)
router.get('/:id', Product.show )
router.post('/', upload, Product.create)
router.patch('/:id', upload, Product.update)
router.delete('/:id', Product.delete)


module.exports = router;
