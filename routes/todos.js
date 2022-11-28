const router = require('express').Router();
const { validationErrors } = require('../validations/validationErrors');
const todoRules = require('../validations/todoRules');
const todoController = require('../controllers/todos');

router
  .route('/')
  .get(todoController.isAuth, todoController.getTodo)
  .post(
    todoController.isAuth,
    todoRules.ruleSet1(),
    validationErrors,
    todoController.createTodo
  )
  .put(
    todoController.isAuth,
    todoRules.ruleSet1(),
    todoRules.ruleSet2(),
    validationErrors,
    todoController.updateTodo
  )
  .delete(
    todoController.isAuth,
    todoRules.ruleSet2(),
    validationErrors,
    todoController.deleteTodo
  );

module.exports = router;
