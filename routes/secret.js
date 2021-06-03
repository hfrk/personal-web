var express = require('express');
var router = express.Router();

/* GET secret. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', SECRET: process.env.SECRET });
});

module.exports = router;
