var mongoose = require('mongoose');
var MemberModel = require('../mongoDB/model/MemberModel');
var ReviewModel = require('../mongoDB/model/ReviewModel');
var Member = require('../entity/Member');
var Review = require('../entity/Review');

class MemberManager {

    constructor(movieManager) {
        this.movieManager = movieManager;
    }
    
    init = async () => {
        this.memberList = [];
        await this.generateMemberList();
    }

    generateMemberList = async () => {
        const memberObjects = await MemberModel.find()
                                               .populate({
                                                    path: 'reviewList',
                                                    populate: {
                                                        path: 'review'
                                                    }
                                                });
        for (var memberObject of memberObjects) {
            let reviewList = memberObject.reviewList.map(reviewObject => {
                let review = this.movieManager.getReviewByReviewId(reviewObject._id);
                // ideally, review should not be null since all reviews are already gen in movieManager.
                return review != null ? review : new Review(reviewObject);
            })
            this.memberList.push(new Member(memberObject, reviewList));
        }
        console.log('finish to load members from database');
    }

    insertMember = async memberObject => {
        const memberModel = new MemberModel(memberObject);
        const newMember = await memberModel.save();
        console.log('> new member has been inserted successfully');
        return newMember._id;
    }

    updateProfileUrl = async (memberId, profileUrl) => {
        await MemberModel.update({ _id: memberId }, { profileUrl: profileUrl }, { multi: false }, () => {
            console.log('> profileUrl has been update to member successfully');
        });
    }

    // insert review to db
    insertReview = async reviewObject => {
        const reviewModel = new ReviewModel(reviewObject);
        const newReview = await reviewModel.save();
        console.log('> new review has been inserted successfully');
        return newReview._id;
    }

    // insert review id to member
    insertReviewIdToMember = async (memberId, reviewIdList) => {
        await MemberModel.update({ _id: memberId }, { reviewList: reviewIdList }, { multi: false }, () => {
            console.log('> review id has been insert to member successfully');
        });
    }

    updateLikeReviewIdsToMember = async (memberId, likeReviewIds) => {
        await MemberModel.update({ _id: memberId }, { likeReviewIds: likeReviewIds }, { multi: false }, () => {
            console.log('> liked review ids have been update to member successfully');
        });
    }

    updateDislikeReviewIdsToMember = async (memberId, dislikeReviewIds) => {
        await MemberModel.update({ _id: memberId }, { dislikeReviewIds: dislikeReviewIds }, { multi: false }, () => {
            console.log('> disliked review ids have been update to member successfully');
        });
    }

    updatelikeAmount = async (reviewId, likeAmount) => {
        await ReviewModel.update({ _id: reviewId }, { likeAmount: likeAmount }, { multi: false }, () => {
            console.log('> like amount has been update to review successfully');
        });
    }

    updateDislikeAmount = async (reviewId, dislikeAmount) => {
        await ReviewModel.update({ _id: reviewId }, { dislikeAmount: dislikeAmount }, { multi: false }, () => {
            console.log('> dislike amount has been update to review successfully');
        });
    }

    addMember = member => {
        this.memberList.push(member);
    }

    getAllMembers = () => this.memberList;

    getMemberById = (memberId) => {
        let member = this.memberList.filter(member => {
            return JSON.stringify(member._id) == JSON.stringify(memberId);
        });
        return member.length > 0 ? member[0] : null;
    }

    getMemberByFbId = fbId => {
        let member = this.memberList.filter(member => {
            return JSON.stringify(member.fbId) == JSON.stringify(fbId);
        });
        return member.length > 0 ? member[0] : null;
    }

    // no use so far
    getReviewByReviewId = reviewId => {
        let review = this.memberList.map(member => member.reviewList).reduce((arr, element) => {
            return arr.concat(element);
        }, []).filter(review => {
            return JSON.stringify(review._id) == JSON.stringify(reviewId);
        });
        return review.length > 0 ? review[0] : null;
    }
}

module.exports = MemberManager;