module.exports = (sequelize, DataTypes) => {
    const { Model } = require('sequelize');
  
    class User extends Model {}
  
    User.init({
      // Model attributes
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Add other attributes as needed
    }, {
      sequelize, // Pass the sequelize instance
      modelName: 'User',
    });
  
    return User;
  };