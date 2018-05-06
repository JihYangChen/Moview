class MovieDescription {

    // props = {id, coverUrl, posterUrl, casts, directors, categories, gallery, reviewRating, trailers, storyline, runtime, releaseDate}
    constructor(movieDescription) {
        for (var prop in movieDescription) {      
            this[prop] = movieDescription[prop]
        }
    }
}

module.exports = MovieDescription;