const db = require('../models');
const Todo = db.Todo;

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      status: 'failure',
      message: 'Sorry!, You are not authorized to access this resource',
    });
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const result = await Todo.create({
      title: req.body.title,
      userId: req.user.id,
    });

    if (result) {
      res.status(201).json({
        status: 'success',
        data: {
          todo: result,
        },
      });
    } else {
      res.status(404).json({
        status: 'failure',
        message: 'Unable to create a todo item',
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 'error',
      message: 'Unknown error occured!' + e,
    });
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const result = await Todo.findAndCountAll({
      where: {
        userId: req.user.id,
        status: 1,
      },
    });

    if (result.count != 0) {
      res.status(200).json({
        status: 'success',
        data: {
          todos: result,
        },
      });
    } else {
      res.status(404).json({
        status: 'failure',
        message: 'No todo lists',
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 'error',
      message: 'Unknown error occured!' + e,
    });
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const result = await Todo.update(
      { title: req.body.title },
      {
        where: {
          userId: req.user.id,
          id: req.body.id,
        },
      }
    );

    const affectedRows = result[0];
    if (affectedRows > 0) {
      res.status(200).json({
        status: 'success',
        message: 'Updated!',
        count: affectedRows,
      });
    } else {
      res.status(404).json({
        status: 'failure',
        message: 'No record found to perform update operation',
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 'error',
      message: 'Unknown error occured!' + e,
    });
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const result = await Todo.update(
      { status: 0 },
      {
        where: {
          userId: req.user.id,
          id: req.body.id,
          status: 1,
        },
      }
    );

    const affectedRows = result[0];
    if (affectedRows > 0) {
      res.status(200).json({
        status: 'success',
        message: 'Deleted!',
        count: affectedRows,
      });
    } else {
      res.status(404).json({
        status: 'failure',
        message: 'No record found to perform delete operation',
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 'error',
      message: 'Unknown error occured!' + e,
    });
  }
};
