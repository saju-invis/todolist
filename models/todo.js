module.exports = (sequelize, Sequelize, DataTypes) => {
    const Todo = sequelize.define(
      'Todo',
      {
        title: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        userId: {
          type: DataTypes.TINYINT(1),
          allowNull: false,
        },
        status: {
          type: DataTypes.TINYINT(1),
          defaultValue: 1,
        },
      },
      {
        tableName: 'todo',
      }
    );
  
    return Todo;
  };
  