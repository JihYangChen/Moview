var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var MovieModel = require('../mongoDB/model/MovieModel');
var MovieManager = require('../manager/MovieManager');
    
let movieManager = new MovieManager();

describe('Get movies', function () {
  
    it('should return all movies', (done) => {
        var Movie = MovieModel;
        var mockMovie = sinon.mock(Movie);
        var expectResult = [{
            _id: 'id001',
            name: 'DeadPool 2',
            movieDescription: "descriptionId1"
        }, {
            _id: 'id002',
            name: 'Avengers: Infinity War',
            movieDescription: 'descriptionId2'
        }]
        mockMovie
        .expects('find')
        .yields(null, expectResult);

        Movie.find((error, result) => {
            mockMovie.verify();
            mockMovie.restore();
            expect(result[0]._id).to.equal('id001');
            expect(result[0].name).to.equal('DeadPool 2');
            expect(result[0].movieDescription).to.equal('descriptionId1');
            expect(result[1]._id).to.equal('id002');
            expect(result[1].name).to.equal('Avengers: Infinity War');
            expect(result[1].movieDescription).to.equal('descriptionId2');
            done();
        })
    });

    it('should return a movie by id', done => {
        var expectResult = {
            _id: 'id003',
            name: 'DeadPool 2',
            movieDescription:
            { 
                _id: 'descriptionId003',
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
                releaseDate: '1000000000' 
            }
        }
        var mockMovieManager = sinon.mock(movieManager)
        mockMovieManager
        .expects('getMovieById')
        .yields(null, expectResult);

        movieManager.getMovieById('idoo3', (error, result) => {
            mockMovieManager.verify();
            mockMovieManager.restore();
            expect(result._id).to.equal('id003');
            expect(result.name).to.equal('DeadPool 2');
            expect(result.movieDescription._id).to.equal('descriptionId003');
            expect(result.movieDescription.coverUrl).to.equal('http://coverUrl');
            expect(result.movieDescription.posterUrl).to.equal('http://posterUrl');
            expect(result.movieDescription.casts[0]).to.equal('Ryan Reynolds');
            expect(result.movieDescription.categories[0]).to.equal('Action');
            expect(result.movieDescription.categories[1]).to.equal('Adventure');
            expect(result.movieDescription.categories[2]).to.equal('Comedy');
            expect(result.movieDescription.gallery[0]).to.equal('https://gallery');
            expect(result.movieDescription.trailers[0]).to.equal('https://trailers');
            expect(result.movieDescription.storyline).to.equal('good story.');
            expect(result.movieDescription.releaseDate).to.equal('1000000000');
            done();
        })

    });
});