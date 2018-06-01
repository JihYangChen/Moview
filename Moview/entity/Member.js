
class Member {
    
    // props = {id, fbId, name, email, profileUrl}
    constructor(memberObject) {
        for (var prop in memberObject) {
            this[prop] = memberObject[prop]
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