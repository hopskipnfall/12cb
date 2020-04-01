var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.baseUrl === '') {
    res.redirect(`/en/index.html`);
    return;
  }

  if (!req.baseUrl.startsWith('/en') && !req.baseUrl.startsWith('en')) {
    res.redirect(`en/${req.baseUrl}`);
    return;
  } else if (req.baseUrl.indexOf('.') == -1) {
    res.sendFile(path.resolve('public/en/index.html'));
    return;
  }
});

module.exports = router;
