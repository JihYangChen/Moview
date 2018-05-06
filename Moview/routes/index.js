var express = require('express');
var router = express.Router();
var MovieController = require('../controller/MovieController');
var MovieManager = require('../manager/MovieManager');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let movieController = new MovieController(await req.movieManager);

  // for test purpose.
  // let result = movieController.showMovieInfo("5aed48e6f36d2837eae61fcf");
  let result = movieController.getIndexMovies();
  console.log("good -> ", result);
  res.render('index', { title: 'Express' });
});

module.exports = router;
