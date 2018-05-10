var express = require('express');
var router = express.Router();
var MovieController = require('../controller/MovieController');
var BookingController = require('../controller/BookingController');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let movieController = new MovieController(await req.movieManager);
  let cinemaManager = await req.cinemaManager;

  // for test purpose.
  // DeadPool = 5aed48e6f36d2837eae61fcf, Avengers: Infinity war = 5aeec50bf36d2837eae67e72

  // let result = movieController.getMovieInfo("5aed48e6f36d2837eae61fcf");
  let result = movieController.getIndexMovies();
  // let result = cinemaManager.getShowingById('5af11bf5f36d2837eae7806c');
  // let result = bookingController.selectShowing('5af11bf5f36d2837eae7806c');

  res.render('index', {inTheaterMovies: result[0], comingSoonMovies: result[1]});
});

router.get('/movieDetail/:movieId', async function(req, res, next) {
  let movieController = new MovieController(await req.movieManager);
  let result = movieController.getMovieInfo(req.params.movieId);

  res.render('movieDetail', {movie: result});
});

router.get('/booking/tickets/:showingId', async function(req, res, next) {
  let bookingController = new BookingController(await req.cinemaManager);
  let result = bookingController.selectShowing('5af11bf5f36d2837eae7806c');
  // let result = bookingController.selectShowing(req.params.showingId);

  res.render('booking/tickets', {movie: result});
});

router.post('/booking/setTicketsAmount', async function(req, res, next) {
  req.session.order = req.body;
  console.log('123')
  res.send('OK');
});

router.get('/booking/seats', async function(req, res, next) {
  res.render('booking/seats');
});

router.get('/booking/confirmOrder', function(req, res, next) {
  res.render('booking/confirmOrder');
});

router.get('/booking/payment', function(req, res, next) {
  res.render('booking/payment');
});

router.get('/booking/paySuccess', function(req, res, next) {
  res.render('booking/paySuccess');
});

module.exports = router;
