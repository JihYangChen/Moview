var express = require('express');
var router = express.Router();
var MovieController = require('../controller/MovieController');
var BookingController = require('../controller/BookingController');
var ReviewController = require('../controller/ReviewController');
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

  let reviewController = new ReviewController(await req.movieManager, req.memberManager);
  console.log('reviews ->>>>>> ', reviewController.getReviews(req.params.movieId));

  res.render('movieDetail', {movie: result});
});

router.get('/booking/tickets/:showingId', async function(req, res, next) {
  let bookingController = new BookingController(await req.cinemaManager, await req.orderManager);
  let result = bookingController.selectShowing('5af11bf5f36d2837eae7806c');

  let orderManager = await req.orderManager;
  let cinemaManager = await req.cinemaManager;
  // orderManager.removeAllTickets();
  // orderManager.removeAllOrders();
  // cinemaManager.updateAllIsOccupiedFalse();

  // if (req.user) {
  //   console.log('1234 -> ', req.user.reviewList[0].getMemberName());
  // }

  // var order = orderManager.getOrderById('5af47af19833fc4d6276de6a');
  // var order_showing = order.showing;
  // var cine_showing = cinemaManager.getShowingById('5af11bf5f36d2837eae7806c');
  // console.log('showingseat -> ', order_showing.getShowingSeatBySeatName('A1'));
  // console.log('cine showingseat -> ', cine_showing.getShowingSeatBySeatName('A1'));
  // // console.log('oreder.showing -> ', order_showing);
  // // console.log('showing -> ', cine_showing);
  // console.log('equality -> ', order_showing === cine_showing);

  res.render('booking/tickets', {movie: result});
});

router.post('/booking/setTicketsAmount', async function(req, res, next) {
  let bookingController = new BookingController(await req.cinemaManager, await req.orderManager);
  req.session.order = req.body;
  req.session.order.totalTicketsAmount = parseInt(req.body.adultAmount) + parseInt(req.body.seniorAmount) + parseInt(req.body.childAmount);
  let result = await bookingController.determineBookingInfo('5af11bf5f36d2837eae7806c', {
      Adult: req.body.adultAmount,
      Senior: req.body.seniorAmount,
      Child: req.body.childAmount
  });
  req.session.order.id = result.orderId;
  req.session.order.isNotOccupiedSeats = result.seats;

  res.send('OK');
});

router.get('/booking/seats', async function(req, res, next) {
  let seatInfo = {
    isNotOccupiedSeats : req.session.order.isNotOccupiedSeats,
    totalTicketsAmount : req.session.order.totalTicketsAmount
  };
  res.render('booking/seats', seatInfo);
});

router.post('/booking/selectSeats', async function(req, res, next) {
  let bookingController = new BookingController(await req.cinemaManager, await req.orderManager);
  let result = bookingController.selectSeats(req.session.order.id, req.body.selectedSeats)
  req.session.order.tickets = result.ticketList;
  
  res.send('OK');
});

router.get('/booking/confirmOrder', function(req, res, next) {
  let tickets = req.session.order.tickets;
  res.render('booking/confirmOrder', {tickets: tickets, movieBriefInfo: req.session.order.movieBriefInfo, subtotal: req.session.order.subtotal});
});

router.get('/booking/payment', function(req, res, next) {
  res.render('booking/payment', {subtotal: req.session.order.subtotal});
});

router.get('/booking/paySuccess', function(req, res, next) {
  let tickets = req.session.order.tickets;
  res.render('booking/paySuccess', {tickets: tickets, movieBriefInfo: req.session.order.movieBriefInfo, orderId: req.session.order.id});
});

module.exports = router;
