var MovieDescription = require('./MovieDescription');

class Movie {
    
    // props = {id, name, movieDescription}
    constructor(movieObject) {
        for (var prop in movieObject) {
            this[prop] = prop == 'movieDescription' ? new MovieDescription(movieObject[prop]) : movieObject[prop]
        }
    }
}

module.exports = Movie;