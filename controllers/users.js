const passport = require('passport');
const genPassword = require('../utils/passwordUtils').genPassword;
const db = require('../models');
const User = db.User;

exports.createUser = async (req, res, next) => {
  try {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const result = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      hash: hash,
      salt: salt,
      status: 1,
    });

    if (result) {
      res.status(201).json({
        status: 'success',
        data: {
          user: result,
        },
      });
    } else {
      res.status(404).json({
        status: 'failure',
        message: 'Unable to create a new user',
      });
    }
  } catch (e) {
    let message;
    if (e.name === 'SequelizeUniqueConstraintError') {
      message = 'Sorry!, the given email address already exists';
    } else {
      message = 'Process failed due to an unknown error';
    }

    res.status(500).json({
      status: 'error',
      message,
    });
  }
};
