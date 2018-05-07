var mongoose = require('mongoose');
var MovieModel = require('../mongoDB/model/MovieModel');
var Movie = require('../entity/Movie');

class MovieManager {

    constructor() {
        this.init();
    }
    
    init = () => {
        this.movieList = [];
        this.generateMovieList();
    }

    generateMovieList = async () => {
        const movieObjects = await MovieModel.find();
        for (var movieObject of movieObjects) {
            const populatedMovieObject = await MovieModel.findById(movieObject._id)
                                                         .populate('movieDescription')
                                                         .exec();
            this.movieList.push(new Movie(populatedMovieObject));
        }
        console.log('finish to load movies from database');
    }

    getInTheaterMovies = () => {
        return this.movieList.filter(movie => {
            return movie.movieDescription.inTheater == true;
        });
    }

    getComingSoonMovies = () => {
        return this.movieList.filter(movie => {
            return movie.movieDescription.inTheater == false;
        });
    }

    getMovieById = (movieId) => {
        let movie = this.movieList.filter(movie => {
            return movie._id == movieId;
        });
        return movie.length > 0 ? movie[0] : null;
    }
}

module.exports = MovieManager;