var express = require('express');
var router = express.Router();
var ejs = require('ejs');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('pages/index', (err, content) => {
        res.render('pages/layout', { title: 'Hfrk\'s', content: content });
    });
});

module.exports = router;
