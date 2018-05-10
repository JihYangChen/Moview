var mongoose = require('mongoose');
var ShowingModel = require('../mongoDB/model/cinema/ShowingModel');
var Showing = require('../entity/cinema/Showing');
var ShowingSeatModel = require('../mongoDB/model/cinema/ShowingSeatModel');

class CinemaManager {

    constructor() {
        this.init();
    }

    init = () => {
        this.showingList = [];
        this.generateShowingList();
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
            this.showingList.push(new Showing(populatedShowingObject));
        }
        console.log('finish to load showings from database');
    }

    updateShowingSeats = async showingSeatObjects => {
        for (var showingSeatObject of showingSeatObjects) {
            await ShowingSeatModel.findByIdAndUpdate(showingSeatObject._id, showingSeatObject).exec();
        }
        console.log('> showingSeats have been updated successfully');
    } 

    getShowings = (dateString, movieId) => {
        return this.showingList.filter(showing => {
            return showing.getDate() == dateString && showing.movie._id == movieId;
        });
    }

    getShowingById = showingId => {
        let showing = this.showingList.filter(showing => {
            return showing._id == showingId;
        });
        return showing.length > 0 ? showing[0] : null;
    }
}

module.exports = CinemaManager;