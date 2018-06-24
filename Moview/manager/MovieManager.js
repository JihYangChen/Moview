var mongoose = require('mongoose');
var MovieModel = require('../mongoDB/model/MovieModel');
var MovieDescriptionModel = require('../mongoDB/model/MovieDescriptionModel');
var Movie = require('../entity/Movie');
var fetch = require('node-fetch');

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

    /***********************************
     * 
     *  please be very careful !!!
     * 
     ***********************************/
    updateDatabaseMovies = async () => {
        await this.fetchData('http://67668600.ngrok.io/MovieInfosComingSoon', async (err, result) => {
            for (let movieObject of result) {
                console.log('info => ', movieObject);
                let object = movieObject;
                let movieDescObject = {
                    coverUrl: object.coverUrl,
                    posterUrl: object.posterUrl,
                    casts: object.casts,
                    directors: object.directors,
                    categories: object.categories,
                    gallery: object.gallery,
                    trailers: object.trailers,
                    storyline: object.storyline,
                    runtime: object.runtime,
                    releaseDate: object.releaseDate,
                    inTheater: object.inTheater,
                    updateIndex: 1
                };
                let movieDescId = await this.insertMovieDescription(movieDescObject);
                this.insertMovie({
                    name: object.name,
                    movieDescription: movieDescId,
                    updateIndex: 1
                });
            }
        })        
    }

    removeAllOutOfDateMovies = async () => {
        MovieModel.remove({ updateIndex: { $ne: 1 } }).exec()
        MovieDescriptionModel.remove({ updateIndex: { $ne: 1 } }).exec()
    }

    fetchData = async (url, callback) => {
        await fetch(url)
                .then(response => response.json())
                .then(json => callback(null, json))
                .catch(error => callback(error, null))
    }

    insertMovieDescription = async movieDescriptionObject => {
        const movieDescriptionModel = new MovieDescriptionModel(movieDescriptionObject);
        const newMovieDesc = await movieDescriptionModel.save();
        console.log('> movie description has been inserted successfully');
        return newMovieDesc._id;
    }

    insertMovie = async movieObject => {
        const movieModel = new MovieModel(movieObject);
        const newMovie = await movieModel.save();
        console.log('> movie has been inserted successfully');
    }
    /**********************************************************/

    insertReviewIdToMovie = async (movieId, reviewIdList) => {
        await MovieModel.update({ _id: movieId }, { reviewList: reviewIdList }, { multi: false }, () => {
            console.log('> review id have been insert to movie successfully');
        });
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