var Review = require('./Review');

class Member {
    
    // props = {id, fbId, name, email, profileUrl, reviewList}
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