module.exports = (sequelize, Sequelize) => {
  const Foods = sequelize.define("Foods", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_users: {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    category: {
      type: Sequelize.ENUM("food", "snack", "drink"),
    },
    food_name: {
      type: Sequelize.STRING,
    },
    img_url: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
  });

  // Foods.belongsTo(User, { foreignKey: "id_users", as: "user" });

  return Foods;
};