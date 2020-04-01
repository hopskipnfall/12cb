var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect(`en/index.html`)
});

router.get('/.*', function(req, res, next) {
  res.redirect(`en/${req.baseUrl}`);
});

module.exports = router;
