const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy

const User = require('../models/Users');

passport.use(new LocalStrategy({

    usernameField: 'email'
}, async(email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, { message: 'Usuario o contraseña incorrectos!' });
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: ' Usuario o contraseña incorrectos!' });
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});


passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// module.exports = passport;