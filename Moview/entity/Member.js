var Review = require('./Review');

class Member {
    
    // props = {id, fbId, name, email, profileUrl, reviewList, likeReviewIds, dislikeReviewIds}
    constructor(memberObject, reviewList) {
        for (var prop in memberObject) {
            this[prop] = prop == 'reviewList' ? reviewList : memberObject[prop];
        }
    }

    getReviewIdList = () => {
        return this.reviewList.map(review => {
            return review._id;
        });
    }

    isLikeReview = reviewId => {
        if (this.likeReviewIds.length > 0) {
            return this.likeReviewIds.includes(reviewId);
        }
        return false;
    }

    isDislikeReview = reviewId => {
        if (this.dislikeReviewIds.length > 0) {
            return this.dislikeReviewIds.includes(reviewId);
        }
        return false;
    }

    addLikeReview = reviewId => {
        if (this.likeReviewIds == null) {
            this.likeReviewIds = [];
        }
        this.likeReviewIds.push(reviewId);
    }

    removeLikeReview = reviewId => {
        let targetIndex = this.likeReviewIds.indexOf(reviewId);
        if (targetIndex == -1) { return; }
        if (targetIndex == this.likeReviewIds.length - 1) {
            this.likeReviewIds.pop();
            return;
        }
        this.likeReviewIds.splice(targetIndex, targetIndex + 1);
    }

    addDislikeReview = reviewId => {
        if (this.dislikeReviewIds == null) {
            this.dislikeReviewIds = [];
        }
        this.dislikeReviewIds.push(reviewId);
    }

    removeDislikeReview = reviewId => {
        let targetIndex = this.dislikeReviewIds.indexOf(reviewId);
        if (targetIndex == -1) { return; }
        if (targetIndex == this.dislikeReviewIds.length - 1) {
            this.dislikeReviewIds.pop();
            return;
        }
        this.dislikeReviewIds.splice(targetIndex, targetIndex + 1);
    }

    getInfo = () => {
        return {
            name: this.name,
            profileUrl: this.profileUrl
        }
    }

    getLatestReview = () => {
        if (this.reviewList.length > 0) {
            return this.reviewList.sort((lhs, rhs) => {
                return new Date(lhs.createTime * 1000) - new Date(rhs.createTime * 1000);
            })[this.reviewList.length - 1];
        } 
        return null;
    }

    writeReview = (reviewTitle, reviewContent) => {
        let review = new Review({
            title: reviewTitle,
            createTime: Date.now() / 1000 | 0,
            content: reviewContent,
            likeAmount: 0,
            dislikeAmount: 0,
            memberName: this.name
        });
        if (this.reviewList == null || this.reviewList.length < 1) {
            this.reviewList = [];
        } 
        this.reviewList.push(review);
    }
}

module.exports = Member;