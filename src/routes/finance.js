const express = require('express')
const finance = require('../controllers/finance.controller')
var router = express()
router.post('/getAll', finance.getAll)
module.exports = router