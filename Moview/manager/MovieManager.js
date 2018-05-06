var mongoose = require('mongoose');
var MovieModel = require('../mongoDB/model/MovieModel');
var Movie = require('../entity/Movie');

class MovieManager {

    constructor() {
        this.init();
    }
    
    init = () => {
        this.movieList = [];
        this.generateMovieList()
    }

    generateMovieList = () => {
        console.log('success get Movie List');
    }

    getMovieById = async (movieId) => {
        // await MovieModel.find({name: 'DeadPool 2'}, (err, result) => {
        //     if (result) {
        //         console.log("success ->", result);
        //     }
        // });
        let movieObject = await MovieModel.findById(movieId)
                                          .populate('movieDescription')
                                          .exec();
        return new Movie(movieObject);
    }
}

module.exports = MovieManager;