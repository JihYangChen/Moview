var sinon = require('sinon');
var mongoose = require('mongoose');
require('sinon-mongoose');
var expect = require('chai').expect;
var Review = require('../entity/Review');
var review;

describe('Review entity', () => {
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
    });

    it('should create Review correctly', () => {
        expect(review._id).to.equal('reviewId');
        expect(review.title).to.equal('reviewTitle');
        expect(review.createTime).to.equal('1000');
        expect(review.content).to.equal('content');
        expect(review.likeAmount).to.equal(3);
        expect(review.dislikeAmount).to.equal(2);
        expect(review.memberName).to.equal('Willie');
    });

    it('should get Review object correctly', () => {
        let reviewObject = review.getObject();
        expect(reviewObject._id).to.equal('reviewId');
        expect(reviewObject.title).to.equal('reviewTitle');
        expect(reviewObject.createTime).to.equal('1000');
        expect(reviewObject.content).to.equal('content');
        expect(reviewObject.likeAmount).to.equal(3);
        expect(reviewObject.dislikeAmount).to.equal(2);
        expect(reviewObject.memberName).to.equal('Willie');
    });

    it('should get Review display info correctly', () => {
        let reviewObject = review.getDisplayInfo();
        expect(reviewObject._id).to.equal('reviewId');
        expect(reviewObject.title).to.equal('reviewTitle');
        expect(reviewObject.createTime).to.equal('1 Jan 1970');
        expect(reviewObject.content).to.equal('content');
        expect(reviewObject.likeAmount).to.equal(3);
        expect(reviewObject.dislikeAmount).to.equal(2);
        expect(reviewObject.memberName).to.equal('Willie');
    });

    it('should get content correctly', () => {
        let reviewObject = review.getContent();
        expect(reviewObject.title).to.equal('reviewTitle');
        expect(reviewObject.content).to.equal('content');
    });
    
    it('should get content correctly', () => {
        let reviewObject = review.getMemberName();
        expect(reviewObject.memberName).to.equal('Willie');        
    });
});