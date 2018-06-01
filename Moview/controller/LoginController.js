class LoginController {
    
    constructor(passport) {
        this.passport = passport;
    }

    login = (req, res, next) => {
        this.passport.authenticate('facebook', { 
            scope : ['public_profile', 'email']
        })(req, res, next);
    }
}

module.exports = LoginController;