const router = require('express').Router();
const { validationErrors } = require('../validations/validationErrors');
const userRules = require('../validations/userRules');
const userController = require('../controllers/users');
const passport = require('passport');

router.post(
  '/signup',
  (req, res, next) => {
    if (req.isAuthenticated()) {
      res.status(405).json({
        status: 'error',
        message: 'You are now signed in!',
      });
    } else {
      next();
    }
  },
  userRules.ruleSet1(),
  validationErrors,
  userController.createUser
);

router.post(
  '/signin',
  (req, res, next) => {
    if (req.isAuthenticated()) {
      res.status(405).json({
        status: 'error',
        message: 'You are already signed in!',
      });
    } else {
      next();
    }
  },
  passport.authenticate('local'),
  (req, res, next) => {
    res.status(200).json({
      status: 'success',
      message: 'Signed in as ' + req.user.firstName,
    });
  }
);

router.get('/signout', (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        status: 'success',
        message: 'Signed out!',
      });
    });
  } else {
    res.status(405).json({
      status: 'error',
      message: 'This action cannot be done as you are not signed in',
    });
  }
});

module.exports = router;
