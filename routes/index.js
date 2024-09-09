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

router.post("/todos", async (req, res) => {
  try {
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    const columns = fields.join(", ");
    const placeholders = fields.map((_, index) => `$${index + 1}`).join(", ");

    const query = `INSERT INTO todos (${columns}) VALUES (${placeholders}) RETURNING *`;

    const result = await pool.query(query, values);

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add todo" });
  }
});

router.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    values.push(id);

    const query = `UPDATE todos SET ${setClause} WHERE id = $${values.length} RETURNING *`;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update todo" });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );

    res.json({
      message: "Todo deleted successfully",
      deletedTodo: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = router;
