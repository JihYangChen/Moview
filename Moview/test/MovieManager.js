var assert = require('assert');
var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var Movie = require('../entity/Movie');
var MovieModel = require('../mongoDB/model/MovieModel');
var MovieManager = require('../manager/MovieManager');
    
let movieManager = new MovieManager();
var expectResult;

describe('Movie entity', () => {
    it('should create movie correctly', () => {
        var movieObject = {
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
        };
        let movie = new Movie(movieObject);
        expect(movie._id).to.equal('id001');
        expect(movie.name).to.equal('DeadPool 2');
        expect(movie.movieDescription._id).to.equal('descriptionId001');
        expect(movie.movieDescription.coverUrl).to.equal('http://coverUrl');
        expect(movie.movieDescription.posterUrl).to.equal('http://posterUrl');
        expect(movie.movieDescription.casts[0]).to.equal('Ryan Reynolds');
        expect(movie.movieDescription.directors[0]).to.equal('David Leitch');
        expect(movie.movieDescription.categories[0]).to.equal('Action');
        expect(movie.movieDescription.categories[1]).to.equal('Adventure');
        expect(movie.movieDescription.categories[2]).to.equal('Comedy');
        expect(movie.movieDescription.gallery[0]).to.equal('https://gallery');
        expect(movie.movieDescription.trailers[0]).to.equal('https://trailers');
        expect(movie.movieDescription.storyline).to.equal('good story.');
        expect(movie.movieDescription.releaseDate).to.equal('1000000000');
        expect(movie.movieDescription.inTheater).to.be.true;
    });
})

describe('Get movies', function () {

    before(() => {
        expectResult = [{
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
        }, {
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
        }]
    });
  
    it('should return all movies', (done) => {
        var Movie = MovieModel;
        var mockMovie = sinon.mock(Movie);
        mockMovie
        .expects('find')
        .yields(null, expectResult);

        Movie.find((error, result) => {
            mockMovie.verify();
            mockMovie.restore();
            expect(result[0]._id).to.equal('id001');
            expect(result[0].name).to.equal('DeadPool 2');
            expect(result[0].movieDescription._id).to.equal('descriptionId001');
            expect(result[0].movieDescription.coverUrl).to.equal('http://coverUrl');
            expect(result[0].movieDescription.posterUrl).to.equal('http://posterUrl');
            expect(result[0].movieDescription.casts[0]).to.equal('Ryan Reynolds');
            expect(result[0].movieDescription.directors[0]).to.equal('David Leitch');
            expect(result[0].movieDescription.categories[0]).to.equal('Action');
            expect(result[0].movieDescription.categories[1]).to.equal('Adventure');
            expect(result[0].movieDescription.categories[2]).to.equal('Comedy');
            expect(result[0].movieDescription.gallery[0]).to.equal('https://gallery');
            expect(result[0].movieDescription.trailers[0]).to.equal('https://trailers');
            expect(result[0].movieDescription.storyline).to.equal('good story.');
            expect(result[0].movieDescription.releaseDate).to.equal('1000000000');
            expect(result[0].movieDescription.inTheater).to.be.true;

            expect(result[1]._id).to.equal('id002');
            expect(result[1].name).to.equal('Avengers: Infinity War');
            expect(result[1].movieDescription._id).to.equal('descriptionId002');
            expect(result[1].movieDescription.coverUrl).to.equal('http://coverUrl2');
            expect(result[1].movieDescription.posterUrl).to.equal('http://posterUrl2');
            expect(result[1].movieDescription.casts[0]).to.equal('Scarlett Johansson');
            expect(result[1].movieDescription.directors[0]).to.equal('Anthony Russo');
            expect(result[1].movieDescription.directors[1]).to.equal('Joe Russo');
            expect(result[1].movieDescription.categories[0]).to.equal('Action');
            expect(result[1].movieDescription.categories[1]).to.equal('Adventure');
            expect(result[1].movieDescription.categories[2]).to.equal('Fantasy');
            expect(result[1].movieDescription.gallery[0]).to.equal('https://gallery2');
            expect(result[1].movieDescription.trailers[0]).to.equal('https://trailers2');
            expect(result[1].movieDescription.storyline).to.equal('bad story.');
            expect(result[1].movieDescription.releaseDate).to.equal('2000000000');
            expect(result[1].movieDescription.runtime).to.equal('149');
            expect(result[1].movieDescription.inTheater).to.be.false;
            done();
        })
    });

    it('should load data from database and generate a movieList at a begining', () => {
        var stub = sinon.stub(movieManager, "generateMovieList").callsFake(() => {
            movieManager.movieList = expectResult;
        });
        movieManager.generateMovieList();
        let generatedMovieList = movieManager.movieList;
        expect(generatedMovieList[0]._id).to.equal('id001');
        expect(generatedMovieList[0].name).to.equal('DeadPool 2');
        expect(generatedMovieList[0].movieDescription._id).to.equal('descriptionId001');
        expect(generatedMovieList[1]._id).to.equal('id002');
        expect(generatedMovieList[1].name).to.equal('Avengers: Infinity War');
        expect(generatedMovieList[1].movieDescription._id).to.equal('descriptionId002');
        stub.restore();
    });

    it('should return a movie by id', done => {
        movieManager.movieList = expectResult;
        let result = movieManager.getMovieById('id001');
        expect(result._id).to.equal('id001');
        expect(result.name).to.equal('DeadPool 2');
        expect(result.movieDescription._id).to.equal('descriptionId001');
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
        expect(result.movieDescription.inTheater).to.be.true;
        done();
    });

    it('should return in theater movies', done => {
        movieManager.movieList = expectResult;
        let comingSoonMovies = movieManager.getInTheaterMovies();
        expect(comingSoonMovies).to.be.an('array');
        expect(comingSoonMovies).to.have.lengthOf(1);
        expect(comingSoonMovies[0]._id).to.equal('id001');
        expect(comingSoonMovies[0].name).to.equal('DeadPool 2');
        expect(comingSoonMovies[0].movieDescription._id).to.equal('descriptionId001');
        expect(comingSoonMovies[0].movieDescription.inTheater).to.be.true;
        done();
    });

    it('should return coming soon movies', done => {
        movieManager.movieList = expectResult;
        let comingSoonMovies = movieManager.getComingSoonMovies();
        expect(comingSoonMovies).to.be.an('array');
        expect(comingSoonMovies).to.have.lengthOf(1);
        expect(comingSoonMovies[0]._id).to.equal('id002');
        expect(comingSoonMovies[0].name).to.equal('Avengers: Infinity War');
        expect(comingSoonMovies[0].movieDescription._id).to.equal('descriptionId002');
        expect(comingSoonMovies[0].movieDescription.inTheater).to.be.false;
        done();
    });
});