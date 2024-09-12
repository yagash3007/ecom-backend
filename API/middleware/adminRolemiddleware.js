const jwt = require("jsonwebtoken");
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

// const token = req.headers["authorization"]?.split(" ")[1];

const adminRoleMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  console.log(token);

  if (!token) {
    return res
      .status(401)
      .json({ token: token, message: "Access DenaToken Missing" });
  }

  try {
    const decoded = jwt.verify(token, "12345");

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "You dont have requird access" });
    }

    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid oken" });
  }
};

module.exports = adminRoleMiddleware;
