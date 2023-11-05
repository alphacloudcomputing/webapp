require("dotenv").config();
const users = require("./models/users").User;
const server = require("./server.js");
const fs = require("fs");
const csv = require("fast-csv");
const logWarn = require("./server.js").logWarn;
const logErr = require("./server.js").logErr;
const logInfo = require("./server.js").logInfo;

const path = process.env.DEFAULTUSERPATH;

const popData = async () => {
  await server.conn();
  try {
    if (path === "") {
      logWarn("Default users file not found");
      return;
    } else {
      logInfo(`Default users file found ${path}`);
    }

    csv
      .parseStream(fs.createReadStream(path), { headers: true })
      .on("data", async (data) => {
        const { first_name, last_name, email, password } = data;

        const exists = await users.findOne({
          where: { email: email },
        });

        if (exists == null) {
          await users.create({
            first_name,
            last_name,
            email,
            password,
          });
        }
      })
      .on("end", () => {
        logInfo("Imported data to server");
      });
  } catch (err) {
    logInfo("Not Created Entries");
  }
};

popData();
