const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { sql, poolPromise } = require("../db/connection");

const registerUser = async (first_name, last_name, email, password) => {
  console.log("Registering user:", first_name, last_name, email);
  const hashed = await bcrypt.hash(password, 10);
  const pool = await poolPromise;
  await pool.request()
    .input("first_name", sql.NVarChar, first_name)
    .input("last_name", sql.NVarChar, last_name)
    .input("email", sql.NVarChar, email)
    .input("password", sql.NVarChar, hashed)
    .query("INSERT INTO Users (first_name, last_name, email, password) VALUES (@first_name, @last_name, @email, @password)");
  return { first_name, last_name, email };
};

const loginUser = async (email, password) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input("email", sql.NVarChar, email)
    .query("SELECT * FROM Users WHERE email = @email");

  const user = result.recordset[0];
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

module.exports = { registerUser, loginUser };
