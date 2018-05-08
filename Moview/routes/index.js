var express = require('express');
var router = express.Router();
var MovieController = require('../controller/MovieController');
var MovieManager = require('../manager/MovieManager');
var DateUtil = require('../util/DateUtil');

/* GET home page. */
router.get('/', async function(req, res, next) {
  let movieController = new MovieController(await req.movieManager);
  let cinemaManager = await req.cinemaManager;

  // for test purpose.
  // DeadPool = 5aed48e6f36d2837eae61fcf, Avengers: Infinity war = 5aeec50bf36d2837eae67e72

  // let result = movieController.getMovieInfo("5aed48e6f36d2837eae61fcf");
  // let result = movieController.getIndexMovies();
  let result = cinemaManager.getShowingById('5af11bf5f36d2837eae7806c');
  console.log("good -> ", result.hall.getSeats());
  res.render('index', { title: 'Express' });
});

module.exports = router;
