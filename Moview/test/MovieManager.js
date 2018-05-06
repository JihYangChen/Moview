var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var MovieModel = require('../mongoDB/model/MovieModel');
var MovieManager = require('../manager/MovieManager');

describe('Get movies', function () {
    var Movie = MovieModel;
    var mockMovie = sinon.mock(Movie);
  
    it('should return all movies', (done) => {
        var expectResult = [{
            id: 'id001',
            name: 'DeadPool 2',
            movieDescription: "descriptionId1"
        }, {
            id: 'id002',
            name: 'Avengers: Infinity War',
            movieDescription: 'descriptionId2'
        }]
        mockMovie
        .expects('find')
        .yields(null, expectResult);

        Movie.find((error, result) => {
            mockMovie.verify();
            mockMovie.restore();
            expect(result[0].id).to.equal('id001');
            expect(result[0].name).to.equal('DeadPool 2');
            expect(result[0].movieDescription).to.equal('descriptionId1');
            expect(result[1].id).to.equal('id002');
            expect(result[1].name).to.equal('Avengers: Infinity War');
            expect(result[1].movieDescription).to.equal('descriptionId2');
            done();
        })
    });
});