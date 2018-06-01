var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var auth = require('./auth');
var fetch = require('node-fetch');
var Member = require('../entity/Member');
var memberManager;

module.exports = passport => {

    passport.serializeUser((user, cb) => {
        cb(null, user.fbId);
    });
      
    passport.deserializeUser((id, cb) => {
        let member = memberManager.getMemberByFbId(id)
        cb(null, member);
    });

    passport.use(new FacebookStrategy({
        clientID: auth.facebookAuth.clientId,
        clientSecret: auth.facebookAuth.clientSecret,
        callbackURL: auth.facebookAuth.callbackURL,
        profileFields: auth.facebookAuth.profileFields,
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, cb) => {
        memberManager = await req.memberManager;
        let url = "https://graph.facebook.com/" + profile.id + "?fields=picture&access_token=" + accessToken;
        await fetchProfilePic(url, async (err, result) => {
            // profile.profile_pic = result
            let member = memberManager.getMemberByFbId(profile.id);
            console.log('member===', member);
            console.log('fbid===', profile.id);
            if (member != null) {
                return cb(null, member);
            } else {
                let email = profile.emails ? profile.emails[0].value : null;
                let profileObject = {
                    fbId: profile.id,
                    name: profile.displayName,
                    email: email,
                    profileUrl: result
                };
                let newMember = new Member(profileObject);
                let memberId = await memberManager.insertMember(profileObject);
                newMember._id = memberId
                memberManager.addMember(newMember);
                return cb(null, newMember)
            }
        })
    }));

    var fetchProfilePic = async (url, callback) => {
        // const res = await fetch(url)
        // const json = await res.json();
        // callback(null, json.picture.data.url);
        await fetch(url)
                .then(response => response.json())
                .then(json => callback(null, json.picture.data.url))
                .catch(error => callback(error, null))
    }
};
