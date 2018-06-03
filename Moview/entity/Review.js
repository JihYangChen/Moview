
class Review {
    
    // props = {id, title, createTime, content, likeAmount, dislikeAmount, memberName}
    constructor(reviewObject) {
        for (var prop in reviewObject) {
            this[prop] = reviewObject[prop]
        }
    }

    getDisplayInfo = () => {
        return {
            _id: this._id,
            title: this.title,
            createTime: this.createTime,
            content: this.content,
            likeAmount: this.likeAmount,
            dislikeAmount: this.dislikeAmount,
            memberName: this.memberName
        }
    }

    // for test purpose
    
    getContent = () => {
        return {
            title: this.title,
            content: this.content
        }
    }

    getMemberName = () => {
        return {
            memberName: this.memberName
        }
    }
}

module.exports = Review;