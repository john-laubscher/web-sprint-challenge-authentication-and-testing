// const { JWT_SECRET } = require("../secrets"); // use this secret!
// const jwt = require("jsonwebtoken");

const User = require("./auth-model");
const checkUsername = async (req, res, next) => {
  console.log("inside checkuser middleware");
  try {
    const username = await User.findByUsername(req.body.username);
    if (username) {
      next({
        status: 422,
        message: "username taken",
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateCredentials = async (req, res, next) => {
  const { username, password } = req.body;
  console.log("validate middleware, username, pass:", username, password);
  console.log("inside validate credentials");
  if (!username.trim() || !password.trim()) {
    next({
      status: 422,
      message: "username and password required",
    });
  } else {
    next();
  }
};

module.exports = {
  checkUsername,
  validateCredentials,
};
