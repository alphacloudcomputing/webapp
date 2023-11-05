const server = require("../server.js");
const User = require("../models/users").User;
const bcrypt = require("bcrypt");
const logWarn = require("../server.js").logWarn;
const logErr = require("../server.js").logErr;
const logInfo = require("../server.js").logInfo;

const verifyUser = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    logWarn("User not validated, No Credentials");
    return res.status(401).send("Please provide login credentials.");
  }

  const tokenParts = token.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0].toLowerCase() !== "basic") {
    logWarn("User not validated, invalid credentials");
    return res.status(401).send("Invalid login credentials");
  }

  const tokenData = Buffer.from(tokenParts[1], "base64").toString();
  const [username, password] = tokenData.split(":");

  if (!username || !password) {
    logWarn("User not validated, invalid credentials");
    return res.status(401).json({ error: "Invalid credentials" });
  }

  try {
    const user = await User.findOne({ where: { email: username } });
    if (!user) {
      logWarn("User not validated, user does not exist");
      return res.status(401).send("User not found.");
    }

    const passValid = await bcrypt.compare(password, user.password);

    if (!passValid) {
      logWarn("User not validated, invalid credentials");
      return res.status(401).send("Invalid password.");
    }

    req.User = user;
    next();
  } catch (e) {
    logErr(`${e}`);
    return res.status(401).send("Try again.");
  }
};

module.exports = {
  verifyUser,
};
