const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    const token = authHeader ? authHeader.split(" ")[1] : null; // Authorization: Bearer alaksjlaksjdl
    const decodedToken = token
      ? jwt.verify(token, process.env.JWT_SECRET_KEY)
      : null;

    if (!authHeader || !token || token === "" || !decodedToken) {
      req.isAuth = false;
      return next();
    }

    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
  } catch (err) {
    console.log("Error in Auth Middleware...", err);
    req.isAuth = false;
    return next();
  }
};
