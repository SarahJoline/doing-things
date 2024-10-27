const express = require("express");
const TOKEN = process.env.TOKEN_SECRET;
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function verify(req, res, next) {
  var token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send("access denied");
  }
  try {
    const verified = jwt.verify(token, TOKEN);

    req.user = verified;

    next();
  } catch (err) {
    console.log("ERROR IN VERIFY!");
    res.status(400).send("Invalid Token");
  }
}

router.post("/user", async (req, res) => {
  const { email, name, password } = req.body;

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      `INSERT INTO users (email, name, hashed_password) VALUES ($1, $2, $3) RETURNING *`,
      [email, name, hashedPassword]
    );

    let token = jwt.sign(
      {
        email: result.email,
        userID: result._id,
      },
      TOKEN,
      { expiresIn: 129600 }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

router.post("/user/log-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userID: user.id,
      },
      TOKEN,
      { expiresIn: 129600 } // Token expiration time in seconds (e.g., 36 hours)
    );

    res.status(200).json({
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

router.get("/todos", verify, async (req, res) => {
  console.log(req.user.email);
  const userId = req.user.email;
  try {
    const result = await pool.query(
      "SELECT todos.*, json_agg(subtasks) AS subtasks FROM todos LEFT JOIN subtasks ON subtasks.todo_id = todos.id WHERE todos.user_id = $1 GROUP BY todos.id",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
});

router.post("/todos", async (req, res) => {
  try {
    const { subtasks, ...todo } = req.body;
    const fields = Object.keys(todo);
    const values = Object.values(todo);

    const columns = fields.join(", ");
    const placeholders = fields.map((_, index) => `$${index + 1}`).join(", ");

    const query = `INSERT INTO todos (${columns}) VALUES (${placeholders}) RETURNING *`;

    const todoResult = await pool.query(query, values);

    if (subtasks && subtasks.length > 0) {
      const subtaskValues = [];
      const subtaskPlaceholders = subtasks
        .map((subtask, i) => {
          const offset = i * 3;
          subtaskValues.push(subtask, todoResult.rows[0].id, i + 1); // Add subtask name, todo_id, and sort_order
          return `($${offset + 1}, $${offset + 2}, $${offset + 3})`;
        })
        .join(", ");

      // Insert all subtasks and capture the result
      const subtaskQuery = `
        INSERT INTO subtasks (name, todo_id, sort_order) 
        VALUES ${subtaskPlaceholders}
        RETURNING *`;
      const subtaskResult = await pool.query(subtaskQuery, subtaskValues);
      console.log(subtaskResult.rows);
    }

    res.json({ todo: todoResult.rows });
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
