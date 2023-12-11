const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const tokenWithoutBearer = token.slice(7);
  jwt.verify(tokenWithoutBearer, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
