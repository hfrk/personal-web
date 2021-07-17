var express = require('express');
var router = express.Router();

/* GET echo listing. */
router.get('/', (req, res) => {
  res.status(200);
  res.send(req.body);
});

module.exports = router;
