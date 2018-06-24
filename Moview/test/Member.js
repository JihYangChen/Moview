var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var Member = require('../entity/Member');
var Review = require('../entity/Review');
var review;
var member;

describe('Member entity', () => {
    before(() => {
        var reviewObject = {
            _id: 'reviewId',
            title: 'reviewTitle',
            createTime: '1000',
            content: 'content',
            likeAmount: 3,
            dislikeAmount: 2,
            memberName: 'Willie'
        }
        review = new Review(reviewObject);
        var memberObject = { 
            _id: 'memberId',
            fbId: 'fbId',
            name: 'testName',
            email: 'test@gmail.com',
            profileUrl: 'http://profileUrl',
            reviewList: [reviewObject],
            likeReviewIds: ['likeReviewId'],
            dislikeReviewIds: ['dislikeReviewId']
        };
        member = new Member(memberObject, [review]);
    });

    it('should create Member correctly', () => {
        expect(member._id).to.equal('memberId');
        expect(member.fbId).to.equal('fbId');
        expect(member.name).to.equal('testName');
        expect(member.email).to.equal('test@gmail.com');
        expect(member.profileUrl).to.equal('http://profileUrl');
        expect(member.reviewList).to.have.lengthOf(1);
        expect(member.reviewList[0]._id).to.equal('reviewId');
        expect(member.likeReviewIds).to.have.lengthOf(1);
        expect(member.likeReviewIds[0]).to.equal('likeReviewId');
        expect(member.dislikeReviewIds).to.have.lengthOf(1);
        expect(member.dislikeReviewIds[0]).to.equal('dislikeReviewId');
    });

    it('should get review id list correctly', () => {
        expect(member.getReviewIdList()[0]).to.equal('reviewId');
    });

    it('should check is a liked review', () => {
        expect(member.isLikeReview('likeReviewId')).to.be.true;
        expect(member.isLikeReview('dislikeReviewId')).to.be.false;
    });

    it('should check is a disliked review', () => {
        expect(member.isDislikeReview('likeReviewId')).to.be.false;
        expect(member.isDislikeReview('dislikeReviewId')).to.be.true;
    });

    it('should add like review correctly', () => {
        member.addLikeReview('likeReviewId2');
        expect(member.likeReviewIds).to.have.length(2)
        expect(member.likeReviewIds[1]).to.equal('likeReviewId2');
    });

    it('should remove like review correctly', () => {
        member.removeLikeReview('likeReviewId2');
        expect(member.likeReviewIds).to.have.length(1)
        expect(member.likeReviewIds[0]).to.equal('likeReviewId');
    });

    it('should add dislike review correctly', () => {
        member.addDislikeReview('dislikeReviewId2');
        expect(member.dislikeReviewIds).to.have.length(2)
        expect(member.dislikeReviewIds[1]).to.equal('dislikeReviewId2');
    });

    it('should remove dislike review correctly', () => {
        member.removeDislikeReview('dislikeReviewId2');
        expect(member.dislikeReviewIds).to.have.length(1)
        expect(member.dislikeReviewIds[0]).to.equal('dislikeReviewId');
    });

    it('should get info correctly', () => {
        let info = member.getInfo();
        expect(info.name).to.equal('testName');
        expect(info.profileUrl).to.equal('http://profileUrl');
    });

    it('should get latest review correctly', () => {
        let review = member.getLatestReview();
        expect(review._id).to.equal('reviewId');
    });

    it('should write review correctly', () => {
        member.writeReview('test Title', 'test Content');
        let review = member.getLatestReview();
        expect(review.title).to.equal('test Title');
        expect(review.content).to.equal('test Content');
    });
});