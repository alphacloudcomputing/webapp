const server = require('../server.js');
const User = require("../models/users").User;
const bcrypt = require("bcrypt");

const verifyUser = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("Please provide login credentials.");
  }

  const tokenParts = token.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== "basic") {
    return res.status(403).send("Invalid login credentials");
  }

  const tokenData = Buffer.from(tokenParts[1], "base64").toString();
  const [username, password] = tokenData.split(":");

  if (!username || !password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  try {
    const user = await User.findOne({ where: { email:username } });
    if(!user) {
      return res.status(401).send("User not found.");
    }

    const passValid = await bcrypt.compare(password, user.password);
    console.log(passValid)

    if(!passValid){
      return res.status(401).send("Invalid password.")
    }

    req.User = user;
    next()
  } catch (e) {
    console.log(e);
    return res.status(401).send("Try again.");
  }
};

module.exports = {
  verifyUser,
};