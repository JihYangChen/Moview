var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MovieModel = require('../mongoDB/model/MovieModel');
var MovieManager = require('../manager/MovieManager');

/* GET home page. */
router.get('/', async function(req, res, next) {
  // await MovieModel.find({name: 'DeadPool 2'}, (err, result) => {
  //   if (result) {
  //     console.log("success ->", result);
  //   }
  // });
  let movieManager = new MovieManager();
  let result = await movieManager.getMovieById("5aed48e6f36d2837eae61fcf");
  console.log("good -> ", result);
  res.render('index', { title: 'Express' });
});

module.exports = router;
