var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var Showing = require('../../entity/cinema/Showing');
var showing;

describe('Showing entity', () => {
    before(() => {
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
    });

    it('should create Showing correctly', () => {
        expect(showing._id).to.equal('showing001');
        expect(showing.movie._id).to.equal('movie001');
        expect(showing.hall._id).to.equal('hall001');
        expect(showing.showingSeatList).to.have.length(2);
        expect(showing.showingSeatList[0].isOccupied).to.be.false;
        expect(showing.showingSeatList[1].isOccupied).to.be.true;
    });

    it('should get date correctly', () => {
        expect(showing.getDate()).to.equal('Tue. May 08');
        expect(showing.getSimpleDate()).to.equal('05/08');
        expect(showing.getSpecificTime()).to.equal('12:00');
        expect(showing.getTime()).to.equal('Tue. May 08 at 12:00');
    });

    it('should get booking process display info correctly', () => {
        let expectResult = {
            time: 'Tue. May 08 at 12:00',
            name: 'DeadPool 2',
            coverUrl: 'http://coverUrl'
        };
        expect(showing.getBookingProcessDisplayInfo().time).to.equal(expectResult.time);
        expect(showing.getBookingProcessDisplayInfo().name).to.equal(expectResult.name);
        expect(showing.getBookingProcessDisplayInfo().coverUrl).to.equal(expectResult.coverUrl);
    });

    it('should get movie name correctly', () => {
        expect(showing.getMovieName()).to.equal('DeadPool 2');
    });

    it('should get not occupied seats correctly', () => {
        expect(showing.getNotOccupiedSeats()).to.have.length(1);
        expect(showing.getNotOccupiedSeats()[0].row).to.equal('A');
        expect(showing.getNotOccupiedSeats()[0].column).to.equal('1');
    });

    it('should get seats correctly', () => {
        expect(showing.getSeats()).to.have.length(2);
        expect(showing.getSeats()[0].row).to.equal('A');
        expect(showing.getSeats()[0].column).to.equal('1');
        expect(showing.getSeats()[1].row).to.equal('A');
        expect(showing.getSeats()[1].column).to.equal('2');
    });

    it('should get showingSeat by seatName correctly', () => {
        expect(showing.getShowingSeatBySeatName('A2')._id).to.equal('showingSeat002');
        expect(showing.getShowingSeatBySeatName('A2').seat._id).to.equal('seat002');
        expect(showing.getShowingSeatBySeatName('A2').isOccupied).to.be.true;
    });

    it('should get seats by seatNames correctly', () => {
        expect(showing.getSeatsBySeatNames(["A2"])).to.have.length(1);
        expect(showing.getSeatsBySeatNames(["A2"])[0]._id).to.equal('seat002');
    });

    it('should set seats occupied correctly', () => {
        expect(showing.getShowingSeatBySeatName('A1').isOccupied).to.be.false;
        showing.setSeatsOccupied(["A1"]);
        expect(showing.getShowingSeatBySeatName('A1').isOccupied).to.be.true;
    });

    it('should get showingSeat Objects correctly', () => {
        var expectResult = {
            _id: 'showingSeat001',
            seat: 'seat001',
            isOccupied: true
        }
        expect(showing.getShowingSeatObjects(["A1"])[0]._id).to.equal(expectResult._id);
        expect(showing.getShowingSeatObjects(["A1"])[0].seat).to.equal(expectResult.seat);
        expect(showing.getShowingSeatObjects(["A1"])[0].isOccupied).to.equal(expectResult.isOccupied);
    });
});