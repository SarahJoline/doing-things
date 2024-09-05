const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
const pool = require("./db");

const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
