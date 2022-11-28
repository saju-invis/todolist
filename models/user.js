module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(25),
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 1,
      },
    },
    {
      tableName: 'users',
    }
  );

  return User;
};
