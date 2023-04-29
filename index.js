const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const PORT = process.env.APP_PORT || 3000;

const app = express();
const cors = require("cors");

// Roure Configuration
const { usersRouter } = require("./src/routers");

// conectin database
const { dbConf } = require("./src/config/db");

app.use(cors());
app.use(express.json());

dbConf.getConnection((err, connection) => {
  if (err) {
    console.error(`Error mysql connections`, err.sqlMessage);
  }
  console.info(`Connection to mysql is successful`);
});

app.get("/", (req, res) => {
  res.status(200).send("<h1> Sosial Media API </h1> ");
});

app.use("/users", usersRouter);

app.listen(PORT, () => console.info("Sosmed Backend API is running on port:", PORT));
