var mongoose = require('mongoose');
var ShowingModel = require('../mongoDB/model/cinema/ShowingModel');
var Showing = require('../entity/cinema/Showing');
var ShowingSeatModel = require('../mongoDB/model/cinema/ShowingSeatModel');

class CinemaManager {

    constructor() {

    }

    init = async (movies) => {
        this.showingList = [];
        await this.generateShowingList(movies);
    }

    generateShowingList = async (movies) => {
        const showingObjects = await ShowingModel.find();
        for (var showingObject of showingObjects) {
            const populatedShowingObject = await ShowingModel.findById(showingObject._id)
                                                             .populate({
                                                                path: 'movie',
                                                                populate: {
                                                                    path: 'movieDescription'
                                                                }
                                                             })
                                                             .populate({
                                                                 path: 'hall',
                                                                 populate: {
                                                                     path: 'seatList'
                                                                 }
                                                             })
                                                             .populate({
                                                                 path: 'showingSeatList',
                                                                 populate: {
                                                                     path: 'seat'
                                                                 }
                                                             })
                                                             .exec();                                                             
            this.showingList.push(new Showing(this.getMovie(movies, populatedShowingObject.movie._id), populatedShowingObject));
        }
        console.log('finish to load showings from database');
    }

    getMovie = (movies, targetMovieId) => {
        let moviesArray = movies.filter(movie => {
            return JSON.stringify(movie._id) == JSON.stringify(targetMovieId);
        });
        return moviesArray.length > 0 ? moviesArray[0] : null;
    }

    updateShowingSeats = async showingSeatObjects => {
        for (var showingSeatObject of showingSeatObjects) {
            await ShowingSeatModel.findByIdAndUpdate(showingSeatObject._id, showingSeatObject).exec();
        }
        console.log('> showingSeats have been updated successfully');
    } 

    replaceShowingInstance = showing => {
        var originalShowing = this.getShowingById(showing._id);
        var index = this.showingList.indexOf(originalShowing);
        if (index > -1) {
            this.showingList.splice(index, 1);
        }
        this.showingList.push(showing);
    }

    getShowings = (dateString, movieId) => {
        return this.showingList.filter(showing => {
            return showing.getDate() == dateString && showing.movie._id == movieId;
        });
    }

    getShowingById = showingId => {
        let showing = this.showingList.filter(showing => {
            return JSON.stringify(showing._id) == JSON.stringify(showingId);
        });
        return showing.length > 0 ? showing[0] : null;
    }
}

module.exports = CinemaManager;