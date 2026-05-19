require("dotenv").config();
const express = require("express");
const {poolPromise} = require("./db/connection");
const { swaggerUi, specs } = require("./services/swagger");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

// dotenv.config();
// connectDB();

const app = express();
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Basic health check
app.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT GETDATE() AS CurrentTime");
    res.json({ message: "API is running", dbTime: result.recordset[0].CurrentTime });
  } catch (err) {
    res.status(500).json({ error: "Database connection failed", details: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on localhost:${PORT}\n Swagger docs at http://localhost:${PORT}/api-docs`));
