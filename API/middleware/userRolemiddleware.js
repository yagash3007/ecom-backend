const jwt = require("jsonwebtoken");

const userRoleMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Please Login!" });
  }

  try {
    const decoded = jwt.verify(token, "12345");

    if (decoded.role !== "customer") {
      return res
        .status(403)
        .json({ message: "You don't have the required access" });
    }

    req.userId = decoded.userId;
    req.userRole = decoded.role;

    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = userRoleMiddleware;
