var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy; 
var User = require('../models/Users');

passport.use(new GitHubStrategy({
    clientID : process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    var profileData = {
        first_name : profile.displayName,
        username: profile.username,
        email : profile._json.email,
        photo: profile._json.avatar_url
    }
console.log(profile._json.email);
    User.findOne({ email: profile._json.email }, (error, user) => {
console.log(user, "123");

        if(error) return done(error);
        if(!user) {
            User.create(profileData, (err, addedUser) => {
                if(err) return done(err);
                console.log(addedUser, "adde1234");
                return done(null, addedUser);
                
            })
        } else {
            return done(null, user);
        }
        
    })
}))