var express = require('express');
var router = express.Router();
var MovieController = require('../controller/MovieController');
var BookingController = require('../controller/BookingController');
var order = require('../entity/order/Order');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let movieController = new MovieController(await req.movieManager);
  let result = movieController.getIndexMovies();

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

  res.render('booking/tickets', {movie: result});
});

router.post('/booking/setTicketsAmount', async function(req, res, next) {
  req.session.order = req.body;
  req.session.order.totalTicketsAmount = parseInt(req.body.adultAmount) + parseInt(req.body.seniorAmount) + parseInt(req.body.childAmount);
  res.send('OK');
});

router.get('/booking/seats', async function(req, res, next) {
  let seatInfo = {
    isNotOccupiedSeats : 
                        [
                          { row: "A", column: "5" },
                          { row: "A", column: "6" },
                          { row: "A", column: "7" },
                          { row: "A", column: "8" },
                          { row: "J", column: "10" },
                          { row: "J", column: "9" },
                          { row: "J", column: "4" },
                          { row: "J", column: "7" }
                        ], 
    totalTicketsAmount : req.session.order.totalTicketsAmount
  };
  res.render('booking/seats', seatInfo);
});

router.post('/booking/selectSeats', async function(req, res, next) {
  console.log('selectedSeats ->' + JSON.stringify(req.body));
  // req.session.order = req.body;
  // req.session.order.totalTicketsAmount = parseInt(req.body.adultAmount) + parseInt(req.body.seniorAmount) + parseInt(req.body.childAmount);
  res.send('OK');
});

router.get('/booking/confirmOrder', function(req, res, next) {
  let tickets = [
    {
      date: "Thu. May 17",
      time: "7:00PM",
      seat: "A14", 
      price: "$12.99",
      ticketCategory: "Adult"
    }, 
    {
      date: "Thu. May 17",
      time: "7:00PM",
      seat: "A15", 
      price: "$11.49",
      ticketCategory: "Senior"
    }, 
    {
      date: "Thu. May 17",
      time: "7:00PM",
      seat: "A16", 
      price: "$9.99",
      ticketCategory: "Child"
    }
  ]
  console.log('JSON -> ' + JSON.stringify({tickets: tickets, movieBriefInfo: req.session.order.movieBriefInfo, subtotal: req.session.order.subtotal}));
  res.render('booking/confirmOrder', {tickets: tickets, movieBriefInfo: req.session.order.movieBriefInfo, subtotal: req.session.order.subtotal});
});

router.get('/booking/payment', function(req, res, next) {
  res.render('booking/payment');
});

router.get('/booking/paySuccess', function(req, res, next) {
  res.render('booking/paySuccess');
});

module.exports = router;
