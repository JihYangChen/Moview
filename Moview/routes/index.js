var express = require('express');
var router = express.Router();
var MovieController = require('../controller/MovieController');
var BookingController = require('../controller/BookingController');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let movieController = new MovieController(await req.movieManager);
  let bookingController = new BookingController(await req.cinemaManager);
  let cinemaManager = await req.cinemaManager;

  // for test purpose.
  // DeadPool = 5aed48e6f36d2837eae61fcf, Avengers: Infinity war = 5aeec50bf36d2837eae67e72

  let result = movieController.getMovieInfo("5aed48e6f36d2837eae61fcf");
  // let result = movieController.getIndexMovies();
  // let result = cinemaManager.getShowingById('5af11bf5f36d2837eae7806c');
  // let result = bookingController.selectShowing('5af11bf5f36d2837eae7806c');
  console.log("good -> ", result.getDetailMovieInfo());
  res.render('index', { title: 'Express' });
});

router.get('/movieDetail', function(req, res, next) {
  res.render('movieDetail');
});

router.get('/tickets', function(req, res, next) {
  res.render('tickets');
});

router.get('/seats', function(req, res, next) {
  res.render('seats');
});

router.get('/confirmOrder', function(req, res, next) {
  res.render('confirmOrder');
});

router.get('/payment', function(req, res, next) {
  res.render('payment');
});

router.get('/paySuccess', function(req, res, next) {
  res.render('paySuccess');
});

module.exports = router;
