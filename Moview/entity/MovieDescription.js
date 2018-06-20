var DateUtil = require('../util/DateUtil');

class MovieDescription {

    // props = {id, coverUrl, posterUrl, casts, directors, categories, gallery, reviewRating, trailers, storyline, runtime, releaseDate, inTheater}
    constructor(movieDescription) {
        for (var prop in movieDescription) {      
            this[prop] = movieDescription[prop]
        }
    }

    getIndexDisplayInfo = () => {
        return {
            coverUrl: this.coverUrl,
            posterUrl: this.posterUrl,
            runtime: this.runtime,
            categories: this.categories,
            releaseDate: this.getReleaseDate()
        }
    }

    getDetailMovieInfo = () => {
        return {
            coverUrl: this.coverUrl,
            directors: this.directors,
            casts: this.casts,
            runtime: this.runtime,
            releaseDate: this.getReleaseDate(),
            categories: this.categories,
            reviewRating: this.reviewRating,
            gallery: this.gallery,
            trailers: this.trailers,
            storyline: this.storyline
        }
    }

    // May 08,2018
    getReleaseDate = () => {
        return DateUtil.occidentDateFormattedString(this.releaseDate);
    }
}

module.exports = MovieDescription;