module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("Event", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    id_eo: {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    description: {
      type: Sequelize.STRING,
    },
    img_url: {
      type: Sequelize.STRING,
    },
    time: {
      type: Sequelize.DATE,
    },
    alamat: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    ticket_price: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    max_seller: {
      type: Sequelize.INTEGER,
    },
    url_website: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    is_publish: {
      type: Sequelize.BOOLEAN,
    },
    published_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  // const User = require("./user.model");

  // Event.belongsTo(User, { foreignKey: "id_eo", as: "eventOrganizer" });

  return Event;
};