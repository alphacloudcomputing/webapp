const { DataTypes } = require("sequelize");

const sequelize = require("../server.js").sequelize;
const submission = sequelize.define(
  "submission",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    submission_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    timestamps: true,
    createdAt: "submission_date",
    updatedAt: "assignment_updated",
    underscore: true,
  }
);

module.exports = {
  submission: submission,
};
