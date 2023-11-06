// Importing required modules
const Sequelize = require("sequelize");
const mariadb = require("mariadb");
const winston = require("winston");
require("dotenv").config();

function logInfo(message) {
  const stack = new Error().stack.split('\n')[2]; // Get the caller
  const match = stack.match(/at\s+(?:.*\s)?(?:.*[\/\\])([^\/\\]+:\d+:\d+)/);
  const fileInfo = match ? match[1] : 'unknown';

  logger.info(`[${fileInfo}] - ${message}`);
}

function logErr(message) {
  const stack = new Error().stack.split('\n')[2]; // Get the caller
  const match = stack.match(/at\s+(?:.*\s)?(?:.*[\/\\])([^\/\\]+:\d+:\d+)/);
  const fileInfo = match ? match[1] : 'unknown';

  logger.error(`[${fileInfo}] - ${message}`);
}

function logWarn(message) {
  const stack = new Error().stack.split('\n')[2]; // Get the caller
  const match = stack.match(/at\s+(?:.*\s)?(?:.*[\/\\])([^\/\\]+:\d+:\d+)/);
  const fileInfo = match ? match[1] : 'unknown';

  logger.warn(`[${fileInfo}] - ${message}`);
}

winston.addColors({
  info: "bold blue", // fontStyle color
  warn: "italic yellow",
  error: "bold red",
  debug: "green",
});

const customFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.printf((info) => {
    return `${info.timestamp} [${info.level}]:${info.message}`;
  })
);


// Create a Winston logger
const logger = winston.createLogger({
  level: 'info',
  transports: [
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize(),winston.format.json(),customFormat),
      }),
      new winston.transports.File({
        filename: '/var/log/webapp.log',
        format: winston.format.combine(winston.format.timestamp(),winston.format.json())
    })
  ],
});

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
  password: process.env.DATABASE_PASSWORD,
});

// Setting up Sequelize
async function initialize() {
  await pool
    .getConnection()
    .then((connection) => {
      connection.query(
        `CREATE DATABASE IF NOT EXISTS\`${process.env.DATABASE_NAME}\`;`
      );
    })
    .catch((error) => {
      logErr(`Unable to Connect to Database: ${error}`);
    });

  require("./models/users.js").User;
  require("./models/assignments.js").assignment;
  require("./models/relations.js");
  await sequelize.sync();
}

initialize();

const conn = () => {
  return sequelize
    .authenticate()
    .then(async () => {
      logInfo("Connection established with database");
      return true;
    })
    .catch((error) => {
      logErr(`Connection error: ${error}`);
      return false;
    });
};

// Exporting method conn
module.exports = {
  sequelize: sequelize,
  conn: initialize,
  sql: conn,
  logInfo: logInfo,
  logErr: logErr,
  logWarn: logWarn,
};