const db = require("../../data/dbConfig");

async function findById(id) {
  console.log("inside findByID model");
  return db("users").where("id", id).first();
}

async function register(user) {
  console.log("inside register model");
  const [id] = await db("users").insert({
    username: user.username.trim(),
    password: user.password.trim(),
  });
  return findById(id);
}

async function findByUsername(username) {
  console.log("inside findByUsername model");
  const existingUsername = db("users").where("username", username).first();
  return existingUsername;
}

module.exports = {
  register,
  findById,
  findByUsername,
};
