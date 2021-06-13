var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function(req, res, next) {
  res.render('test', { title: 'Hfrk\'s' });
});

module.exports = router;
