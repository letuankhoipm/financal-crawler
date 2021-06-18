const express = require('express')
const findByCode = require('../controllers/finance.controller')
var router = express()

router.post('/getByPost', findByCode.findByCodePost)

module.exports = router