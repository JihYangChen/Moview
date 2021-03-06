var express = require('express');
var router = express.Router();
var MovieController = require('../controller/MovieController');
var BookingController = require('../controller/BookingController');
var ReviewController = require('../controller/ReviewController');
var SearchController = require('../controller/SearchController');
var order = require('../entity/order/Order');

let getUserInfo = (req) => {
  let user = {};
  if (req.user) {
    user = req.user;
    user.isLogin = true;
  }
  else
    user.isLogin = false;
  
  return user;
}

let checkLoginRequest = (req, res, next) => {
  if (!req.user)
    res.send("User hasn't login");
  else
    next();
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  let movieController = new MovieController(await req.movieManager);
  let result = movieController.getIndexMovies();
  
  res.render('index', {inTheaterMovies: result[0], comingSoonMovies: result[1], user: getUserInfo(req)});
});

router.get('/movieDetail/:movieId', async function(req, res, next) {
  let movieController = new MovieController(await req.movieManager);
  let movie = movieController.getMovieInfo(req.params.movieId);

  let reviewController = new ReviewController(await req.movieManager, req.memberManager);
  let reviews = reviewController.getReviews(req.params.movieId);

  res.render('movieDetail', {movie: movie, reviews: reviews, user: getUserInfo(req)});
});

router.post('/review/enterReview', checkLoginRequest, async function(req, res, next) {
  let reviewController = new ReviewController(await req.movieManager, req.memberManager);
  await reviewController.enterReview(req.user._id, req.body.movieId, req.body.title, req.body.content);

  res.send('OK');
});

router.post('/review/likeReview', checkLoginRequest, async function(req, res, next) {
  let reviewController = new ReviewController(await req.movieManager, req.memberManager);
  reviewController.likeReview(req.body.reviewId, req.user._id);

  res.send('OK');
});

router.post('/review/cancelLikeReview', checkLoginRequest,async function(req, res, next) {
  let reviewController = new ReviewController(await req.movieManager, req.memberManager);
  reviewController.cancelLikeReview(req.body.reviewId, req.user._id);

  res.send('OK');
});

router.post('/review/dislikeReview', checkLoginRequest, async function(req, res, next) {  
  let reviewController = new ReviewController(await req.movieManager, req.memberManager);
  reviewController.dislikeReview(req.body.reviewId, req.user._id);

  res.send('OK');
});

router.post('/review/cancelDislikeReview', checkLoginRequest, async function(req, res, next) {
  let reviewController = new ReviewController(await req.movieManager, req.memberManager);
  reviewController.cancelDislikeReview(req.body.reviewId, req.user._id);

  res.send('OK');
});

router.get('/booking/tickets/:showingId', async function(req, res, next) {
  let bookingController = new BookingController(await req.cinemaManager, await req.orderManager);
  let result = bookingController.selectShowing('5af11bf5f36d2837eae7806c');
  res.render('booking/tickets', {movie: result, user: getUserInfo(req)});
});

router.post('/booking/setTicketsAmount', async function(req, res, next) {
  let bookingController = new BookingController(await req.cinemaManager, await req.orderManager);
  req.session.order = req.body;
  req.session.order.totalTicketsAmount = parseInt(req.body.adultAmount) + parseInt(req.body.seniorAmount) + parseInt(req.body.childAmount);
  let result = await bookingController.determineBookingInfo('5af11bf5f36d2837eae7806c', {
      Adult: req.body.adultAmount,
      Senior: req.body.seniorAmount,
      Child: req.body.childAmount
  }, req.user ? req.user._id : "");
  req.session.order.id = result.orderId;
  req.session.order.isNotOccupiedSeats = result.seats;

  res.send('OK');
});

router.get('/booking/seats', async function(req, res, next) {
  let seatInfo = {
    isNotOccupiedSeats : req.session.order.isNotOccupiedSeats,
    totalTicketsAmount : req.session.order.totalTicketsAmount
  };

  res.render('booking/seats', {seatInfo: seatInfo, user: getUserInfo(req)});
});

router.post('/booking/selectSeats', async function(req, res, next) {
  let bookingController = new BookingController(await req.cinemaManager, await req.orderManager);
  let result = bookingController.selectSeats(req.session.order.id, req.body.selectedSeats)
  req.session.order.tickets = result.ticketList;
  
  res.send('OK');
});

router.get('/booking/confirmOrder', function(req, res, next) {
  let tickets = req.session.order.tickets;

  res.render('booking/confirmOrder', {tickets: tickets, movieBriefInfo: req.session.order.movieBriefInfo, subtotal: req.session.order.subtotal, user: getUserInfo(req)});
});

router.get('/booking/payment', function(req, res, next) {
  res.render('booking/payment', {subtotal: req.session.order.subtotal, user: getUserInfo(req)});
});

router.get('/booking/paySuccess', async function(req, res, next) {
  let bookingController = new BookingController(await req.cinemaManager, await req.orderManager);
  bookingController.updateOrderStatusPaid(req.session.order.id);
  let tickets = req.session.order.tickets;

  res.render('booking/paySuccess', {tickets: tickets, movieBriefInfo: req.session.order.movieBriefInfo, orderId: req.session.order.id, user: getUserInfo(req)});
});

router.get('/booking/orderHistory', async function(req, res, next) {
  let bookingController = new BookingController(await req.cinemaManager, await req.orderManager);
  let ordersInfo = bookingController.getOrdersInfo(getUserInfo(req)._id);

  res.render('booking/orderHistory', {ordersInfo: ordersInfo, user: getUserInfo(req)});
});

router.get('/booking/cancelOrder/:orderId', async function(req, res, next) {
  let bookingController = new BookingController(await req.cinemaManager, await req.orderManager);
  let orderDetailInfo = bookingController.getOrderDetailInfo(req.params.orderId);

  res.render('booking/cancelOrder', {orderInfo: orderDetailInfo, user: getUserInfo(req)});
});

router.post('/booking/cancelOrder', async function(req, res, next) {
  let bookingController = new BookingController(await req.cinemaManager, await req.orderManager);
  bookingController.cancelOrder(req.body.orderId);

  res.send('OK');
});

router.get('/booking/cancelOrderSuccess/:orderId', async function(req, res, next) {
  let bookingController = new BookingController(await req.cinemaManager, await req.orderManager);
  let orderDetailInfo = bookingController.getOrderDetailInfo(req.params.orderId);

  res.render('booking/cancelOrderSuccess', {orderInfo: orderDetailInfo, user: getUserInfo(req)});
});

// For development testing process
router.get('/booking/cancelAllOrder', async function(req, res, next) {
  let orderManager = await req.orderManager;
  let cinemaManager = await req.cinemaManager;
  orderManager.removeAllTickets();
  orderManager.removeAllOrders();
  cinemaManager.updateAllIsOccupiedFalse();
  
  res.send('OK');
});

router.get('/search/:keyword', async function(req, res, next) {
  let searchController = new SearchController(await req.movieManager);
  let searchResult = searchController.searchWith(req.params.keyword)
                    .map(movie => {
                          return {
                            "title": movie.name,
                            "url": "/movieDetail/" + movie._id,
                            "image": movie.coverUrl,
                            "description": movie.releaseDate,
                            "price": movie.categories
                          }
                    });

  res.send({"results": searchResult});
});

router.get('/routine', async function(req, res, next) {
  res.render('routine');
});

router.post('/routine/updateDb', async function(req, res, next) {
  let movieController = new MovieController(await req.movieManager);
  movieController.updateDatabaseMovies();
  res.send('OK');
});

module.exports = router;
