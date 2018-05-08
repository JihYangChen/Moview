class MovieDescription {

    // props = {id, coverUrl, posterUrl, casts, directors, categories, gallery, reviewRating, trailers, storyline, runtime, releaseDate, inTheater}
    constructor(movieDescription) {
        for (var prop in movieDescription) {      
            this[prop] = movieDescription[prop]
        }
    }

    getDisplayInfo = () => {
        return {
            coverUrl: this.coverUrl,
            runtime: this.runtime,
            releaseDate: this.releaseDate
        }
    }
}

module.exports = MovieDescription;