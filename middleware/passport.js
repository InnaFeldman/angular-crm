///Functionality of work with token (protect routs)

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//We'll take token that is in headers
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (playload, done)=>{
            try {
                const user = await User.findById(playload.userId).select('email id')

                if(user){
                    //If user was found in DB
                    done(null, user)
                }else {
                    done(null, false)
                }
            }catch(e) {
                console.log(e);
            }
        })
    )
}