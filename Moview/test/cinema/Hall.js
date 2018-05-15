var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var Hall = require('../../entity/cinema/Hall');
var hall;

describe('Hall entity', () => {
    before(() => {
        var hallObject = { 
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
        };
        hall = new Hall(hallObject);
    });

    it('should create Hall correctly', () => {
        expect(hall._id).to.equal('hall001');
        expect(hall.name).to.equal('hallName');
        expect(hall.seatList).to.have.lengthOf(2);
        expect(hall.seatList[0].getName()).to.equal('A1');
        expect(hall.seatList[1].getName()).to.equal('A2');
    });

    it('should get seatList correctly', () => {
        let seats = hall.getSeats();
        expect(seats).to.have.length(2);
        expect(seats[0]._id).to.equal('seat001');
        expect(seats[0].getName()).to.equal('A1');
        expect(seats[1]._id).to.equal('seat002');
        expect(seats[1].getName()).to.equal('A2');
    });
});