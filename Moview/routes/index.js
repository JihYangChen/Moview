var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/movieDetail', function(req, res, next) {
  res.render('movieDetail');
});

router.get('/tickets', function(req, res, next) {
  res.render('tickets');
});

module.exports = router;
