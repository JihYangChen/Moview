
class ReviewController {

    constructor(movieManager, memberManager) {
        this.movieManager = movieManager;
        this.memberManager = memberManager;
    }

    getReviews = movieId => {
        let movie = this.movieManager.getMovieById(movieId);
        let reviewList = movie.getReviews();
        return reviewList.map(review => {
            return review.getDisplayInfo();
        })
    }
}

module.exports = ReviewController;