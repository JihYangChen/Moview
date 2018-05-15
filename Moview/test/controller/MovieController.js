var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var Movie = require('../../entity/Movie');
var MovieController = require('../../controller/MovieController');
var MovieManager = require('../../manager/MovieManager');
let movieManager = new MovieManager();
var movieController;

describe('MovieController', () => {
    before(() => {
        let movie = new Movie({
            _id: 'id001',
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
        });
        let movie2 = new Movie({
            _id: 'id002',
            name: 'Avengers: Infinity War',
            movieDescription:
            { 
                _id: 'descriptionId002',
                coverUrl: 'http://coverUrl2',
                posterUrl: 'http://posterUrl2',
                casts: [ 
                    'Scarlett Johansson'
                ],
                directors: [ 'Anthony Russo', 'Joe Russo' ],
                categories: [ 'Action', 'Adventure', 'Fantasy' ],
                gallery: [ 'https://gallery2' ],
                trailers: [ 'https://trailers2' ],
                storyline: 'bad story.',
                releaseDate: '2000000000',
                runtime: '149',
                inTheater: false
            }
        });
        let movieList = [movie, movie2];
        movieManager.movieList = movieList;
        movieController = new MovieController(movieManager);
    });

    it('should return array of inTheater and comingSoon movies', () => {
        let movies = movieController.getIndexMovies();
        expect(movies).to.have.length(2);
        expect(movies[0]).to.have.length(1);
        expect(movies[0][0]._id).to.equal('id001');
        expect(movies[0][0].name).to.equal('DeadPool 2');
        expect(movies[0][0].coverUrl).to.equal('http://coverUrl');
        expect(movies[0][0].posterUrl).to.equal('http://posterUrl');
        expect(movies[0][0].runtime).to.be.an('undefined');
        expect(movies[0][0].releaseDate).to.equal('Sep 9,2001');

        expect(movies[1]).to.have.length(1);
        expect(movies[1][0]._id).to.equal('id002');
        expect(movies[1][0].name).to.equal('Avengers: Infinity War');
        expect(movies[1][0].coverUrl).to.equal('http://coverUrl2');
        expect(movies[1][0].posterUrl).to.equal('http://posterUrl2');
        expect(movies[1][0].runtime).to.equal('149');
        expect(movies[1][0].releaseDate).to.equal('May 18,2033');
    });

    it('should return detail movie info', () => {
        let movie = movieController.getMovieInfo('id001');
        expect(movie._id).to.equal('id001');
        expect(movie.name).to.equal('DeadPool 2');
        expect(movie.coverUrl).to.equal('http://coverUrl');
        expect(movie.runtime).to.be.an('undefined');
        expect(movie.releaseDate).to.equal('Sep 9,2001');
        expect(movie.casts[0]).to.equal('Ryan Reynolds');
        expect(movie.directors[0]).to.equal('David Leitch');
        expect(movie.categories[0]).to.equal('Action');
        expect(movie.categories[1]).to.equal('Adventure');
        expect(movie.categories[2]).to.equal('Comedy');
        expect(movie.gallery[0]).to.equal('https://gallery');
        expect(movie.trailers[0]).to.equal('https://trailers');
        expect(movie.storyline).to.equal('good story.');
    });
});