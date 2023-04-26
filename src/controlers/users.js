const { dbConf, dbQuery } = require("../config/db");
const { hasPassword, createToken } = require("../config/encript");
const bcrypt = require("bcrypt");

module.exports = {
  getData: (req, res) => {
    dbConf.query("SELECT * FROM Users", (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(result);
    });
  },
  register: async (req, res) => {
    try {
      let { userName, email, password } = req.body;
      const newPass = hasPassword(password);
      console.log("newpass", newPass);
      let results = await dbQuery(`SELECT * FROM Users WHERE email=${dbConf.escape(email)}`);
      if (results.length > 0) {
        return res.status(200).send({
          success: false,
          message: "email is existed",
        });
      } else {
        let resultInsert = await dbQuery(`INSERT INTO Users (userName,email,password) VALUES (${dbConf.escape(userName)}, ${dbConf.escape(email)}, ${dbConf.escape(newPass)})`);
        console.log("insert results", resultInsert);
        let token = createToken({ id: resultInsert.insertId, userName, email });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  login: (req, res) => {
    dbConf.query(`SELECT * FROM Users WHERE email=${dbConf.escape(req.body.email)}`, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      console.log("users", result[0]);
      const checkPassword = bcrypt.compareSync(req.body.password, result[0].password);
      console.log("cek pass", checkPassword);
      delete result[0].password;
      if (checkPassword) {
        console.log(result[0]);
        let token = createToken({ ...result[0] });
        return res.status(200).send({ ...result[0], token });
      } else {
        return res.status(401).send({
          success: false,
          message: "Your Password is Wrong",
        });
      }
    });
  },
};
