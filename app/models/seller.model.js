const User = require("./user.model");
const Event = require("./event.model");

module.exports = (sequelize, Sequelize) => {
  const Seller = sequelize.define("Seller", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_seller: {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    id_event: {
      type: Sequelize.INTEGER,
      references: {
        model: "Event",
        key: "id",
      },
    },
    status: {
      type: Sequelize.ENUM("pending", "accepted", "rejected"),
    },
    accepted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    rejected_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    rejected_reason: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  // Seller.belongsTo(User, { foreignKey: "id_seller", as: "seller" });
  // Seller.belongsTo(Event, { foreignKey: "id_event", as: "event" });

  return Seller;
};