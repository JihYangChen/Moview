var MovieDescription = require('./MovieDescription');
var Review = require('./Review');

class Movie {
    
    // props = {id, name, movieDescription, reviewList}
    constructor(movieObject) {
        for (var prop in movieObject) {
            if (prop == 'movieDescription') {
                this[prop] = new MovieDescription(movieObject[prop])
            } else if (prop == 'reviewList') {
                this[prop] = movieObject[prop].map(reviewObject => new Review(reviewObject));
            } else {
                this[prop] = movieObject[prop]
            }
        }
    }

    getIndexDisplayInfo = () => {
        var info = this.movieDescription.getIndexDisplayInfo();
        info._id = this._id;
        info.name = this.name;
        return info;
    }

    getDetailMovieInfo = () => {
        var info = this.movieDescription.getDetailMovieInfo();
        info._id = this._id;
        info.name = this.name;
        return info;
    }
}

module.exports = Movie;