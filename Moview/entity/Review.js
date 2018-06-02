
class Review {
    
    // props = {id, title, createTime, content, likeAmount, dislikeAmount}
    constructor(reviewObject) {
        for (var prop in reviewObject) {
            this[prop] = reviewObject[prop]
        }
    }

    getContent = () => {
        return {
            title: this.title,
            content: this.content
        }
    }
}

module.exports = Review;