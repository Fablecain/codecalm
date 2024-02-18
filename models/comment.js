module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      // Assuming a simple structure for a comment
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // Include other fields as necessary, e.g., a timestamp or a user reference
    });
  
    return Comment;
  };
  