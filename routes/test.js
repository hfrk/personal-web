var express = require('express');
var router = express.Router();
var ejs = require('ejs');

/* GET test page. */
router.get('/', function(req, res, next) {
    res.render('pages/test', (err, content) => {
        res.render('pages/layout', { title: 'Hfrk\'s', content: content });
    });
});

module.exports = router;
