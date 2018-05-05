class MovieDescription {

    constructor(casts, directors, categories, gallery, reviewRating, trailers, storyline, runtime) {
        this.casts = casts;
        this.directors = directors;
        this.categories = categories;
        this.gallery = gallery;
        this.contentRating = reviewRating;
        this.trailers = trailers;
        this.storyline = storyline;
        this.runtime = runtime;
    }
}

module.exports = MovieDescription;