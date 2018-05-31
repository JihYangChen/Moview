
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var auth = require('./auth');
var fetch = require('node-fetch');

module.exports = passport => {

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });
      
    passport.deserializeUser((user, cb) => {
        cb(null, user);
        // User.findById(user.id, function(err, user) {
        //     done(err, user);
        // });
    });

    passport.use(new FacebookStrategy({
        clientID: auth.facebookAuth.clientId,
        clientSecret: auth.facebookAuth.clientSecret,
        callbackURL: auth.facebookAuth.callbackURL,
        profileFields: auth.facebookAuth.profileFields
    }, async (accessToken, refreshToken, profile, cb) => {
        let url = "https://graph.facebook.com/" + profile.id + "?fields=picture&access_token=" + accessToken;
        await fetchProfilePic(url, (err, result) => {
            profile.profile_pic = result
            return cb(null, profile)
        })
        // profile.profile_pic = "https://graph.facebook.com/" + profile.id + "?fields=picture&access_token=" + accessToken;
        // return cb(null, profile);
        
        // process.nextTick(() => {
        //     User.findOne({ 'facebook.id' : profile.id }, (err, user) => {
        //         if (err)
        //             return cb(err);

        //         if (user) {
        //             return cb(null, user); 
        //         } else {
        //             var newUser = new User();
        //             newUser.save(function(err) {
        //                 if (err)
        //                     throw err;
        //                 return cb(null, newUser);
        //             });
        //         }
        //     });
        // });
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
