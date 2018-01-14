var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/podcast', function(req, res, next) {
  console.log("req received");
  res.send("Here's the string!");
});

module.exports = router;
