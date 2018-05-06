class MovieDescription {

    constructor(id, coverUrl, casts, directors, categories, gallery, reviewRating, trailers, storyline, runtime, releaseDate) {
        this.id = id;
        this.coverUrl = coverUrl;
        this.casts = casts;
        this.directors = directors;
        this.categories = categories;
        this.gallery = gallery;
        this.reviewRating = reviewRating;
        this.trailers = trailers;
        this.storyline = storyline;
        this.runtime = runtime;
        this.releaseDate = releaseDate;
    }
}

module.exports = MovieDescription;