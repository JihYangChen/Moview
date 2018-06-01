var mongoose = require('mongoose');
var MemberModel = require('../mongoDB/model/MemberModel');
var Member = require('../entity/Member');

class MemberManager {

    constructor() {

    }
    
    init = async () => {
        this.memberList = [];
        await this.generateMemberList();
    }

    generateMemberList = async () => {
        const memberObjects = await MemberModel.find();
        for (var memberObject of memberObjects) {
            this.memberList.push(new Member(memberObject));
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