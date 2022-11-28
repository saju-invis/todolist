const { body } = require('express-validator');
const customRules = require('./customRules');

const ruleSet1 = () => {
  return [
    body('title')
      .trim()
      .exists({ checkFalsy: true })
      .withMessage('A todo item must have a title')
      .escape()
      .isLength({ min: 3, max: 191 })
      .withMessage('Title of a todo should be 3-191 characters')
      .custom((value) => {
        if (customRules.checkForAllowedChars(value, 'name') === false) {
          throw new Error(
            'Title of todo item must only contain alphabets, space and dot'
          );
        }
        return true;
      }),
  ];
};

const ruleSet2 = () => {
  return [
    body('id')
      .isInt({ allow_leading_zeroes: false, gt: 0 })
      .withMessage('Invalid ID')
      .exists({ checkFalsy: true })
      .withMessage('A todo item must have an Id'),
  ];
};

module.exports = {
  ruleSet1,
  ruleSet2,
};
