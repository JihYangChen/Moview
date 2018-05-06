var mongoose = require('mongoose');
var MovieModel = require('../mongoDB/model/MovieModel');

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
        return await MovieModel.findById(movieId)
                               .populate('movieDescription')
                               .exec();
    }
}

module.exports = MovieManager;