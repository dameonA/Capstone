var express = require('express')
var router = express.Router()

// define the home page route
router.get('/example', function (req, res) {
  res.send('an Example')
})
// define the about route
router.get('/example2', function (req, res) {
  res.send('another example')
})

module.exports = router