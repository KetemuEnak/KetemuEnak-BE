module.exports = (sequelize, Sequelize) => {
  const defineUserModel = require("./user.model");
  const defineEventModel = require("./event.model");

  const User = defineUserModel(sequelize, Sequelize);
  const Event = defineEventModel(sequelize, Sequelize);
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
        model: "Events",
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

  Seller.belongsTo(User, { foreignKey: "id_seller", as: "seller" });
  Seller.belongsTo(Event, { foreignKey: "id_event", as: "event" });

  return Seller;
};
