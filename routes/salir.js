var express = require('express')
var router = express.Router()

/* GET salir page. */
router.get('/', function(req, res, next) {
  res.render('salir')
})

module.exports = router