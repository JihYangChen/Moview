class LikeCommand {

    constructor(member, review) {
        this.member = member;
        this.review = review;
    }

    execute = () => {
        // abstract method
    }
}

class LikeReviewCommand extends LikeCommand {

    execute = () => {
        this.review.likeAmount++;
        this.member.addLikeReview(this.review._id);
    }
}

class CancelLikeReviewCommand extends LikeCommand {

    execute = () => {
        this.review.likeAmount--;
        this.member.removeLikeReview(this.review._id);
    }
}

class DislikeReviewCommand extends LikeCommand {

    execute = () => {
        this.review.dislikeAmount++;
        this.member.addDislikeReview(this.review._id);
    }
}

class CancelDislikeReviewCommand extends LikeCommand {

    execute = () => {
        this.review.dislikeAmount--;
        this.member.removeDislikeReview(this.review._id);
    }
}

module.exports = { LikeCommand, LikeReviewCommand, CancelLikeReviewCommand, DislikeReviewCommand, CancelDislikeReviewCommand };