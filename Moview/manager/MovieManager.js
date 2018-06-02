var mongoose = require('mongoose');
var MovieModel = require('../mongoDB/model/MovieModel');
var Movie = require('../entity/Movie');

class MovieManager {

    constructor() {

    }
    
    init = async () => {
        this.movieList = [];
        await this.generateMovieList();
    }

    generateMovieList = async () => {
        const movieObjects = await MovieModel.find();
        for (var movieObject of movieObjects) {
            const populatedMovieObject = await MovieModel.findById(movieObject._id)
                                                         .populate('movieDescription')
                                                         .populate({
                                                            path: 'reviewList',
                                                            populate: {
                                                                path: 'review'
                                                            }
                                                         })
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
            return JSON.stringify(movie._id) == JSON.stringify(movieId);
        });
        return movie.length > 0 ? movie[0] : null;
    }

    getReviewByReviewId = reviewId => {
        let review = this.movieList.map(movie => movie.reviewList).reduce((arr, element) => {
            return arr.concat(element);
        }, []).filter(review => {
            return JSON.stringify(review._id) == JSON.stringify(reviewId);
        });
        return review.length > 0 ? review[0] : null;
    }
}

module.exports = MovieManager;