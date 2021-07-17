var express = require('express');
var router = express.Router();

/* GET canvas page. */
router.get('/', function(req, res, next) {
    res.status = 200;
    res.sendFile(path.join(__dirname, '/public/canvas.html'));
});

module.exports = router;
