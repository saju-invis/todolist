const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');
const User = db.User;

const validPassword = require('../utils/passwordUtils').validPassword;

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCallback = async (username, password, done) => {
  try {
    const result = await User.findOne({
      where: {
        email: username,
      },
    });

    if (!result) {
      return done(null, false);
    }

    const isValid = validPassword(password, result.hash, result.salt);

    if (isValid) {
      return done(null, result);
    } else {
      return done(null, false);
    }
  } catch (error) {
    done(error);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((result, done) => {
  done(null, result.id);
});

passport.deserializeUser((userId, done) => {
  User.findByPk(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
