var mongoose = require('mongoose');
var MemberModel = require('../mongoDB/model/MemberModel');
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

    addMember = member => {
        this.memberList.push(member);
    }

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
}

module.exports = MemberManager;