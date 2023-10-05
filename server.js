// Importing required modules
const Sequelize = require("sequelize");
const mariadb = require("mariadb");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    logging: false,
    port: process.env.PORT,
    host: process.env.HOSTNAME,
    dialect: "mariadb",
  }
);

const pool = mariadb.createPool({
	host: process.env.HOSTNAME,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD
})

// Setting up Sequelize
async function initialize() {
  await pool.getConnection().then((connection) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS\`${process.env.DATABASE_NAME}\`;`)
  });

  require("./models/users.js").User;
  require("./models/assignments.js").assignment;
  require("./models/relations.js")
  await sequelize.sync();
  return sequelize
    .authenticate()
    .then(async () => {
      console.log("Connected to database");
      return true;
    })
    .catch((error) => {
      console.log("Connection error: " + error);
      return false;
    });
}

initialize();

// Exporting method conn
module.exports = {
  sequelize: sequelize,
  conn: initialize,
};
