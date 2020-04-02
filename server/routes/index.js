var express = require('express');
var router = express.Router();
var path = require('path');

const locales = ['en', 'ja'];
const LANGUAGE_COOKIE_NAME = 'language_override';

function guessLanguage(req) {
  const cookieVal = req.cookies[LANGUAGE_COOKIE_NAME];
  if (cookieVal && locales.includes(cookieVal)) {
    return cookieVal;
  }
  return req.locale || 'en';
}

/* GET home page. */
router.get('/', function(req, res, next) {
  const lang = guessLanguage(req);

  if (req.baseUrl === '') {
    res.redirect(`/${lang}/`);
    return;
  }

  if (!locales.find(l => req.baseUrl.startsWith('/' + l))) {
    res.redirect(`/${lang}/${req.baseUrl}`);
    return;
  } else if (req.baseUrl.indexOf('.') == -1) {
    res.sendFile(path.resolve(`public/${lang}/index.html`));
    return;
  }
});

module.exports = router;
