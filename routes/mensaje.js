var express = require('express')
var router = express.Router()

/* GET anotaciones page. */
router.get('/', function(req, res, next) {
  res.render('anotaciones')
})

module.exports = router