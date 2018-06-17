var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');

// managers
var MovieManager = require('./manager/MovieManager');
var CinemaManager = require('./manager/CinemaManager');
var OrderManager = require('./manager/OrderManager');
var MemberManager = require('./manager/MemberManager');
var movieManager;
var cinemaManager;
var orderManager;
var memberManager;

var index = require('./routes/index');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// session
var session = require('express-session');
app.set('trust proxy', 1);
app.use(session({
    name: 'moview-session',
    secret: 'a4f5Df', 
    resave: true, 
    saveUninitialized: true 
}));

// CORS configuration
app.use(cors())

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

var init = async () => {
  movieManager = new MovieManager();
  await movieManager.init();  
  cinemaManager = new CinemaManager(movieManager);
  await cinemaManager.init();
  orderManager = new OrderManager(cinemaManager);
  await orderManager.init();
  memberManager = new MemberManager(movieManager);
  await memberManager.init();
}

mongoose.connect('mongodb://moviewuser:moviewpassword@ds113200.mlab.com:13200/moview');
// mongoose.set('debug', true)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connextion error:'));
db.once('open', () => {
  console.log('MongoDB Connected!')
  init();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
  req.movieManager = movieManager;
  req.cinemaManager = cinemaManager;
  req.orderManager = orderManager;
  req.memberManager = memberManager;
  next();
}, index);
app.use('/', (req, res, next) => {
  req.memberManager = memberManager;
  next();
}, login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
