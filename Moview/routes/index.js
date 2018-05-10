var express = require('express');
var router = express.Router();
var MovieController = require('../controller/MovieController');
var BookingController = require('../controller/BookingController');
var order = require('../entity/order/Order');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let movieController = new MovieController(await req.movieManager);
  let bookingController = new BookingController(await req.cinemaManager, await req.orderManager);
  let cinemaManager = await req.cinemaManager;
  let orderManager = await req.orderManager;

  // for test purpose.
  // DeadPool = 5aed48e6f36d2837eae61fcf, Avengers: Infinity war = 5aeec50bf36d2837eae67e72

  // let result = movieController.getMovieInfo("5aed48e6f36d2837eae61fcf");
  // let result = movieController.getIndexMovies();
  // let result = cinemaManager.getShowingById('5af11bf5f36d2837eae7806c');
  // let result = bookingController.selectShowing('5af11bf5f36d2837eae7806c');
  // let result = new order('', {
  //   Adult: "3",
  //   Senior: "0",
  //   Child: "1",
  //  });
  // let reault = bookingController.determineBookingInfo('5af11bf5f36d2837eae7806c', {
  //                                                                                   Adult: "2",
  //                                                                                   Senior: "1",
  //                                                                                   Child: "1",
  //                                                                                 });
  console.log("good -> ", bookingController.selectSeats('5af45d79ef5d0b5d6b78781b', ["A1", "A2", "A3", "A4"]));
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
