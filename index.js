const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const PORT = process.env.PORT || 2000;

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
// conectin database
const { dbConf } = require("./src/config/db");
dbConf.getConnection((err, connection) => {
  if (err) {
    console.log(`Error mysql connections`, err.sqlMessage);
  }
  console.log(`Connection mysql succest: `);
});

app.get("/", (req, res) => {
  res.status(200).send("<h1> Sosial Media API </h1> ");
});

// Roure Configuration
const { usersRouter } = require("./src/routers");
app.use("/users", usersRouter);
app.listen(PORT, () => console.log("API RUNNING ON PORT ", PORT));
