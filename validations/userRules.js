const { body } = require('express-validator');
const customRules = require('./customRules');

const ruleSet1 = () => {
  return [
    body('firstName')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('The user must have a first name')
      .isLength({ min: 3, max: 25 })
      .withMessage('First name should be 3-25 characters')
      .custom((value) => {
        if (customRules.checkForAllowedChars(value, 'name') === false) {
          throw new Error(
            'First name must only contain alphabets, space and dot'
          );
        }
        return true;
      }),
    body('lastName')
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ min: 3, max: 25 })
      .withMessage('Last name should be 3-25 characters')
      .custom((value) => {
        if (customRules.checkForAllowedChars(value, 'name') === false) {
          throw new Error(
            'Last name must only contain alphabets, space and dot'
          );
        }
        return true;
      }),
    body('email')
      .trim()
      .exists()
      .isLength({ min: 6, max: 50 })
      .withMessage('Email should be 3-25 characters')
      .isEmail()
      .withMessage('The email entered is not valid'),
    body('password')
      .trim()
      .exists()
      .isLength({ min: 8, max: 25 })
      .withMessage('Password should be 8-25 characters')
      .custom((value) => {
        let pwErr = customRules.checkPwStrength(value);
        if (pwErr !== '') {
          throw new Error(pwErr);
        }
        return true;
      })
      .custom((value, { req }) => {
        if (value === req.body.email) {
          throw new Error('Password cannot be same as email');
        }
        return true;
      }),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match the password');
      }
      return true;
    }),
  ];
};

module.exports = {
  ruleSet1,
};
