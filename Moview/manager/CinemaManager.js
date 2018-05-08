var mongoose = require('mongoose');
var ShowingModel = require('../mongoDB/model/cinema/ShowingModel');
var Showing = require('../entity/cinema/Showing');

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
                                                             .populate('hall')
                                                             .exec();
            this.showingList.push(new Showing(populatedShowingObject));
        }
        console.log('finish to load showings from database');
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