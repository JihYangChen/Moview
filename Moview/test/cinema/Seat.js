var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var Seat = require('../../entity/cinema/Seat');
var seat;

describe('Seat entity', () => {
    before(() => {
        var seatObject = { 
            _id: 'seat001',
            row: 'A',
            column: '1'
        };
        seat = new Seat(seatObject);
    });

    it('should create Seat correctly', () => {
        expect(seat._id).to.equal('seat001');
        expect(seat.row).to.equal('A');
        expect(seat.column).to.equal('1');
        expect(seat.getName()).to.equal('A1');
    });
});