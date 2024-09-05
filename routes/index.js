const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
