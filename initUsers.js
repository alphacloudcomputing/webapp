require('dotenv').config();
const users = require("./models/users").User;
const server = require("./server.js");
const fs = require("fs");
const csv = require("fast-csv");

const path = process.env.DEFAULTUSERPATH;

const popData = async () => {
  await server.conn();
  try {
    if(path ===""){
      console.log("Default users file not found", path)
      return
    }else{
      console.log("Default users file found", path)
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
        console.log("Imported data to server");
      });
  } catch (err) {
    console.log("Not created: " + err.message);
  }
};

popData();
