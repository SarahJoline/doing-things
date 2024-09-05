const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./routes");
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
