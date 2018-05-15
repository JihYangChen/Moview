var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var ShowingSeat = require('../../entity/cinema/ShowingSeat');

describe('ShowingSeat entity', () => {
    it('should create ShowingSeat correctly', () => {
        var showingSeatObject = { 
            _id: 'showingSeat001',
            seat: { 
                _id: 'seat001',
                row: 'A',
                column: '1'
            },
            isOccupied: false
        };
        let showingSeat = new ShowingSeat(showingSeatObject);
        expect(showingSeat._id).to.equal('showingSeat001');
        expect(showingSeat.isOccupied).to.be.false;
        expect(showingSeat.seat.getName()).to.equal('A1');
        expect(showingSeat.getShowingSeatObject()._id).to.equal('showingSeat001');
        expect(showingSeat.getShowingSeatObject().seat).to.equal('seat001');
        expect(showingSeat.getShowingSeatObject().isOccupied).to.be.false;
    });
});