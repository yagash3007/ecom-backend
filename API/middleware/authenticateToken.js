const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const bearerToken = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(bearerToken, "12345");

    req.user = decoded; // Attach decoded user info to req.user
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateToken;
