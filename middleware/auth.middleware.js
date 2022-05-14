const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, resp, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"

    if (!token) {
      return resp.status(401).json({ message: "Unauthorized Error" });
    }

    const user = jwt.verify(token, config.get("jwtSecret"));
    req.user = user;
    return next();
  } catch (e) {
    return resp.status(401).json({ message: "Unauthorized Error" });
  }
};
