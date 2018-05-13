var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var CinemaManager = require('../manager/CinemaManager');
var Showing = require('../entity/cinema/Showing');
var Movie = require('../entity/Movie');
let cinemaManager = new CinemaManager();
var showing;
var movies;

describe('CinemaManager', () => {
    beforeEach(() => {
        var showingObject = { 
            _id: 'showing001',
            time: '1525752000',
            movie: {
                _id: 'movie001',
                name: 'DeadPool 2',
                movieDescription:
                { 
                    _id: 'descriptionId001',
                    coverUrl: 'http://coverUrl',
                    posterUrl: 'http://posterUrl',
                    casts: [ 
                        'Ryan Reynolds'
                    ],
                    directors: [ 'David Leitch' ],
                    categories: [ 'Action', 'Adventure', 'Comedy' ],
                    gallery: [ 'https://gallery' ],
                    trailers: [ 'https://trailers' ],
                    storyline: 'good story.',
                    releaseDate: '1000000000',
                    inTheater: true
                }
            },
            hall: {
                _id: 'hall001',
                name: 'hallName',
                seatList: [{
                    _id: 'seat001',
                    row: 'A',
                    column: '1',
                }, {
                    _id: 'seat002',
                    row: 'A',
                    column: '2',
                }]
            },
            showingSeatList: [{
                _id: 'showingSeat001',
                seat: { 
                    _id: 'seat001',
                    row: 'A',
                    column: '1'
                },
                isOccupied: false
            }, {
                _id: 'showingSeat002',
                seat: { 
                    _id: 'seat002',
                    row: 'A',
                    column: '2'
                },
                isOccupied: true
            }]
        };
        showing = new Showing(null, showingObject);
        let movie = new Movie({ 
            _id: 'movie001',
            name: 'movie',
            movieDescription: {
                _id: 'description001'
            }
        });
        let movie2 = new Movie({ 
            _id: 'movie002',
            name: 'movie2',
            movieDescription: {
                _id: 'description002'
            }
        });
        movies = [movie, movie2];
    });

    it('should get movie correctly', () => {
        let testee = cinemaManager.getMovie(movies, 'movie002');
        expect(testee._id).to.equal('movie002');
        expect(testee.name).to.equal('movie2');
        expect(testee.movieDescription._id).to.equal('description002');
    });

    it('should generate showingList correctly', () => {
        var stub = sinon.stub(cinemaManager, "generateShowingList").callsFake(() => {
            cinemaManager.showingList = [showing];
        });
        cinemaManager.generateShowingList(movies);
        let generatedShowingList = cinemaManager.showingList;
        expect(generatedShowingList[0]._id).to.equal('showing001');
        expect(generatedShowingList[0].time).to.equal('1525752000');
        expect(generatedShowingList[0].movie._id).to.equal('movie001');
        expect(generatedShowingList[0].hall._id).to.equal('hall001');
        expect(generatedShowingList[0].showingSeatList[0]._id).to.equal('showingSeat001');
        expect(generatedShowingList[0].showingSeatList[1]._id).to.equal('showingSeat002');
        stub.restore();
    });

    it('should update showingSeats correctly', () => {
        var expectShowingSeats = [{
            _id: 'updatedShowingSeat001',
            seat: { 
                _id: 'updatedSeat001',
                row: 'B',
                column: '1'
            },
            isOccupied: false
        }, {
            _id: 'updatedShowingSeat002',
            seat: { 
                _id: 'updatedSeat002',
                row: 'B',
                column: '2'
            },
            isOccupied: true
        }]
        var stub = sinon.stub(cinemaManager, "updateShowingSeats").callsFake(() => {
            showing.showingSeatList = expectShowingSeats;
            cinemaManager.showingList = [showing];
        });
        cinemaManager.updateShowingSeats();
        let updatedShowingSeats = cinemaManager.showingList[0].showingSeatList;
        expect(updatedShowingSeats[0]._id).to.equal('updatedShowingSeat001');
        expect(updatedShowingSeats[0].seat._id).to.equal('updatedSeat001');
        expect(updatedShowingSeats[0].seat.row).to.equal('B');
        expect(updatedShowingSeats[0].seat.column).to.equal('1');
        expect(updatedShowingSeats[0].isOccupied).to.be.false;
        expect(updatedShowingSeats[1]._id).to.equal('updatedShowingSeat002');
        expect(updatedShowingSeats[1].seat._id).to.equal('updatedSeat002');
        expect(updatedShowingSeats[1].seat.row).to.equal('B');
        expect(updatedShowingSeats[1].seat.column).to.equal('2');
        expect(updatedShowingSeats[1].isOccupied).to.be.true;
        stub.restore();
    });
    
    it('should replace showing instance correctly', () => {
        cinemaManager.showingList = [showing];
        var replacedShowing = new Showing(null, { 
            _id: 'showing001',
            time: '100',
            movie: {
                _id: 'replacedMovieId',
            },
            hall: {
                _id: 'replacedHallId'
            },
            showingSeatList: [{
                _id: 'replacedShowingSeatId'
            }]
        });
        cinemaManager.replaceShowingInstance(replacedShowing);
        expect(cinemaManager.showingList[0]._id).to.equal('showing001');
        expect(cinemaManager.showingList[0].time).to.equal('100');
        expect(cinemaManager.showingList[0].movie._id).to.equal('replacedMovieId');
        expect(cinemaManager.showingList[0].hall._id).to.equal('replacedHallId');
        expect(cinemaManager.showingList[0].showingSeatList[0]._id).to.equal('replacedShowingSeatId');
    });

    it('should get showing by id correctly', () => {
        cinemaManager.showingList = [showing];
        let testee = cinemaManager.getShowingById('showing001');
        expect(testee._id).to.equal('showing001');
        expect(testee.time).to.equal('1525752000');
        expect(testee.movie._id).to.equal('movie001');
        expect(testee.hall._id).to.equal('hall001');
        expect(testee.showingSeatList[0]._id).to.equal('showingSeat001');
        expect(testee.showingSeatList[1]._id).to.equal('showingSeat002');
    });
});