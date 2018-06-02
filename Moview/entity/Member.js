
class Member {
    
    // props = {id, fbId, name, email, profileUrl, reviewList}
    constructor(memberObject, reviewList) {
        for (var prop in memberObject) {
            this[prop] = prop == 'reviewList' ? reviewList : memberObject[prop];
        }
    }

    getInfo = () => {
        return {
            name: this.name,
            profileUrl: this.profileUrl
        }
    }
}

module.exports = Member;