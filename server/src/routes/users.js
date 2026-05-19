const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db/connection");
const authMiddleware = require("../services/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (requires JWT)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT first_name, last_name, email FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
