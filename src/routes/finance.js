const express = require('express')
const view = require('../controllers/finance.controller')
const find = require('../controllers/finance.controller')
const bodyparser = require('body-parser');
var router = express()


router.get('/',view.view)
router.post('/find', find.find)

module.exports = router