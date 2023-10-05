const { DataTypes } = require("sequelize");
const sequelize = require("../server.js").sequelize;

const assignment = sequelize.define("assignments", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  },
  num_of_attemps: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  },
  deadline: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = {
  assignment: assignment,
  sequelize: sequelize,
};
