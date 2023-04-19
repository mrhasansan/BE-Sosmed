const { dbConf, dbQuery } = require("../config/db");

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
    console.log("cek body", req.body);
    try {
      let { userName, email, password } = req.body;
      let results = await dbQuery(`SELECT * FROM Users WHERE email=${dbConf.escape(email)}`);
      if (results.length > 0) {
        return res.status(200).send({
          success: false,
          message: "email is existed",
        });
      } else {
        let resultInsert = await dbQuery(`INSERT INTO Users (userName,email,password) VALUES (${dbConf.escape(userName)}, ${dbConf.escape(email)}, ${dbConf.escape(password)})`);
        console.log("insert results", resultInsert);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
