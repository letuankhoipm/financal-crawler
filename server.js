const express = require('express')
const findByCode = require('./src/controllers/finance.controller')
var app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
//Route
app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(5000, function () {
    console.log('Server is Up')
})
const router = require('./src/routes/finance')
app.use('/finance', router)

app.get('/finance/:id', findByCode.findByCodexGet);
