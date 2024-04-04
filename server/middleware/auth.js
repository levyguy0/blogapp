const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.cookies.auth;
  if (!token) {
    return res.status(401).send("Not logged in");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.clearCookie("auth");
    return res.status(400).send("Invalid token");
  }
};
