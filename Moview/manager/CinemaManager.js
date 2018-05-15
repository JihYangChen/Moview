var mongoose = require('mongoose');
var ShowingModel = require('../mongoDB/model/cinema/ShowingModel');
var Showing = require('../entity/cinema/Showing');
var ShowingSeatModel = require('../mongoDB/model/cinema/ShowingSeatModel');

class CinemaManager {

    constructor(movieManager) {
        this.movieManager = movieManager;
    }

    init = async () => {
        this.showingList = [];
        await this.generateShowingList();
    }

    generateShowingList = async () => {
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
            this.showingList.push(new Showing(this.movieManager.getMovieById(populatedShowingObject.movie._id), populatedShowingObject));
        }
        console.log('finish to load showings from database');
    }

    updateShowingSeats = async showingSeatObjects => {
        for (var showingSeatObject of showingSeatObjects) {
            await ShowingSeatModel.findByIdAndUpdate(showingSeatObject._id, showingSeatObject).exec();
        }
        console.log('> showingSeats have been updated successfully');
    } 

    /***********************************
     * 
     *  please be very careful !!!
     * 
     ***********************************/
    updateAllIsOccupiedFalse() {
        ShowingSeatModel.update({ isOccupied: true }, { isOccupied: false }, { multi: true }, () => {
            console.log('> all occupied seats have been set to non-occupied');
        });
    }

    // public 

    // no use so far
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