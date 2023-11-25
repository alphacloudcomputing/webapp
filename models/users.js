const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");

const sequelize = require("../server.js").sequelize;

const User = sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validator: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
User.beforeCreate(async(User) => {
  const encryptedPass= await bcrypt.hash(User.password, 10);
  User.password = encryptedPass
});

module.exports = {
  User: User,
};
