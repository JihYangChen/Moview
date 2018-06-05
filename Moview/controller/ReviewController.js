var LikeCommand = require('../entity/LikeCommand');

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

    enterReview = async (memberId, movieId, reviewTitle, reviewContent) => {
        let member = this.memberManager.getMemberById(memberId);
        member.writeReview(reviewTitle, reviewContent);
        let latestReview = member.getLatestReview();
        let reviewId = await this.memberManager.insertReview(latestReview.getObject());
        latestReview._id = reviewId;
        this.memberManager.insertReviewIdToMember(member._id, member.getReviewIdList());
        let movie = this.movieManager.getMovieById(movieId);
        movie.addReview(latestReview);
        this.movieManager.insertReviewIdToMovie(movie._id, movie.getReviews().map(review => {
            return review._id;
        }));
    }

    likeReview = (reviewId, memberId, isLike, isCancel) => {
        let review = this.movieManager.getReviewByReviewId(reviewId);
        let member = this.memberManager.getMemberById(memberId);
        var command;
        if (isLike && !isCancel) {
            command = new LikeCommand.LikeReviewCommand(member, review);
        } else if (isLike && isCancel) {
            command = new LikeCommand.CancelLikeReviewCommand(member, review);
        } else if (!isLike && !isCancel) {
            command = new LikeCommand.DislikeReviewCommand(member, review);
        } else if (!isLike && isCancel) {
            command = new LikeCommand.CancelDislikeReviewCommand(member, review);
        }
        command.execute();

        if (isLike) {
            this.memberManager.updateLikeReviewIdsToMember(memberId, member.likeReviewIds);
            this.memberManager.updatelikeAmount(reviewId, review.likeAmount);
        } else {
            this.memberManager.updateDislikeReviewIdsToMember(memberId, member.dislikeReviewIds);
            this.memberManager.updateDislikeAmount(reviewId, review.dislikeAmount);
        }
    }
}

module.exports = ReviewController;