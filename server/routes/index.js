var express = require('express');
var router = express.Router()
var controller = require('../controller/indexController')

router.get('/', controller.timeline)
router.get('/search', controller.search )
router.post('/post', controller.post )


module.exports = router;
