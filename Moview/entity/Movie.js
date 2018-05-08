var MovieDescription = require('./MovieDescription');

class Movie {
    
    // props = {id, name, movieDescription}
    constructor(movieObject) {
        for (var prop in movieObject) {
            this[prop] = prop == 'movieDescription' ? new MovieDescription(movieObject[prop]) : movieObject[prop]
        }
    }

    getIndexDisplayInfo = () => {
        var info = this.movieDescription.getIndexDisplayInfo();
        info.movieName = this.name;
        return info;
    }

    getDetailMovieInfo = () => {
        var info = this.movieDescription.getDetailMovieInfo();
        info.movieName = this.name;
        return info;
    }
}

module.exports = Movie;