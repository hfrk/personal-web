var express = require('express');
var router = express.Router();
var ejs = require('ejs');

/* GET secret. */
router.get('/', function(req, res, next) {
    res.render('pages/secret', { title: 'Express', 'SECRET': process.env.SECRET }, (err, content) => {
        res.render('pages/layout', { title: 'Hfrk\'s', content: content });
    });
});

module.exports = router;
