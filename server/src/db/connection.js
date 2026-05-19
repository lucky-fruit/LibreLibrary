const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER || "localhost",
  port: 1433,
  options: {
    encrypt: false, // disable for local dev
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch(err => console.error("DB Connection Failed:", err));

  // console.log(process.env.DB_USER, process.env.DB_PWD, process.env.DB_NAME, process.env.DB_SERVER);
module.exports = { sql, poolPromise };
